
const M=[{"n": "Поступление", "lead": "Абитуриентам", "art": 0, "g": [["Что выбрать", ["!Каталог программ", "Бакалавриат и специалитет", "Магистратура", "Аспирантура"]], ["Как поступить", ["Правила приема", "Календарь приема", "Вступительные испытания", "Стоимость обучения", "Калькулятор ЕГЭ", "Списки поступающих"]], ["Кому", ["Школьникам", "Иностранным абитуриентам", "Абитуриентам ближнего зарубежья", "Контакты"]]]}, {"n": "Образование", "lead": "Образование", "art": 1, "g": [["Где учат", ["Институты", "Филиалы"]], ["Чему ещё учат", ["Дополнительное профессиональное образование", "Онлайн-курсы", "Цифровая кафедра", "Уральская передовая инженерная школа «Цифровое производство»", "Базовые кафедры"]]]}, {"n": "Наука", "lead": "Наука", "art": 2, "g": [["Исследования", ["Основные направления научной деятельности", "Прорывные научные проекты", "Международные лаборатории", "Центры коллективного пользования", "Инновации"]], ["Ученым и аспирантам", ["Конкурсы и гранты", "Диссертационные советы", "Портал молодежной науки"]], ["Библиотека и издания", ["Зональная научная библиотека", "Электронный научный архив", "Научное издательство"]]]}, {"n": "Студентам", "lead": "Студентам", "art": 3, "g": [["Учеба", ["Расписание занятий", "Стипендии и стипендиаты", "Рейтинг 10% (БРС)", "Организация и прохождение практики", "Перевод и восстановление", "Документы для студентов"]], ["Поддержка", ["Меры поддержки", "Социальные вопросы", "Инклюзивное образование", "Воинский учет и отсрочки от призыва"]], ["Жизнь и карьера", ["Союз студентов УрФУ", "Спорт", "Творчество", "Волонтерство", "Центр карьеры и трудоустройства", "Международный студенческий обмен"]]]}, {"n": "Университет", "lead": "Об университете", "art": 4, "g": [["Университет", ["Университет сегодня", "История", "Новый кампус", "Ректорат", "Структура и органы управления", "Международная деятельность"]], ["Новости и контакты", ["Новости", "Мероприятия", "Контакты", "Обратная связь"]], ["Аудиториям", ["Сотрудникам", "Партнерам", "Работодателям", "Выпускникам", "СМИ"]]]}];
const CH='<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 3.5l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const DATA=[
 {t:'p',lv:1,n:'Мировая экономика и международный бизнес',s:'Бакалавриат · 38.03.01 Экономика · ИнЭУ'},
 {t:'p',lv:2,n:'Технологии государственного и муниципального управления',s:'Магистратура · 38.04.04 · ИнЭУ'},
 {t:'p',lv:3,n:'Ядерные энергетические установки, топливный цикл, радиационная безопасность',s:'Аспирантура · 2.4.9 · УралЭНИН'},
 {t:'d',n:'УП № 8936',s:'Учебный план · Мировая экономика и международный бизнес'},
 {t:'d',n:'УП № 8945',s:'Учебный план · Технологии государственного и муниципального управления'},
 {t:'n',n:'Лицеисты УрФУ приступили к занятиям в новом корпусе',s:'Новости УрФУ'},
 {t:'n',n:'Студент УрФУ завоевал серебро на чемпионате мира по подводному спорту',s:'Новости УрФУ'},
 {t:'n',n:'Олег Обухов: «Нам удалось не просто запустить новые программы, но и обеспечить набор на них»',s:'Новости УрФУ'}
];
const G={p:'Программы',d:'Документы',n:'Новости'};
const IC={d:'<svg class="ic" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M4 1.8h5.2L12.5 5v9.2H4z"/><path d="M9 1.8V5.2h3.4"/></svg>',n:'<svg class="ic" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M4.8 6.2h6.4M4.8 8.6h6.4M4.8 11h3.6"/></svg>'};
let open=null,scope='all',mega=null,hov=0;
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function render(){
  if(!open)return;const q=open.querySelector('input').value.trim().toLowerCase();
  const hit=DATA.filter(d=>!q||(d.n+' '+d.s).toLowerCase().includes(q));
  const cnt=k=>hit.filter(d=>k==='all'||d.t===k).length;
  open.querySelector('.sc').innerHTML=[['all','Всё'],['p','Программы'],['d','Документы'],['n','Новости']].map(([k,l])=>`<button type="button" data-k="${k}" class="${scope===k?'on':''}">${l}<i>${cnt(k)}</i></button>`).join('');
  const list=hit.filter(d=>scope==='all'||d.t===scope);let h='';
  for(const k of ['p','d','n']){const g=list.filter(d=>d.t===k);if(!g.length)continue;h+=`<div class="g">${G[k]}</div>`+g.map(d=>`<div class="it">${k==='p'?`<i class="dot" style="background:var(--lv${d.lv})"></i>`:IC[k]}<div><b>${esc(d.n)}</b><small>${esc(d.s)}</small></div></div>`).join('')}
  open.querySelector('.res').innerHTML=h||'<div class="none">Ничего не нашлось. Проверь написание или сократи запрос.</div>';
}

