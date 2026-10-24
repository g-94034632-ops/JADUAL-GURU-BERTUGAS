/* Sambungan GitHub Pages → Apps Script. Tiada kod log masuk disimpan dalam fail ini. */
window.BarsaBridge=(()=>{
 const endpoint='https://script.google.com/a/macros/moe-dl.edu.my/s/AKfycbymHJx-lte6GYm-wmdPsSNm9AXeoEomrGgv1iAmb_KpYkyfpdpXhedAGjbZckAM_XXa/exec';
 const channel=crypto.randomUUID(),pending=new Map();let frame=null,popup=null,peer=null,peerOrigin='',readyWaiters=[],counter=0;
 function message(text){const el=document.getElementById('connectionHelp');if(el){el.hidden=false;el.textContent=text;}}
 function bridgeUrl(){let u=new URL(endpoint);u.searchParams.set('github_bridge','1');u.searchParams.set('channel',channel);return u.href;}
 function trustedOrigin(origin){try{let u=new URL(origin);return u.protocol==='https:'&&(u.hostname==='script.google.com'||u.hostname==='script.googleusercontent.com'||u.hostname.endsWith('-script.googleusercontent.com'));}catch{return false;}}
 function related(source){try{return !!source&&(source===popup||(popup&&source.top===popup)||source===frame?.contentWindow||(frame&&source.top===window&&source.parent===frame.contentWindow));}catch{return false;}}
 window.addEventListener('message',e=>{
  const m=e.data;if(!m||m.type!=='BARSA_BRIDGE'||m.channel!==channel||!trustedOrigin(e.origin)||!related(e.source))return;
  if(m.kind==='ready'){peer=e.source;peerOrigin=e.origin;readyWaiters.splice(0).forEach(x=>x.resolve());const el=document.getElementById('connectionHelp');if(el)el.hidden=true;return;}
  if(e.source!==peer||e.origin!==peerOrigin||m.kind!=='result')return;
  const task=pending.get(m.id);if(!task)return;clearTimeout(task.timer);pending.delete(m.id);if(m.error)task.reject(Error(m.error));else task.resolve(m.raw);
 });
 function connectFrame(){if(frame)frame.remove();peer=null;frame=document.createElement('iframe');frame.src=bridgeUrl();frame.title='Sambungan rekod Google';frame.hidden=true;document.body.appendChild(frame);}
 function connectPopup(){popup=window.open(bridgeUrl(),'barsa-google-connection','width=640,height=650');message(popup?'Lengkapkan log masuk Google dalam tetingkap sambungan jika diminta. Kemudian kembali ke laman ini.':'Pelayar menyekat tetingkap sambungan. Benarkan popup laman ini dan cuba Sambung Google semula.');return popup;}
 function ready(){if(peer)return Promise.resolve();return new Promise((resolve,reject)=>{const item={resolve:()=>{clearTimeout(timer);resolve();}};const timer=setTimeout(()=>{readyWaiters=readyWaiters.filter(x=>x!==item);message('Sambungan Google belum tersedia. Pemilik perlu memasang Code.gs dan Bridge.html terkini serta deploy New version. Jika sudah, tekan Sambung Google dan gunakan akaun MOE yang dibenarkan.');reject(Error('Sambungan Apps Script belum tersedia. Tekan Sambung Google atau semak kemas kini backend.'));},30000);readyWaiters.push(item);});}
 async function call(method,args){await ready();const id=channel+':'+(++counter);return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(Error('Google mengambil masa terlalu lama. Muat semula data sebelum mencuba simpanan semula.'));},90000);pending.set(id,{resolve,reject,timer});peer.postMessage({type:'BARSA_BRIDGE',channel,kind:'call',id,method,args},peerOrigin);});}
 function start(){connectFrame();document.getElementById('connectGoogleBtn').onclick=()=>connectPopup();document.getElementById('retryGoogleBtn').onclick=()=>{connectFrame();message('Mencuba sambungan semula…');};document.getElementById('openGoogleApp').href=endpoint;}
 return {call,start,connectPopup,get isReady(){return !!peer;}};
})();
