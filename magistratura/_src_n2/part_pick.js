/* Подбор программы за 4 вопроса — модальное окно + плавающая кнопка (компонент лендингов, 17.11).
   Нужны: PROGS (из part_rest.js), шрифты Bounded/Golos. Открывают: .pkf, [data-pick] */
(()=>{if(typeof PROGS==='undefined')return;
const A=['Инженерные науки','Информационные технологии','Естественные науки и математика','Социогуманитарные науки и технологии','Экономика и управление','Юриспруденция'];
const AC=[['07','08','12','13','14','15','18','19','20','22','23','27','28','29'],['02','09','10','11'],['01','03','04','05','06','21'],['37','39','41','42','43','44','45','46','47','49','50','51','54','58'],['38'],['40']];
const P=PROGS.map(p=>({...p,ar:AC.findIndex(c=>c.includes(p.c.slice(0,2)))}));
const pl=n=>{const a=n%10,b=n%100;return a===1&&b!==11?'программа':a>=2&&a<=4&&(b<12||b>14)?'программы':'программ'};
const vb=n=>n%10===1&&n%100!==11?'подходит':'подходят';
const fmt=n=>n.toLocaleString('ru-RU').replace(/ /g,' ');
const Q=[
 {k:'l',t:'Что ближе?',o:[['М','Хочу расширить образование, компетенции и возможности','Магистратура'],['СВ','Уже понимаю, для какой задачи мне нужны знания','Специализированное высшее'],['','Пока не знаю — покажи оба','']]},
 {k:'a',t:'Какая область?',o:A.map((a,i)=>[i,a]).concat([[-1,'Любая']])},
 {k:'f',t:'Как удобнее учиться?',o:[['Очная','Очно'],['Очно-заочная','Очно-заочно'],['Заочная','Заочно'],['','Неважно']]},
 {k:'b',t:'Нужны бюджетные места?',o:[[1,'Да, только с бюджетом'],[0,'Неважно']]}];
const S={l:'',a:-1,f:'',b:0};let step=0;const H=[];
const fit=(s,p)=>(!s.l||p.l===s.l)&&(s.a<0||p.ar===s.a)&&(!s.f&&!s.b||p.F.some(f=>(!s.f||f.f===s.f)&&(!s.b||f.b>0)));
const cnt=s=>P.filter(p=>fit(s,p)).length;
const ico='<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="pkg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF875C"/><stop offset="1" stop-color="#a29ff5"/></linearGradient></defs><path d="M12 12 2 4M12 12l9-7M12 12l10 5M12 12l-4 10M12 12 2 15" stroke="url(#pkg)" stroke-width="1.6" stroke-linecap="round" fill="none"/><circle cx="12" cy="12" r="2.2" fill="#FF875C"/></svg>';
document.body.insertAdjacentHTML('beforeend',`<button type="button" class="pkf" id="pkf" aria-haspopup="dialog">${ico}Подобрать программу <small>4 вопроса</small></button>
<div class="pk" id="pk" hidden><div class="pkb" role="dialog" aria-modal="true" aria-label="Подбор программы"><svg class="bg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" id="pkbg"></svg>
<div class="pkt"><div class="pkd" id="pksp"></div><div class="pka"><button id="pkbk" hidden>← Назад</button><button class="pkx" id="pkx" aria-label="Закрыть">×</button></div></div>
<div class="pkq"><div id="pkqa"></div><div class="pkn" aria-live="polite"><b id="pkn">${P.length}</b><span id="pknl"></span></div></div>
<div class="pkr" id="pkr" hidden><div class="pkrh"><div><h2 id="pkrt"></h2><div class="pkc" id="pkrc"></div></div><div class="pkac"><button id="pkag">Подобрать заново</button><button class="pkcc" id="pkall">Весь список программ</button></div></div><div class="pkl" id="pkl"></div></div>
</div></div>`);
const $=i=>document.getElementById(i),pk=$('pk'),box=pk.querySelector('.pkb');
{const c=[495,560],E=[[0,0],[480,0],[1000,0],[1440,0],[1440,420],[1440,900],[760,900],[0,900],[0,420],[0,0]],C=['#33177F','#4D22C4','#2a1478','#3a1c96','#2a1478','#4D22C4','#30177f','#2a1478','#3a1c96'];
 let h=`<defs><radialGradient id="pkgl"><stop offset="0" stop-color="#FF875C" stop-opacity=".7"/><stop offset=".45" stop-color="#c77ac8" stop-opacity=".18"/><stop offset="1" stop-color="#6B38F2" stop-opacity="0"/></radialGradient><filter id="pkbl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="50"/></filter></defs>`;
 for(let i=0;i<E.length-1;i++)h+=`<polygon points="${c} ${E[i]} ${E[i+1]}" fill="${C[i]}"/>`;
 h+=`<ellipse cx="${c[0]}" cy="${c[1]}" rx="380" ry="240" fill="url(#pkgl)" filter="url(#pkbl)"/>`;$('pkbg').innerHTML=h}
function num(to){const el=$('pkn'),from=+el.textContent||0,t0=performance.now();const go=t=>{const k=Math.min(1,(t-t0)/450),e=1-Math.pow(1-k,3);el.textContent=Math.round(from+(to-from)*e);if(k<1)requestAnimationFrame(go)};
 matchMedia('(prefers-reduced-motion:reduce)').matches?el.textContent=to:requestAnimationFrame(go);$('pknl').textContent=pl(to)+' '+vb(to)}
function render(){box.classList.remove('res');$('pkr').hidden=true;$('pksp').innerHTML=Q.map((_,i)=>`<i class="${i<=step?'on':''}"></i>`).join('');$('pkbk').hidden=step===0;
 const q=Q[step];$('pkqa').innerHTML=`<div class="pkfd"><div class="pkk">Вопрос ${step+1} из ${Q.length}</div><h2>${q.t}</h2><div class="pko${q.o.length>4?' pk2':''}">${q.o.map(([v,t,sub])=>{const n=cnt({...S,[q.k]:v});return `<button data-v="${v}" ${n?'':'disabled'}><div>${t}${sub?`<small>${sub}</small>`:''}</div><span>${n} ${pl(n)}</span></button>`}).join('')}</div></div>`;
 $('pkqa').querySelectorAll('button').forEach(b=>b.onclick=()=>{const v=b.dataset.v;H.push({...S});S[q.k]=q.k==='a'||q.k==='b'?+v:v;step++;step<Q.length?render():done()});num(cnt(S));
 const f=$('pkqa').querySelector('button:not([disabled])');f&&f.focus({preventScroll:true})}
function done(){const R=P.filter(p=>fit(S,p)).sort((x,y)=>y.bud-x.bud);box.classList.add('res');$('pkr').hidden=false;$('pkbk').hidden=false;
 $('pksp').innerHTML=Q.map(()=>'<i class="on"></i>').join('');
 $('pkrt').textContent=R.length+' '+pl(R.length)+' для тебя';
 $('pkrc').innerHTML=[S.l==='М'?'Магистратура':S.l==='СВ'?'Специализированное высшее':'',S.a>=0?A[S.a]:'',S.f?S.f+' форма':'',S.b?'Есть бюджет':''].filter(Boolean).map(c=>`<span>${c}</span>`).join('');
 $('pkl').innerHTML=R.map(p=>`<a href="https://masters.urfu.ru/programs/${p.id}" target="_blank" rel="noopener"><span class="pklv ${p.l==='М'?'':'s'}">${p.l==='М'?'Магистратура':'Специализированное высшее'}</span><h3>${p.n}</h3><div class="pkm">${p.c} · ${p.i} · ${p.F.map(f=>f.f.toLowerCase()).join(', ')}</div><dl><div><dt>Бюджет</dt><dd>${p.bud}</dd></div><div><dt>Платно</dt><dd>${p.paid}</dd></div>${p.price?`<div><dt>Стоимость</dt><dd>от ${fmt(p.price)} ₽</dd></div>`:''}</dl></a>`).join('');
 $('pkr').scrollTop=0;$('pkag').focus({preventScroll:true})}
let last=null;
function open(){last=document.activeElement;Object.assign(S,{l:'',a:-1,f:'',b:0});H.length=0;step=0;$('pkn').textContent=P.length;pk.hidden=false;document.documentElement.style.overflow='hidden';requestAnimationFrame(()=>pk.classList.add('on'));render()}
function close(){pk.classList.remove('on');document.documentElement.style.overflow='';setTimeout(()=>{pk.hidden=true},300);last&&last.focus&&last.focus({preventScroll:true})}
$('pkbk').onclick=()=>{if(!H.length)return;Object.assign(S,H.pop());step=Math.min(step,Q.length)-1;render()};
$('pkag').onclick=()=>{Object.assign(S,{l:'',a:-1,f:'',b:0});H.length=0;step=0;render()};
$('pkall').onclick=()=>{close();const t=document.getElementById('programs');t&&t.scrollIntoView({behavior:'smooth'})};
$('pkx').onclick=close;pk.addEventListener('click',e=>{if(e.target===pk)close()});
addEventListener('keydown',e=>{if(!pk.hidden&&e.key==='Escape')close()});
$('pkf').onclick=open;document.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open()}));
// плавающая кнопка: после первого экрана, прячется у списка программ и в финале
const fb=$('pkf'),hero=document.querySelector('.top'),hide=[document.getElementById('programs'),document.getElementById('apply')].filter(Boolean);
const vis=new Set();const io=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target));upd()},{threshold:0});
const upd=()=>{const past=hero?hero.getBoundingClientRect().bottom<80:scrollY>600;fb.classList.toggle('on',past&&!vis.size)};
hide.forEach(h=>io.observe(h));addEventListener('scroll',upd,{passive:true});upd();
})();