const frame=document.querySelector('.frame'),nav=document.querySelector('.top1'),hw=document.querySelector('.hwrap'),megaEl=document.querySelector('.mega');
function drawNav(){nav.innerHTML=M.map((m,i)=>`<button type="button" data-top="${i}" aria-expanded="false" class="${i===0?'cur':''}">${m.n}${CH}</button>`).join('')}
function closeAll(){if(open){open.remove();open=null;frame.classList.remove('dim')}if(mega){mega=null;hw.classList.remove('open');frame.classList.remove('dim')}document.querySelectorAll('.pop').forEach(p=>p.hidden=true);document.querySelectorAll('[aria-expanded=true]').forEach(b=>b.setAttribute('aria-expanded','false'))}
// каждая фигура — список [глубина, разметка]; глубина задаёт сдвиг слоя за курсором
const ART=[
 // анфилада арок: вход
 ()=>{const o=[];for(let k=0;k<17;k++){const z=Math.pow(.86,k),w=236*z,h=262*z,cx=150+(1-z)*26,by=292-(1-z)*150,x0=cx-w/2,x1=cx+w/2,yt=by-h+w/2;
   o.push([1-z,`<path d="M${x0.toFixed(1)} ${by.toFixed(1)}V${yt.toFixed(1)}A${(w/2).toFixed(1)} ${(w/2).toFixed(1)} 0 0 1 ${x1.toFixed(1)} ${yt.toFixed(1)}V${by.toFixed(1)}"/>`])}
   for(let i=0;i<9;i++){const x=32+i*29.5;o.push([.25,`<path d="M${x} 292L${(176+(x-150)*.08).toFixed(1)} 142" opacity=".5"/>`])}
   o.push([1,'<circle cx="176" cy="126" r="4" fill="url(#G)" stroke="none"/>']);return o},
 // волновая поверхность
 ()=>{const o=[];const P=(i,j)=>{const z=j/17,x=140+(i-12)*(8+z*16),y=70+z*z*210+Math.sin(i*.55+j*.6)*(6+z*22)*Math.cos(j*.35);return [x,y]};
  for(let j=0;j<18;j++){let d='';for(let i=0;i<25;i++){const [x,y]=P(i,j);d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}o.push([j/17,`<path d="${d}"/>`])}
  for(let i=0;i<25;i+=2){let d='';for(let j=0;j<18;j++){const [x,y]=P(i,j);d+=(j?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}o.push([.4,`<path d="${d}" opacity=".5"/>`])}return o},
 // сфера с орбитами
 ()=>{const o=[[.3,'<circle cx="140" cy="140" r="86"/>']];for(let k=1;k<9;k++){const q=(86*Math.sin(k*Math.PI/18)).toFixed(1);o.push([.3+k*.03,`<ellipse cx="140" cy="140" rx="${q}" ry="86"/>`],[.3-k*.02,`<ellipse cx="140" cy="140" rx="86" ry="${q}"/>`])}
  [0,60,120].forEach((r,n)=>{const a=(r-20)*Math.PI/180,x=140+150*Math.cos(a),y=140+150*Math.sin(a);o.push([.8+n*.1,`<ellipse cx="140" cy="140" rx="150" ry="${34+n*6}" transform="rotate(${r-20} 140 140)" stroke-width="1.3"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="url(#G)" stroke="none"/><circle cx="${(280-x).toFixed(1)}" cy="${(280-y).toFixed(1)}" r="2.5" fill="url(#G)" stroke="none"/>`])});return o},
 // воронка
 ()=>{const o=[];for(let k=0;k<34;k++){const r=132-k*3.7,cx=140+Math.sin(k*.42)*(4+k*.9),cy=26+k*7.6;o.push([k/33,`<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r*.3).toFixed(1)}" transform="rotate(${(Math.sin(k*.3)*10).toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`])}return o},
 // тоннель
 ()=>{const o=[];for(let k=0;k<30;k++){const z=Math.pow(.9,k),w=330*z;o.push([1-z,`<rect x="${(150-w/2).toFixed(1)}" y="${(128-w/2).toFixed(1)}" width="${w.toFixed(1)}" height="${w.toFixed(1)}" rx="${(w*.08).toFixed(1)}" transform="rotate(${k*7.5} 150 128)"/>`])}o.push([1,'<circle cx="150" cy="128" r="3.5" fill="url(#G)" stroke="none"/>']);return o}];

// фигура шапки каталога: одно тело, три состояния с морфингом (неогранённый шар → огранённый → с орбитами)
const mkBody=(sp=0)=>{
 const ax=.36,ay=-.5,R=92,C=[140,150],NT=8,NP=14,SEG=56,CT=8,CP=14,cs0=Math.cos(sp),sn0=Math.sin(sp);
 const P=(x0,y,z0)=>{const x=x0*cs0+z0*sn0,z=-x0*sn0+z0*cs0;const y1=y*Math.cos(ax)-z*Math.sin(ax),z1=y*Math.sin(ax)+z*Math.cos(ax);const x2=x*Math.cos(ay)+z1*Math.sin(ay),z2=-x*Math.sin(ay)+z1*Math.cos(ay);return [C[0]+x2,C[1]-y1,z2/R]};
 const S=(r,th,ph)=>[r*Math.sin(th)*Math.cos(ph),r*Math.cos(th),r*Math.sin(th)*Math.sin(ph)];
 // обмятины: гладкие вмятины и выпуклости в заданных точках сферы
 // центры обмятин задаём в координатах камеры (x вправо, y вверх, z к зрителю) и переводим в координаты тела, чтобы они были на видимой стороне и на силуэте
 const inv=(x,y,z)=>{const x1=x*Math.cos(-ay)+z*Math.sin(-ay),z1=-x*Math.sin(-ay)+z*Math.cos(-ay);const y2=y*Math.cos(-ax)-z1*Math.sin(-ax),z2=y*Math.sin(-ax)+z1*Math.cos(-ax);const th=Math.acos(Math.max(-1,Math.min(1,y2))),ph=Math.atan2(z2,x1);return [th,ph]};
 // геоид: широкие пологие впадины и поднятия, как Земля без воды
 const DENTS=[[...inv(.8,.45,.4),-.075,1.15],[...inv(-.7,.6,.4),.06,1.0],[...inv(-.75,-.5,.45),-.065,1.25],[...inv(.55,-.75,.35),.055,1.05],[...inv(.1,.05,1),-.04,.9],[...inv(0,-1,0),.045,.9]];
 const blobR=(th,ph)=>{const v=[Math.sin(th)*Math.cos(ph),Math.cos(th),Math.sin(th)*Math.sin(ph)];let f=1;for(const [t,p,a,w] of DENTS){const c=[Math.sin(t)*Math.cos(p),Math.cos(t),Math.sin(t)*Math.sin(p)];const d=Math.acos(Math.max(-1,Math.min(1,v[0]*c[0]+v[1]*c[1]+v[2]*c[2])));f+=a*Math.exp(-(d*d)/(w*w))}return R*f};
 const near=(v,set)=>set.reduce((a,b)=>Math.abs(b-v)<Math.abs(a-v)?b:a);
 const cTh=Array.from({length:CT+1},(_,k)=>Math.PI*k/CT),cPh=Array.from({length:CP+1},(_,k)=>2*Math.PI*k/CP);
 const chord=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
 const lat=(i,state)=>{const th=Math.PI*i/NT,pts=[];for(let k=0;k<=SEG;k++){const ph=2*Math.PI*k/SEG;let q;
   if(state===0)q=S(blobR(th,ph),th,ph);else{const t2=near(th,cTh);let a=cPh.findIndex(v=>v>ph);if(a<0)a=CP;if(a<1)a=1;const pa=cPh[a-1],pb=cPh[a];q=chord(S(R,t2,pa),S(R,t2,pb),(ph-pa)/(pb-pa))}
   pts.push(P(...q))}return pts};
 const lon=(j,state)=>{const ph=2*Math.PI*j/NP,pts=[];for(let k=0;k<=SEG/2;k++){const th=Math.PI*k/(SEG/2);let q;
   if(state===0)q=S(blobR(th,ph),th,ph);else{const p2=near(ph,cPh);let a=cTh.findIndex(v=>v>th);if(a<0)a=CT;if(a<1)a=1;const ta=cTh[a-1],tb=cTh[a];q=chord(S(R,ta,p2),S(R,tb,p2),(th-ta)/(tb-ta))}
   pts.push(P(...q))}return pts};
 const orb=(n,state)=>{const [rot,rx,ry]=[[8,1.55,.5],[70,1.7,.42],[128,1.45,.6]][n],a=rot*Math.PI/180,k=state===2?1:.98,pts=[];
   for(let i=0;i<=72;i++){const t=2*Math.PI*i/72,x=R*rx*k*Math.cos(t),yy=R*ry*k*Math.sin(t);const c=Math.cos(a),sn=Math.sin(a);pts.push(P(x*c-yy*sn*.55,x*sn+yy*c*.55,yy*1.2))}return pts};
 const diag=[];for(let a=0;a<CT;a++)for(let b=0;b<CP;b++){if((a+b)%2)continue;const p1=P(...S(R,cTh[a],cPh[b])),p2=P(...S(R,cTh[a+1],cPh[b+1]));diag.push([p1,p2])}
 const frames=[0,1,2].map(st=>({lines:[...Array.from({length:NT-1},(_,i)=>lat(i+1,st)),...Array.from({length:NP},(_,j)=>lon(j,st))],orbs:[0,1,2].map(n=>orb(n,st)),orbOp:st===2?1:0,op:[.7,.5,.45][st]}));
 return {frames,R,diag};
};
const BODY=mkBody(0);
const TONE=[['#fffbe0','#ffffff'],['#d6e6ff','#9fd8ff'],['#d2fff5','#a6e9ff'],['#ffe0ee','#e9d2ff'],['#ffd9e1','#ffa3b8']];
function openMega(i){const was=!!mega;closeAll();const m=M[i];mega=megaEl;hw.classList.add('open');frame.classList.add('dim');
  const grp=([h,it],c)=>`<div style="--c:${c}"><h4>${h}</h4>${it.map(x=>x[0]==='!'?`<button type="button" class="cur">${x.slice(1)}</button>`:`<button type="button">${x}</button>`).join('')}</div>`;
  const layers=ART[m.art]();const art=layers.map(([d,s],n)=>`<g style="--d:${d.toFixed(2)};--n:${n}">${s.replace(/<(path|ellipse|rect|circle)(?![^>]*fill=)/g,'<$1 pathLength="1"')}</g>`).join('');
  mega.innerHTML=`<button type="button" class="art a${m.art}"><svg viewBox="0 0 280 300" preserveAspectRatio="xMidYMid slice" fill="none" stroke="url(#G)" stroke-width=".9" aria-hidden="true"><defs><linearGradient id="G" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${TONE[m.art][0]}"/><stop offset="1" stop-color="${TONE[m.art][1]}"/></linearGradient></defs>${art}</svg><span>${m.lead}<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"/></svg></span></button><div class="cols">${m.g.map(grp).join('')}</div>`;
  const card=mega.querySelector('.art');
  card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5).toFixed(3));card.style.setProperty('--my',((e.clientY-r.top)/r.height-.5).toFixed(3))});
  card.addEventListener('pointerleave',()=>{card.style.setProperty('--mx',0);card.style.setProperty('--my',0)});
  nav.querySelector(`[data-top="${i}"]`).setAttribute('aria-expanded','true')}
