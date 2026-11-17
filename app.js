const $=s=>document.querySelector(s),tx=(s,d)=>katex.renderToString(s,{throwOnError:false,displayMode:!!d});
const S={key:'constante',p:{},x0:1,show:{f:1,d:1,t:1},timer:null,dir:1,view:'2d'};let B;
const App={prog(){const n=Object.keys(Q.done).length;$('#prog').textContent=`Progreso: ${n}/5 módulos`;$('#bar i').style.width=n*20+'%'}};
function setMod(k){S.key=k;const m=MODS[k],box=$('#params');S.p={};box.innerHTML='';
 for(const[n,[a,b,v,st]]of Object.entries(m.p)){S.p[n]=v;const l=document.createElement('label');l.innerHTML=`${n} <input type="range" min="${a}" max="${b}" step="${st}" value="${v}"><output>${v}</output> `;l.querySelector('input').oninput=e=>{S.p[n]=+e.target.value;l.querySelector('output').textContent=e.target.value;render()};box.append(l)}
 document.querySelectorAll('.mod').forEach(b=>b.classList.toggle('on',b.dataset.k==k));render();Q.reset(k)}
function render(){const m=MODS[S.key];B=build(S.key,S.p);Graph.draw(B,S);if(S.view=='3d')T3.update(B,S);
 const y=B.F(S.x0),d=B.D(S.x0);$('#x0o').textContent=S.x0.toFixed(1);
 $('#ficha').innerHTML=`<h3>${m.n}</h3><p>${m.c}</p>${tx(m.tex(S.p),1)}${tx(m.dtex(S.p),1)}<p><b>Regla:</b> ${m.rule}</p><ol>${m.steps(S.p).map(s=>`<li>${tx(s)}</li>`).join('')}</ol><p>En x₀=${S.x0.toFixed(1)}: f(x₀)=${y?.toFixed(2)}, pendiente de la tangente = <b class="ok">${d?.toFixed(2)}</b></p><p>${m.read}</p><p class="ok">Resultado: ${tx(m.dtex(S.p))}</p><p class="warn">Reflexiona: ${m.q}</p><small>Verificación Math.js: f'(x) = ${B.dn.toString()}</small>`}
function setX(v){S.x0=Math.max(-8,Math.min(8,v));$('#x0').value=S.x0;render()}
const G={pan:(a,b)=>Graph.pan(a,b),zoom:f=>Graph.zoom(f),reset:()=>Graph.reset(),msg:t=>$('#gmsg').textContent=t,
 setNorm(n){const r=Graph.rng();setX(+(r.x[0]+n*(r.x[1]-r.x[0])).toFixed(1))},
 cursor(px,py){const c=$('#cur');if(px==null){c.style.display='none';G.el=null;return}c.style.display='block';const X=px*innerWidth,Y=py*innerHeight;c.style.left=X-10+'px';c.style.top=Y-10+'px';
  const e=document.elementFromPoint(X,Y),b=e&&e.closest('button');if(b!==G.el){G.el=b;G.t=Date.now()}else if(b&&Date.now()-G.t>800){G.t=Date.now();b.click()}}};
$('#lf').onsubmit=e=>{e.preventDefault();const n=$('#name').value.trim();if(!/^[\p{L}][\p{L} .'-]{1,39}$/u.test(n)){$('#err').textContent='Escribe un nombre válido (2 a 40 letras).';return}
 $('#err').textContent='';$('#who').textContent=n;$('#login').classList.add('hidden');$('#app').classList.remove('hidden');$('#chat').classList.remove('hidden');
 $('#msgs').innerHTML=`<p>Hola ${n}, soy tu tutor de derivadas. ¿Qué quieres repasar?</p>`;setMod(S.key)};
$('#out').onclick=()=>{clearInterval(S.timer);if(Hand.on){Hand.stop();$('#lab').classList.remove('xr')}$('#app').classList.add('hidden');$('#chat').classList.add('hidden');$('#chatbox').classList.add('hidden');$('#login').classList.remove('hidden');$('#name').value=''};
$('#cat').innerHTML=Object.entries(MODS).map(([k,m])=>`<button class="mod" data-k="${k}">${m.i} ${m.n}<small>${m.d}</small></button>`).join('');
document.querySelectorAll('.mod').forEach(b=>b.onclick=()=>setMod(b.dataset.k));
[['sF','f'],['sD','d'],['sT','t']].forEach(([id,k])=>$('#'+id).onchange=e=>{S.show[k]=e.target.checked?1:0;render()});
$('#x0').oninput=e=>setX(+e.target.value);
$('#play').onclick=()=>{clearInterval(S.timer);S.timer=setInterval(()=>{if(S.x0>=6)S.dir=-1;if(S.x0<=-6)S.dir=1;setX(+(S.x0+S.dir*.1).toFixed(1))},60)};
$('#pause').onclick=()=>clearInterval(S.timer);
$('#rst').onclick=()=>{clearInterval(S.timer);S.x0=1;$('#x0').value=1;Graph.reset();setMod(S.key)};
$('#zi').onclick=()=>Graph.zoom(.8);$('#zo').onclick=()=>Graph.zoom(1.25);
document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{S.view=b.dataset.v;document.querySelectorAll('[data-v]').forEach(x=>x.classList.toggle('on',x==b));$('#graph').classList.toggle('hidden',S.view=='3d');$('#three').classList.toggle('hidden',S.view=='2d');render()});
$('#camBtn').onclick=async()=>{const b=$('#camBtn');if(Hand.on){Hand.stop();$('#lab').classList.remove('xr');b.classList.remove('on');return G.msg('Cámara apagada.')}
 try{G.msg('Solicitando permiso de cámara…');await Hand.start($('#cam'),G);$('#lab').classList.add('xr');b.classList.add('on');G.msg('Cámara activa. Muestra una mano.')}catch(e){G.msg('No se pudo activar la cámara: '+e.message+' Usa mouse y teclado.')}};
$('#help').onclick=()=>alert('🖐 Palma abierta: desplazar\n☝ Índice (mantener): seleccionar botón\n🤏 Pinza: mover punto de tangencia (x)\n✋✋ Dos manos: zoom\n✊ Puño: restablecer vista\n\nAlternativa: mouse (arrastrar y rueda) y flechas ← → para x₀.');
addEventListener('keydown',e=>{if(!$('#app').classList.contains('hidden')&&e.target.tagName!='INPUT'){if(e.key=='ArrowLeft')setX(S.x0-.1);if(e.key=='ArrowRight')setX(S.x0+.1)}});
$('#chatbtn').onclick=()=>$('#chatbox').classList.toggle('hidden');
$('#cf').onsubmit=e=>{e.preventDefault();const t=$('#ci').value.trim();if(!t)return;const m=$('#msgs'),p=(c,x)=>{const el=document.createElement('p');el.className=c;el.textContent=x;m.append(el)};p('',"Tú: "+t);p('ok',"Tutor: "+ask(t));$('#ci').value='';m.scrollTop=m.scrollHeight};
