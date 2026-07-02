#!/usr/bin/env node
// Agentic OS dashboard — Level 3 (portable).
// Pure Node, zero deps. Reads the vault for live metrics + fires whitelisted automations headless
// via ../scripts/run-automation.sh (claude -p). Binds 127.0.0.1 only.
//
// Config via env (all optional):
//   AGENTIC_OS_SKILLS_DIR  where your SKILL.md dirs live   (default: ~/.claude/skills)
//   AGENTIC_OS_VAULT       vault root for the notes count  (default: parent of agentic-os/)
//   AGENTIC_OS_PORT        port                            (default: 4317)
import { createServer } from 'node:http';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

const OS_DIR = dirname(dirname(fileURLToPath(import.meta.url)));            // agentic-os/
const SKILLS_DIR = process.env.AGENTIC_OS_SKILLS_DIR || join(homedir(), '.claude', 'skills');
const VAULT_ROOT = process.env.AGENTIC_OS_VAULT || dirname(OS_DIR);
const PORT = Number(process.env.AGENTIC_OS_PORT || 4317);

// Skills this OS tracks — from skills/manifest.json (fallback: dirs under SKILLS_DIR with a SKILL.md).
function trackedSkills(){
  try { return JSON.parse(readFileSync(join(OS_DIR,'skills','manifest.json'),'utf8')).skills; }
  catch { try { return readdirSync(SKILLS_DIR,{withFileTypes:true}).filter(e=>e.isDirectory()&&existsSync(join(SKILLS_DIR,e.name,'SKILL.md'))).map(e=>e.name); } catch { return []; } }
}
// Only automations with a def file may run (never arbitrary input).
function automationNames(){ try { return readdirSync(join(OS_DIR,'automations')).filter(f=>f.endsWith('-automation.md')).map(f=>f.replace('.md','')); } catch { return []; } }

const read = (p, d='') => { try { return readFileSync(p,'utf8'); } catch { return d; } };
const jsonReply = (res, obj, code=200) => { res.writeHead(code,{'content-type':'application/json'}); res.end(JSON.stringify(obj)); };
function countMd(dir){ let n=0; try{ for(const e of readdirSync(dir,{withFileTypes:true})){ if(e.name.startsWith('.'))continue; const p=join(dir,e.name); if(e.isDirectory())n+=countMd(p); else if(e.name.endsWith('.md'))n++; } }catch{} return n; }
function latestRun(skill){ const m = read(join(OS_DIR,'runs',`${skill}.md`)).match(/^##\s+(.+)$/m); return m ? m[1].trim() : 'no runs yet'; }

function state(){
  const skills = trackedSkills().map(s => ({
    name: s,
    exists: existsSync(join(SKILLS_DIR,s,'SKILL.md')),
    lastRun: latestRun(s),
    trigger: (read(join(SKILLS_DIR,s,'SKILL.md')).match(/Use when the user\s+(?:says?|asks?|pastes?)?\s*([^.]*)/i)||[,''])[1].replace(/\s+/g,' ').trim().slice(0,90),
  }));
  const automations = automationNames().map(a => {
    const def = read(join(OS_DIR,'automations',`${a}.md`));
    return { name:a, enabled:/enabled:\s*true/.test(def), lastRun:latestRun(a.replace('-automation','')) };
  });
  return {
    metrics: {
      skillsBuilt: skills.filter(s=>s.exists).length,
      vaultNotes: countMd(VAULT_ROOT),
      osNotes: countMd(OS_DIR),
      automations: automations.length,
      automationsEnabled: automations.filter(a=>a.enabled).length,
    },
    skills, automations, generated: new Date().toISOString(),
  };
}
function runAutomation(name, cb){
  if(!automationNames().includes(name)) return cb(new Error('not whitelisted'),'');
  execFile(join(OS_DIR,'scripts','run-automation.sh'), [name], {timeout: 1000*60*10}, (err,so,se)=>cb(err, (so||'')+(se||'')));
}

createServer((req,res)=>{
  const url = new URL(req.url,'http://localhost');
  if(url.pathname==='/'){ res.writeHead(200,{'content-type':'text/html'}); return res.end(read(join(OS_DIR,'dashboard','index.html'))); }
  if(url.pathname==='/api/state') return jsonReply(res, state());
  if(url.pathname==='/api/runs'){ const s=url.searchParams.get('skill')||''; return jsonReply(res,{skill:s,log:read(join(OS_DIR,'runs',`${s}.md`),'no log')}); }
  if(url.pathname==='/api/run' && req.method==='POST'){ const name=url.searchParams.get('name')||''; return runAutomation(name,(err,out)=> jsonReply(res,{name,ok:!err,error:err?.message||null,output:(out||'').slice(-4000)}, err?500:200)); }
  res.writeHead(404); res.end('not found');
}).listen(PORT,'127.0.0.1',()=> console.log(`[agentic-os] dashboard → http://127.0.0.1:${PORT}`));
