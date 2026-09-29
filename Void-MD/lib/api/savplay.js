import { config } from '../../config/index.js';

function cleanPath(p){return String(p||'').startsWith('/')?String(p):`/${p||''}`;}
async function call(path, params={}, timeoutMs=config.savplay.timeoutMs){
  const u=new URL(config.savplay.baseUrl+cleanPath(path));
  for(const [k,v] of Object.entries({...params,key:config.savplay.key})) if(v!==undefined&&v!==null)u.searchParams.set(k,String(v));
  const r=await fetch(u,{headers:{accept:'application/json'},signal:AbortSignal.timeout(timeoutMs)});
  if(!r.ok) throw new Error(`SavPlay HTTP ${r.status}`);
  return r.json();
}
export async function savSearch(q,limit=5){return call(config.savplay.searchPath,{q,query:q,limit});}
export async function savDownload(id){return call(config.savplay.downloadPath,{id,url:id});}
export async function savVideo(id){return call(config.savplay.videoPath,{id,url:id});}
export function enabled(){return Boolean(config.savplay.baseUrl&&config.savplay.key);}
