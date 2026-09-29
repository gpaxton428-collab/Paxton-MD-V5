import { getAuto, getJson } from './wolvarex.js';
import { extractText, findUrl, pickResult, summarizeShape } from './normalize.js';
import { AppError, ApiError } from '../utils/errors.js';

export function cleanQ(text, max=1800){
  const q=String(text||'').replace(/[\u0000-\u001f]/g,' ').trim();
  if(!q) throw new AppError('Please provide a query.',{kind:'invalid_input'});
  if(q.length>max) throw new AppError(`Query too long (max ${max} characters).`,{kind:'invalid_input'});
  return q;
}
export async function endpointText(path, q, extra={}){
  const query=cleanQ(q);
  const data=await getJson(path,{q:query,query:query,text:query,...extra},{timeoutMs:60000});
  const text=extractText(data);
  if(text) return text;
  const raw=pickResult(data);
  if(typeof raw==='string') return raw;
  if(raw!=null) return JSON.stringify(raw,null,2).slice(0,5000);
  throw new ApiError('Empty API response',{kind:'bad_response'});
}
export async function endpointAuto(path,q,extra={}){
  const query=cleanQ(q);
  return getAuto(path,{q:query,query:query,text:query,...extra},{timeoutMs:120000,retries:0});
}
export function pretty(data,max=5000){
  if(typeof data==='string') return data.slice(0,max);
  try{return JSON.stringify(data,null,2).slice(0,max)}catch{return String(data).slice(0,max)}
}
export { findUrl, pickResult, summarizeShape };