function openSearch(){closeAll();const trg=frame.querySelector('[data-search]');const fr=frame.getBoundingClientRect(),r=trg.getBoundingClientRect();
  open=document.getElementById('sp').content.firstElementChild.cloneNode(true);scope='all';frame.appendChild(open);
  const w=760;frame.classList.add('dim');open.style.left=Math.round((fr.width-w)/2)+'px';open.style.top='96px';render();open.querySelector('input').focus({preventScroll:true})}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-search],[data-pop],[data-theme-btn],[data-top],.sp,.pop,.mega,.hA');
  if(!t){closeAll();const pk=document.querySelector('[data-pick]');if(pk&&!e.target.closest('.pick')){pk.nextElementSibling.hidden=true;pk.setAttribute('aria-expanded','false')}return}
  if(t.matches('[data-search]')){openSearch();return}
  if(t.matches('[data-top]')){const was=t.getAttribute('aria-expanded')==='true';if(was&&Date.now()-hov>400)closeAll();else if(!was)openMega(+t.dataset.top);return}
  if(t.matches('[data-pop]')){const p=t.nextElementSibling,o=p.hidden;closeAll();p.hidden=!o;t.setAttribute('aria-expanded',o);return}
  if(t.matches('[data-theme-btn]')){const dark=document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.dataset.theme=dark?'light':'dark';return}
  const k=e.target.closest('.sc button');if(k){scope=k.dataset.k;render()}
});
nav.addEventListener('pointerover',e=>{const b=e.target.closest('[data-top]');if(b&&mega&&b.getAttribute('aria-expanded')!=='true'){openMega(+b.dataset.top);hov=Date.now()}});
document.addEventListener('input',e=>{if(e.target.matches('.sp input'))render()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll();if(e.key==='/'&&!e.target.matches('input,textarea')){e.preventDefault();const b=document.getElementById('bq');b?b.focus():openSearch()}});
drawNav();

