/* Подбор программы за 4 вопроса (компонент лендингов, 17.11).
   Нужны глобальные PROGS, AREAS, S, draw, fb из part_rest.js. В конце применяет фильтры к списку #programs и прокручивает к нему.
   Открывают: .pkf (плавающая) и любые [data-pick]. */
(()=>{if(typeof PROGS==='undefined'||typeof S==='undefined')return;
const P=PROGS,LS=S;
const inA=(p,i)=>AREAS[i][1].includes(p.pre);
const pl=n=>{const a=n%10,b=n%100;return a===1&&b!==11?'программа':a>=2&&a<=4&&(b<12||b>14)?'программы':'программ'};
const vb=n=>n%10===1&&n%100!==11?'подходит':'подходят';
const plN=n=>{const a=n%10,b=n%100;return a===1&&b!==11?'направление':a>=2&&a<=4&&(b<12||b>14)?'направления':'направлений'};
const W={l:'',a:-1,f:'',b:0};let step=0;const H=[];
const fit=(s,p)=>(!s.l||p.l===s.l)&&(s.a<0||inA(p,s.a))&&(!s.f||p.forms.includes(s.f))&&(!s.b||p.bud>0);
const cnt=s=>P.filter(p=>fit(s,p)).length;
// мини-описание области: самые частые направления (из данных masters.urfu.ru)
const dirs=s=>{const m=new Map();P.filter(p=>fit(s,p)).forEach(p=>m.set(p.d,(m.get(p.d)||0)+1));const t=[...m].sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
 return t.slice(0,3).join(' · ')+(t.length>3?` · и ещё ${t.length-3} ${plN(t.length-3)}`:'')};
const fm=n=>n.toLocaleString('ru-RU').replace(/\u00a0|,/g,' ');
const price=(s,f)=>{const v=P.filter(p=>fit(s,p)).flatMap(p=>p.F.filter(x=>x.f===f&&x.p>0).map(x=>x.p));return v.length?'Стоимость от '+fm(Math.min(...v))+' ₽':''};
const seats=s=>{const R=P.filter(p=>fit(s,p));const n=R.reduce((a,p)=>a+(s.f?p.F.filter(x=>x.f===s.f).reduce((b,x)=>b+x.b,0):p.bud),0);return n?'Всего '+fm(n)+' бюджетных мест':''};
const Q=[
 {k:'l',t:'Что ближе?',o:()=>[['М','Хочу расширить образование, компетенции и возможности','Магистратура — углублённые знания по направлению'],['СВ','Уже понимаю, для какой задачи мне нужны знания','Специализированное высшее — подготовка под конкретную профессиональную задачу: научные исследования, развитие в профессии или управление'],['','Пока не знаю — покажи оба','']]},
 {k:'a',t:'Какая область?',two:1,o:()=>AREAS.map((a,i)=>[i,a[0],dirs({...W,a:i})]).concat([[-1,'Любая','']])},
 {k:'f',t:'Как удобнее учиться?',o:()=>[['Очная','Очная'],['Очно-заочная','Очно-заочная'],['Заочная','Заочная'],['','Неважно']].map(([v,t])=>[v,t,v?price({...W,f:v},v):''])},
 {k:'b',t:'Нужны бюджетные места?',o:()=>[[1,'Да, только с бюджетом',seats({...W,b:1})],[0,'Неважно','']]}];
const ico='<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="pkg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF875C"/><stop offset="1" stop-color="#a29ff5"/></linearGradient></defs><path d="M12 12 2 4M12 12l9-7M12 12l10 5M12 12l-4 10M12 12 2 15" stroke="url(#pkg)" stroke-width="1.6" stroke-linecap="round" fill="none"/><circle cx="12" cy="12" r="2.2" fill="#FF875C"/></svg>';
document.body.insertAdjacentHTML('beforeend',`<button type="button" class="pkf" id="pkf" aria-haspopup="dialog">Подобрать программу <small>4 вопроса</small></button>
<div class="pk" id="pk" hidden><div class="pkb" role="dialog" aria-modal="true" aria-label="Подбор программы"><svg class="pkrays" id="pkrays" aria-hidden="true"></svg>
<div class="pkt"><div class="pkd" id="pksp"></div><div class="pka"><button id="pkbk" hidden>← Назад</button><button class="pkx" id="pkx" aria-label="Закрыть">×</button></div></div>
<div class="pkq"><div id="pkqa"></div><div class="pkn" aria-live="polite"><b id="pkn">${P.length}</b><span id="pknl"></span></div></div>
</div></div>`);
const g=i=>document.getElementById(i),pk=g('pk');
// тонкие лучи из точки слева снизу (за краем окна)
const rays=()=>{const sv=g('pkrays'),bx=sv.parentNode,W=bx.clientWidth,H=bx.clientHeight;if(!W)return;const ox=-W*.06,oy=H*1.12;
 let h=`<defs><linearGradient id="pkrl" gradientUnits="userSpaceOnUse" x1="${ox}" y1="${oy}" x2="${W}" y2="0"><stop offset="0" stop-color="#FF875C" stop-opacity=".5"/><stop offset=".4" stop-color="#c77ac8" stop-opacity=".18"/><stop offset=".85" stop-color="#a29ff5" stop-opacity="0"/></linearGradient><radialGradient id="pkrg" cx="${ox}" cy="${oy}" r="${W*.55}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FF875C" stop-opacity=".22"/><stop offset="1" stop-color="#FF875C" stop-opacity="0"/></radialGradient></defs><circle cx="${ox}" cy="${oy}" r="${W*.55}" fill="url(#pkrg)"/>`;
 // мягкие грани-клинья без контуров: чередуются по яркости, гаснут к правому верхнему углу
 const A=[-4,-13,-22,-33,-45,-58,-72];const L=Math.hypot(W,H)*1.25,O=[.16,.06,.12,.04,.09,.03];
 for(let i=0;i<A.length-1;i++){const r1=A[i]*Math.PI/180,r2=A[i+1]*Math.PI/180;
  h+=`<polygon points="${ox},${oy} ${ox+Math.cos(r1)*L},${oy+Math.sin(r1)*L} ${ox+Math.cos(r2)*L},${oy+Math.sin(r2)*L}" fill="url(#pkrl)" opacity="${O[i]*3}"/>`}
 sv.setAttribute('viewBox',`0 0 ${W} ${H}`);sv.innerHTML=h};
new ResizeObserver(rays).observe(pk.querySelector('.pkb'));
function num(to){const el=g('pkn'),from=+el.textContent||0,t0=performance.now();const go=t=>{const k=Math.min(1,(t-t0)/450),e=1-Math.pow(1-k,3);el.textContent=Math.round(from+(to-from)*e);if(k<1)requestAnimationFrame(go)};
 matchMedia('(prefers-reduced-motion:reduce)').matches?el.textContent=to:requestAnimationFrame(go);g('pknl').textContent=pl(to)+' '+vb(to)}
function render(){g('pksp').innerHTML=Q.map((_,i)=>`<i class="${i<=step?'on':''}"></i>`).join('');g('pkbk').hidden=step===0;
 const q=Q[step];const opts=q.o().map(([v,t,sub])=>[v,t,sub,cnt({...W,[q.k]:v})]).filter(o=>o[3]>0);
 g('pkqa').innerHTML=`<div class="pkfd"><div class="pkk">Вопрос ${step+1} из ${Q.length}</div><h2>${q.t}</h2><div class="pko${q.two?' pk2':''}">${opts.map(([v,t,sub,n])=>`<button data-v="${v}"><b>${t}<i>${n}</i></b>${sub?`<small>${sub}</small>`:''}</button>`).join('')}</div></div>`;
 g('pkqa').querySelectorAll('button').forEach(b=>b.onclick=()=>{const v=b.dataset.v;H.push({...W});W[q.k]=q.k==='a'||q.k==='b'?+v:v;step++;step<Q.length?render():apply()});num(cnt(W));
 const f=g('pkqa').querySelector('button');f&&f.focus({preventScroll:true})}
function apply(){LS.l=W.l;LS.a.clear();if(W.a>=0)LS.a.add(String(W.a));LS.f.clear();if(W.f)LS.f.add(W.f);
 LS.i.clear();LS.q='';const sq=document.querySelector('#programs input[type=search],#programs .srch input');if(sq)sq.value='';
 LS.b=!!W.b;if(typeof fb!=='undefined'&&fb){fb.classList.toggle('on',LS.b);fb.setAttribute('aria-checked',LS.b)}
 LS.pg=1;draw();close();const t=document.getElementById('programs');if(t)setTimeout(()=>t.scrollIntoView({behavior:'smooth'}),120)}
let last=null;
function open(){last=document.activeElement;Object.assign(W,{l:'',a:-1,f:'',b:0});H.length=0;step=0;g('pkn').textContent=P.length;pk.hidden=false;document.documentElement.style.overflow='hidden';requestAnimationFrame(()=>pk.classList.add('on'));render()}
function close(){pk.classList.remove('on');document.documentElement.style.overflow='';setTimeout(()=>{pk.hidden=true},300);last&&last.focus&&last.focus({preventScroll:true})}
g('pkbk').onclick=()=>{if(!H.length)return;Object.assign(W,H.pop());step--;render()};
g('pkx').onclick=close;pk.addEventListener('click',e=>{if(e.target===pk)close()});
addEventListener('keydown',e=>{if(!pk.hidden&&e.key==='Escape')close()});
g('pkf').onclick=open;document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open()}));
const fbtn=g('pkf'),hero=document.querySelector('.top'),hide=[document.getElementById('programs'),document.getElementById('apply')].filter(Boolean);
const vis=new Set();const io=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target));upd()},{threshold:0});
const upd=()=>{const past=hero?hero.getBoundingClientRect().bottom<80:scrollY>600;fbtn.classList.toggle('on',past&&!vis.size)};
hide.forEach(h=>io.observe(h));addEventListener('scroll',upd,{passive:true});upd();
})();