// ——— шаг 2 ———
const PATHS=[{n:'После школы',c:'#f5c400',tc:'#141416',lv:[['Бакалавриат',81],['Специалитет',17],['Базовое высшее',90]]},{n:'Есть диплом',c:'#4D22C4',tc:'#ffffff',lv:[['Магистратура',92],['Специализированное высшее',85]]},{n:'Хочу в науку',c:'#2a9a72',tc:'#ffffff',lv:[['Аспирантура',142]]}];
const f2=document.querySelector('.f2');let cp=0,offs=new Set();
const FIGMAP=[0,1,2];
// показ v16: фигура пути — 9 эллипсов из макета «Каталог · шапка (эскиз)»; при смене пути — морфинг формы и цвета; в покое — «дыхание» волной по кольцам
const FIGS=[
 [[150,44,34,34,'#f5c400'],[150,58.5,48.5,48.5,'#f5c400'],[150,73,63,63,'#f5c400'],[150,87.5,77.5,77.5,'#f5c400'],[150,102,92,92,'#f5c400'],[150,116.5,106.5,106.5,'#f0ab12'],[150,131,121,121,'#e88230'],[150,145.5,135.5,135.5,'#e0594d'],[150,160,150,150,'#d8306b']],
 [[150,150,140,140,'#2a9a72'],[150,150,137.9,140,'#5a7d70'],[150,150,131.6,140,'#8b5f6e'],[150,150,121.2,140,'#bb426c'],[150,150,107.2,140,'#d8306b'],[150,150,90,140,'#d8306b'],[150,150,70,140,'#d8306b'],[150,150,47.9,140,'#d8306b'],[150,150,24.3,140,'#d8306b']],
 [[150,230,140,36.4,'#2a9a72'],[150,205.7,137.9,35.8,'#2a997a'],[150,182.1,131.6,34.2,'#2a9782'],[150,160,121.2,31.5,'#2a968a'],[150,140,107.2,27.9,'#2a9492'],[150,122.8,90,23.4,'#2b939b'],[150,108.8,70,18.2,'#2b92a3'],[150,98.4,47.9,12.4,'#2b90ab'],[150,92.1,24.3,6.3,'#2b8fb3']]];
const hex2=h=>[1,3,5].map(k=>parseInt(h.slice(k,k+2),16));
// v27 (Василиса 10.11): «Есть диплом» — ромбы; у каждой линии «округлость» r (1 — эллипс, 0 — ромб), морфится вместе с формой
const FIGR=[1,0,1];
const FIGN=FIGS.map((f,fi)=>f.map(e=>[e[0],e[1],e[2],e[3],...hex2(e[4]),FIGR[fi]]));
// v28 (Василиса 10.11): «Хочу в науку» — орбиты: 9 эллипсов, повёрнутых вокруг центра через 20°; угол (индекс 8) морфится вместе с формой
FIGN.forEach(f=>f.forEach(e=>e.push(0)));
FIGN[2]=Array.from({length:9},(_,i)=>[150,150,140,38,42,154,114,1,i*20]);
const figD=(x,y,a,b,r)=>{const h=.5523*r,f=v=>v.toFixed(2);return `M${f(x)} ${f(y-b)}C${f(x+h*a)} ${f(y-b)} ${f(x+a)} ${f(y-h*b)} ${f(x+a)} ${f(y)}C${f(x+a)} ${f(y+h*b)} ${f(x+h*a)} ${f(y+b)} ${f(x)} ${f(y+b)}C${f(x-h*a)} ${f(y+b)} ${f(x-a)} ${f(y+h*b)} ${f(x-a)} ${f(y)}C${f(x-a)} ${f(y-h*b)} ${f(x-h*a)} ${f(y-b)} ${f(x)} ${f(y-b)}Z`};
const fig=f2.querySelector('.fig16');
// v22 (Василиса 10.11): каждая линия сама градиентная — из первого цвета пути во второй
const FIGG=[[[245,196,0],[255,135,92]],[[77,34,196],[255,135,92]],[[42,154,114],[43,143,179]]];
fig.innerHTML='<svg viewBox="0 0 300 300" fill="none" stroke-width="1.1"><defs><linearGradient id="fg16" x1="0" y1="0" x2="1" y2="1"><stop offset="0"/><stop offset="1"/></linearGradient></defs>'+FIGS[0].map(()=>'<path stroke="url(#fg16)" stroke-linejoin="round"/>').join('')+'</svg>';
const figStops=[...fig.querySelectorAll('stop')];let figGFrom=FIGG[0],figGCur=FIGG[0];
const figSvg=fig.firstChild,figEl=[...fig.querySelectorAll('path')];
const FIG_MORPH=900,FIG_BREATH=6000,FIG_SWAY=16000;
let figK=null,figFrom=FIGN[0],figCur=FIGN[0],figT0=-1e9,figAnim=null,figLast=0;
const figRM=matchMedia('(prefers-reduced-motion: reduce)');
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function figPaint(now){const t=Math.min(1,(now-figT0)/FIG_MORPH),e=ease(t),to=FIGN[figK];
  figCur=figFrom.map((a,i)=>a.map((v,k)=>v+(to[i][k]-v)*e));
  const still=figRM.matches;
  figCur.forEach((c,i)=>{const s=still?1:1+.018*Math.sin(now/FIG_BREATH*2*Math.PI-i*.55);const el=figEl[i];
    el.setAttribute('d',figD(c[0],c[1],c[2]*s,c[3]*s,c[7]));el.setAttribute('transform',`rotate(${c[8].toFixed(2)} 150 150)`);
});
  figGCur=figGFrom.map((c,j)=>c.map((v,k)=>v+(FIGG[figK][j][k]-v)*e));
  figGCur.forEach((c,j)=>figStops[j].setAttribute('stop-color',`rgb(${c[0]|0},${c[1]|0},${c[2]|0})`));
  figSvg.style.transform=`rotate(${(still?0:2.5*Math.sin(now/FIG_SWAY*2*Math.PI)).toFixed(2)}deg)`;
  return t<1}
function figLoop(now){cancelAnimationFrame(figAnim);
  if(now-figLast>=33||now-figT0<FIG_MORPH+40){figLast=now;const moving=figPaint(now);if(figRM.matches&&!moving)return}
  figAnim=requestAnimationFrame(figLoop)}
function drawFig(){const k=FIGMAP[cp];if(k===figK)return;const first=figK==null;figK=k;
  figFrom=first?FIGN[k]:figCur;figGFrom=first?FIGG[k]:figGCur;figT0=first?-1e9:performance.now();figAnim=requestAnimationFrame(figLoop)}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&figK!=null)figAnim=requestAnimationFrame(figLoop)});

const fmt=n=>n==null?'—':String(n);
const sum=i=>PATHS[i].lv.reduce((a,[,n])=>a+(n||0),0);
function nums(){return PATHS.map((p,i)=>`<span><b>${fmt(sum(i))}</b> ${p.n.toLowerCase()}</span>`).join('')}
function chips(){const p=PATHS[cp];return `<span class="lb">Уровни</span>`+p.lv.map(([n,c],i)=>`<button type="button" class="chip ${offs.has(i)?'off':''}" data-lv="${i}" style="--pc:${p.c}"><i></i>${n}<em>${fmt(c)}</em></button>`).join('')}
function draw2(){if(window.preDraw)preDraw();
  f2.querySelectorAll('.nums').forEach(e=>e.innerHTML=nums());
  const spEl=f2.querySelector('.spot');if(spEl)spEl.style.background=`radial-gradient(closest-side,${PATHS[cp].c},transparent)`;
  f2.querySelectorAll('.lvls').forEach(e=>e.innerHTML=chips());
  const sg=f2.querySelector('.segp');if(sg){sg.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('on',i===cp);b.querySelector('i').textContent=fmt(sum(i))});
  const on=sg.querySelector('button.on'),th=sg.querySelector('.th');th.style.left=on.offsetLeft+'px';th.style.width=on.offsetWidth+'px'}
  const TT=['После<br>школы','Есть<br>диплом','Хочу<br>в науку'];
  f2.querySelector('.pt16').innerHTML=PATHS.map((p,i)=>`<button type="button" class="pc16 ${i===cp?'on':''}" data-tile="${i}" aria-pressed="${i===cp}" style="--pc:${p.c};--tn:${['#fbf4cf','#e7e4f6','#d6ece3'][i]}"><span class="pn">${TT[i]}</span><span class="pl">${p.lv.map(([n,c],j)=>`<span class="${i===cp&&offs.has(j)?'off':''}">${n}</span>`).join('')}</span></button>`).join('');
  const ptEl=f2.querySelector('.pt');if(ptEl)ptEl.textContent=PATHS[cp].n.toLowerCase();
  const vb=f2.querySelector('.vB');vb.style.setProperty('--pc',PATHS[cp].c);vb.style.setProperty('--tc',PATHS[cp].tc);drawFig();
    const vcp=f2.querySelector('.vC .pop');if(vcp)vcp.innerHTML=PATHS.map((p,i)=>`<button type="button" role="option" data-pk="${i}" aria-selected="${i===cp}">${p.n}<em>${fmt(sum(i))}</em></button>`).join('');
  if(window.postDraw)postDraw();
}
document.addEventListener('click',e=>{
  const k=e.target.closest('.sw [data-k]');if(k){document.querySelectorAll('.sw [data-k]').forEach(b=>b.classList.toggle('on',b===k));f2.querySelectorAll('.k2 .v').forEach(v=>v.classList.toggle('on',v.classList.contains('v'+k.dataset.k)));draw2();return}
  const tl=e.target.closest('.tile .lr');if(tl&&+tl.dataset.tile===cp){const i=+tl.dataset.lv;if(offs.has(i))offs.delete(i);else if(offs.size<PATHS[cp].lv.length-1)offs.add(i);draw2();return}
  const p=e.target.closest('[data-p],[data-tile],[data-pk]');if(p){cp=+(p.dataset.p??p.dataset.tile??p.dataset.pk);offs=new Set();draw2();return}
  const c=e.target.closest('[data-lv]');if(c){const i=+c.dataset.lv;if(offs.has(i))offs.delete(i);else if(offs.size<PATHS[cp].lv.length-1)offs.add(i);draw2();return}
  const pk=e.target.closest('[data-pick]');if(pk){const pop=pk.nextElementSibling,o=pop.hidden;pop.hidden=!o;pk.setAttribute('aria-expanded',o)}
});
draw2();

(()=>{const vb=f2.querySelector('.vB'),tw=document.getElementById('tweak');if(!tw)return;const cs=getComputedStyle(vb),cf=getComputedStyle(f2);const def={};const tgt=r=>r.dataset.el==='frame'?f2:vb;
tw.querySelectorAll('[data-var]').forEach(r=>{const k=r.dataset.var;const v=parseFloat((r.dataset.el==='frame'?cf:cs).getPropertyValue('--'+k));def[k]=v;r.value=v;show(r)});
function show(r){const k=r.dataset.var,u=r.dataset.u;tw.querySelector(`[data-out="${k}"]`).textContent=r.value+(u||'');tgt(r).style.setProperty('--'+k,r.value+u)}
const sels=[...tw.querySelectorAll('[data-fig]')];sels.forEach((x,i)=>x.addEventListener('change',()=>{FIGMAP[i]=+x.value;drawFig()}));
tw.addEventListener('input',e=>{if(e.target.matches('[data-var]'))show(e.target)});
tw.addEventListener('click',e=>{if(e.target.matches('[data-reset]')){tw.querySelectorAll('[data-var]').forEach(r=>{r.value=def[r.dataset.var];show(r)})}
 if(e.target.matches('[data-copy]')){const t=[...tw.querySelectorAll('[data-var]')].map(r=>`${r.closest('label').querySelector('span').firstChild.textContent}: ${r.value}${r.dataset.u}`).concat(sels.map((x,i)=>'Фигура · '+PATHS[i].n+': '+x.options[x.selectedIndex].text)).join('\n');navigator.clipboard?.writeText(t);e.target.textContent='Скопировано';setTimeout(()=>e.target.textContent='Скопировать значения',1500)}});})();
