const $=s=>document.querySelector(s);const $$=s=>document.querySelector(s)._v;

/* ===== данные: masters.urfu.ru/programs/list, 16.11.2026 ===== */
const PROGS=%PROGS%;
const AREAS=[['Инженерные науки',['07','08','12','13','14','15','18','19','20','22','23','27','28','29']],['Информационные технологии',['02','09','10','11']],['Естественные науки и математика',['01','03','04','05','06','21']],['Социогуманитарные науки и технологии',['37','39','40','41','42','43','44','45','46','47','49','50','51','54','58']],['Экономика и управление',['38']],['Юриспруденция',['40']]];
PROGS.forEach(p=>{p.bud=p.F.reduce((s,f)=>s+f.b,0);p.paid=p.F.reduce((s,f)=>s+f.k,0);const pr=p.F.map(f=>f.p).filter(x=>x>0);p.price=pr.length?Math.min(...pr):0;p.forms=p.F.map(f=>f.f);p.pre=p.c.slice(0,2)});
const LV={'М':'Магистратура','СВ':'Специализированное высшее'};
const S={l:'',a:$$('#fa'),q:'',i:$$('#fi'),f:$$('#ff'),b:false,v:'table',pg:1};

const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const hl=t=>{if(!S.q)return esc(t);const i=t.toLowerCase().indexOf(S.q.toLowerCase());return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+S.q.length))+'</mark>'+esc(t.slice(i+S.q.length))};
const rub=n=>n?'от '+n.toLocaleString('ru-RU').replace(/,/g,' ')+' ₽':'—';
function pass(p,skip){return (skip==='l'||!S.l||p.l===S.l)&&(skip==='a'||!S.a.size||[...S.a].some(i=>AREAS[+i][1].includes(p.pre)))&&(!S.i.size||S.i.has(p.i))&&(!S.f.size||p.forms.some(x=>S.f.has(x)))&&(!S.b||p.bud>0)&&
 (!S.q||(p.n+' '+p.c+' '+p.d).toLowerCase().includes(S.q.toLowerCase()))}
const fi=$('#fi');[...new Map(PROGS.map(p=>[p.i,p.I]))].sort((x,y)=>x[0].localeCompare(y[0])).forEach(([k,v])=>fi.insertAdjacentHTML('beforeend',`<option value="${k}">${esc(v)}</option>`));
const fa=$('#fa');fa.innerHTML='<option value="-1">Все области</option>'+AREAS.map((a,i)=>`<option value="${i}">${a[0]}</option>`).join('');fa.onchange=()=>{S.pg=1;draw()};
const go=p=>window.open('https://masters.urfu.ru/programs/'+p.id,'_blank','noopener');
const ty=p=>`<span class="k25l ${p.l==='М'?'lvm':'lvs'}">${LV[p.l]}</span>`;
const EXT='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5"/></svg>';
const inst=p=>`<span data-tip="${esc(p.I)}" tabindex="0">${p.i}</span>`;
const GO='<span class="go"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
const facts=p=>`<dl class="fx"><div><dt>Бюджет</dt><dd>${p.bud}</dd></div><div><dt>Платно</dt><dd>${p.paid}</dd></div><div><dt>Институт</dt><dd class="fi">${inst(p)}</dd></div></dl>`;
function draw(){
 const all=PROGS.filter(p=>pass(p));
 document.querySelectorAll('#lvl button').forEach(b=>{b.classList.toggle('on',b.dataset.l===S.l);b.querySelector('i').textContent=PROGS.filter(p=>pass(p,'l')&&(!b.dataset.l||p.l===b.dataset.l)).length});
 window.ddSync&&ddSync();chips();
 const PER=S.v==='cards'?12:10,NP=Math.max(1,Math.ceil(all.length/PER));if(S.pg>NP)S.pg=NP;const rows=all.slice((S.pg-1)*PER,S.pg*PER);
 $('#cnt').textContent=all.length?`${all.length} ${pl(all.length)}`:'';
 const ls=$('#ls');
 if(!all.length){ls.className='';ls.innerHTML='<div class="empty">Ничего не нашлось. Попробуй изменить фильтры.</div>'}
 else if(S.v==='table'){ls.className='tb';ls.innerHTML=`<table class="t51"><colgroup><col><col style="width:84px"><col style="width:84px"><col style="width:128px"><col style="width:56px"></colgroup><thead><tr><th>Программа</th><th>Бюджет</th><th>Платно</th><th>Институт</th><th><span class="sr">Перейти</span></th></tr></thead><tbody>${rows.map((p,k)=>`<tr data-k="${k}" class="${p.l==='М'?'lvm':'lvs'}"><td><div class="t51m">${ty(p)}</div><b class="t51n">${hl(p.n)} <span class="cd64" data-tip="${esc(p.c+' '+p.d)}" tabindex="0">${hl(p.c)}</span></b></td><td class="t51d">${p.bud}</td><td class="t51d">${p.paid}</td><td class="t51i">${inst(p)}</td><td class="t51x">${EXT}</td></tr>`).join('')}</tbody></table>`}
 else{ls.className='ls '+(S.v==='cards'?'cards':'');ls.innerHTML=rows.map((p,k)=>`<article class="rw ${p.l==='М'?'lvm':'lvs'}" data-k="${k}" tabindex="0"><div class="rt">${ty(p)}<span class="t51x">${EXT}</span></div><div class="nm">${hl(p.n)}</div><div class="cd">${hl(p.c)} ${hl(p.d)}</div>${facts(p)}</article>`).join('')}
 ls.querySelectorAll('[data-k]').forEach(e=>{e.onclick=ev=>{if(ev.target.closest('[data-tip]'))return;go(rows[+e.dataset.k])};e.onkeydown=ev=>{if(ev.key==='Enter')go(rows[+e.dataset.k])}});
 const AR=d=>`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
 let pg='';if(NP>1){const nums=[];for(let i=1;i<=NP;i++){if(i===1||i===NP||Math.abs(i-S.pg)<=1||(S.pg<=3&&i<=4)||(S.pg>=NP-2&&i>=NP-3))nums.push(i)}
  let prev=0;const items=nums.map(i=>{const gap=prev&&i-prev>1?'<span class="pgd">…</span>':'';prev=i;return gap+`<button type="button" data-p="${i}" class="${i===S.pg?'on':''}"${i===S.pg?' aria-current="page"':''}>${i}</button>`}).join('');
  pg=`<nav class="pgn" aria-label="Страницы списка программ"><button type="button" class="pga" data-p="${S.pg-1}" aria-label="Предыдущая страница"${S.pg===1?' disabled':''}>${AR('M10 3.5 5.5 8l4.5 4.5')}</button>${items}<button type="button" class="pga" data-p="${S.pg+1}" aria-label="Следующая страница"${S.pg===NP?' disabled':''}>${AR('M6 3.5 10.5 8 6 12.5')}</button></nav><span class="pgc">${(S.pg-1)*PER+1}–${Math.min(S.pg*PER,all.length)} из ${all.length}</span>`}
 $('#more').innerHTML=pg;
 $('#more').querySelectorAll('button[data-p]').forEach(b=>b.onclick=()=>{S.pg=+b.dataset.p;draw();const t=$('.lbar').getBoundingClientRect().top+scrollY-96;scrollTo({top:t,behavior:'smooth'})});
}
function chips(){const c=$('#chips');if(!c)return;const it=[];
 const add=(sel,set,lab)=>[...set].forEach(v=>{const o=[...sel.options].find(x=>x.value===v);it.push({t:lab?lab(v):(o?o.text:v),sel,set,v})});
 add($('#fa'),S.a);add($('#fi'),S.i);add($('#ff'),S.f);
 if(S.b)it.push({t:'Есть бюджет',b:1});
 const X='<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l6 6M8 2 2 8"/></svg>';
 c.innerHTML=it.map((x,k)=>`<span class="chp" data-c="${k}"><button type="button" class="chl" title="${esc(x.t)}">${esc(x.t)}</button><button type="button" class="chx" aria-label="Убрать: ${esc(x.t)}">${X}</button></span>`).join('')+(it.length>1?'<button type="button" class="chr">Сбросить всё</button>':'');
 c.hidden=!it.length;
 c.querySelectorAll('.chp').forEach(e=>{const x=it[+e.dataset.c];
  e.querySelector('.chx').onclick=ev=>{ev.stopPropagation();if(x.b){tb()}else{x.set.delete(x.v);S.pg=1;draw()}};
  e.querySelector('.chl').onclick=ev=>{ev.stopPropagation();if(x.b)return;x.sel._dd.open()}});
 const r=c.querySelector('.chr');if(r)r.onclick=()=>{S.a.clear();S.i.clear();S.f.clear();if(S.b){S.b=false;fb.classList.remove('on');fb.setAttribute('aria-checked',false)}S.pg=1;draw()};
}
function pl(n){const a=n%10,b=n%100;return a===1&&b!==11?'программа':a>=2&&a<=4&&(b<12||b>14)?'программы':'программ'}
document.querySelectorAll('#lvl button').forEach(b=>b.onclick=()=>{S.l=b.dataset.l;S.pg=1;draw()});
document.querySelectorAll('#ar button').forEach(b=>b.onclick=()=>{S.a.clear();if(+b.dataset.a>=0)S.a.add(b.dataset.a);S.pg=1;draw()});
const hq=$('#hq');if(hq){hq.closest('form').onsubmit=e=>{e.preventDefault();S.q=hq.value.trim();$('#q').value=S.q;S.pg=1;draw();$('#programs').scrollIntoView({behavior:'smooth'})}}
document.querySelectorAll('[data-hq]').forEach(b=>b.onclick=()=>{S.a.clear();S.a.add(b.dataset.hq);S.pg=1;draw();$('#programs').scrollIntoView({behavior:'smooth'})});
document.querySelectorAll('[data-to]').forEach(a=>a.addEventListener('click',()=>{S.l=a.dataset.to;S.pg=1;draw()}));
$('#q').oninput=e=>{S.q=e.target.value.trim();S.pg=1;draw()};
fi.onchange=()=>{S.pg=1;draw()};
$('#ff').onchange=()=>{S.pg=1;draw()};
const fb=$('#fb');const tb=()=>{S.b=!S.b;fb.classList.toggle('on',S.b);fb.setAttribute('aria-checked',S.b);S.pg=1;draw()};fb.onclick=tb;fb.onkeydown=e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();tb()}};
document.querySelectorAll('#vw button').forEach(b=>b.onclick=()=>{S.v=b.dataset.v;document.querySelectorAll('#vw button').forEach(x=>x.classList.toggle('on',x===b));draw()});
draw();

document.querySelectorAll('#fin button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#fin button').forEach(x=>x.classList.toggle('on',x===b))});
document.querySelectorAll('#vl a').forEach((a,i)=>a.onclick=()=>{document.querySelectorAll('#vl a').forEach(x=>x.classList.toggle('on',x===a));$('#vb img').src='img/v'+(i+1)+'.jpg';$('#vb img').alt=a.textContent});
document.querySelectorAll('.cg dl[data-lv]').forEach(dl=>{const L=PROGS.filter(p=>p.l===dl.dataset.lv),set=(c,t)=>dl.querySelector(`[data-c=${c}]`).textContent=t,nf=f=>L.filter(p=>p.forms.includes(f)).length;
 const wb=L.filter(p=>p.bud>0),pr=L.map(p=>p.price).filter(x=>x>0);
 set('n',L.length);set('b',`На ${wb.length} из ${L.length} программ, всего ${wb.reduce((s,p)=>s+p.bud,0).toLocaleString('ru-RU')} мест`);
 set('f',[['Очная','очная'],['Очно-заочная','очно-заочная'],['Заочная','заочная']].filter(x=>nf(x[0])).map(x=>`${x[1]} — ${nf(x[0])}`).join(', ').replace(/^./,c=>c.toUpperCase()));
 set('p',pr.length?rub(Math.min(...pr)):'—')});
const nW=f=>PROGS.filter(p=>p.forms.includes(f)).length;if($('#wk'))$('#wk').textContent=`Учишься без отрыва от работы: заочно — ${nW('Заочная')} ${pl(nW('Заочная'))}, очно-заочно — ${nW('Очно-заочная')}`;
document.querySelectorAll('[data-f=w]').forEach(a=>a.addEventListener('click',()=>{S.l='';S.f.clear();S.f.add('Заочная');S.f.add('Очно-заочная');S.pg=1;draw()}));

const RV=[
 ['Магистратура — это возможность расти быстрее и качественнее.','Юлия Толмачева','Программа «Развитие бизнеса: стратегии, проекты, финансы»','Эта программа привлекла меня учебным планом, который сочетает в себе крепкую теоретическую базу и проектное обучение, позволяющее прорабатывать реальные задачи бизнеса. Процесс обучения мне удаётся гармонично сочетать с работой в компании: каждое задание выполняю в плоскости своей сферы деятельности и сразу же применяю полученные результаты на практике. Мне нравится, что для обучения привлекаются практикующие специалисты, которые дают конструктивную обратную связь. Это позволяет чувствовать себя частью рынка, а не смотрящим на него со стороны. Магистратура — это возможность расти быстрее и качественнее. Она развивает меня как личность, учит исследовать огромные массивы данных, находить решение сложных задач и создавать новое.'],
 ['Всё обучение по этой программе исключительно по вечерам, поэтому совмещать с работой — легко.','Владимир Давыдик','Студент «Маркетинг и управление проектом»','При выборе программы я опирался на описание учебного плана и отзывы студентов. Мне очень нравится, я ни разу не пожалел. Несмотря на гуманитарный вектор, обучение очень практико-ориентированное, у нас постоянно проходят: игры, тренинги, полевые исследования и т.п. Изучать новый материал — одно удовольствие. Магистратуру, связанную с маркетингом, я выбирал осознанно, так как в данный момент работаю по профилю и хочу развиваться в этой сфере. Кстати, всё обучение по этой программе исключительно по вечерам, поэтому совмещать с работой — легко.'],
 ['У нас в университете достаточно сильные программы по рекламе и связям с общественностью.','Мария Кремешкова','Студентка направления «PR и реклама в интернет-маркетинге»','У нас в университете достаточно сильные программы по рекламе и связям с общественностью, на выбор было несколько профилей, интернет-маркетинг посчитала наиболее актуальным и интересным для себя. Поступая в магистратуру, у меня не было завышенных ожиданий, так как основную роль играет тут самообразование и твой личный вклад в образовательный процесс. Хотелось бы получать более актуальные и современные знания, но сфера рекламы настолько быстроизменяющаяся, что сфере образования за ней никак не поспеть. В бакалавриата я училась на другой специальности, и желания строить карьеру в той сфере не было. По ходу своей работы мне приходилось сталкиваться со сферой рекламы и маркетинга, поэтому выбор пал на данную специальность.']];

const AV={'Юлия Толмачева':'img/a_tolm.jpg','Владимир Давыдик':'img/a_dav.jpg','Мария Кремешкова':'img/a_krem.jpg'};const ini=n=>`<img src="${AV[n]}" alt="">`;
let ri=0;
function drawRv(){const m=RV[ri],o=[RV[(ri+1)%3],RV[(ri+2)%3]];
 $('#rm').className='rmain';$('#rm').innerHTML=`<div class="qm">«</div><q>${m[0]}</q><div class="fullw"><div><p class="full">${m[3]}</p></div></div><button>Читать полностью</button><div class="who"><span class="av">${ini(m[1])}</span><div><b>${m[1]}</b><span>${m[2]}</span></div></div>`;
 $('#rm button').onclick=e=>{const r=$('#rm');r.classList.toggle('op');e.target.textContent=r.classList.contains('op')?'Свернуть':'Читать полностью'};
 $('#rsd').innerHTML=o.map(r=>`<div class="rs" data-i="${RV.indexOf(r)}"><q>${r[0]}</q><div class="who"><span class="av">${ini(r[1])}</span><div><b>${r[1]}</b><span>${r[2]}</span></div></div></div>`).join('');
 document.querySelectorAll('.rs').forEach(e=>e.onclick=()=>{ri=+e.dataset.i;drawRv()})}
$('#rp').onclick=()=>{ri=(ri+2)%3;drawRv()};$('#rn').onclick=()=>{ri=(ri+1)%3;drawRv()};drawRv();

const FQ=[
 ['Как поступить в магистратуру?',['1. Выбери программу в каталоге.','2. Подай документы: сроки для бюджета и контракта разные.','3. Пройди вступительные испытания, их перечень зависит от направления.']],
 ['Что такое специализированное высшее образование?',['Специализированное высшее образование — это новый уровень подготовки, который в УрФУ появился в рамках федерального пилотного проекта. Он рассчитан на тех, кому после первого диплома нужна углублённая подготовка под конкретную профессиональную задачу: научные исследования, развитие в профессии или управление.','В 2026 году УрФУ впервые одновременно набирает студентов на классическую магистратуру и программы специализированного высшего образования.']],
 ['Чем новая магистратура отличается от обычной?',['Главное отличие — в цели подготовки. Классическая магистратура даёт углублённые знания по направлению, а специализированное высшее строится вокруг конкретной профессиональной задачи и роли выпускника. Поэтому программы могут различаться по содержанию, продолжительности обучения и квалификации, которую получит выпускник.']],
 ['Какие программы специализированного высшего есть в УрФУ?',['В УрФУ предусмотрены три типа программ:','Исследовательские — для тех, кто планирует заниматься научной или аналитической работой. Студенты учатся проводить исследования, формулировать проблемы, проверять гипотезы, анализировать данные и работать над научными проектами.','Профессиональные — для углубления в конкретную отрасль. В центре внимания прикладные задачи, технологии, оборудование, профессиональное программное обеспечение, стажировки и отраслевые проекты.','Управленческие — для специалистов, которые хотят руководить командами и проектами. В программу входят стратегия, лидерство, управление изменениями, ресурсами, сроками и рисками.']],
 ['Кому подойдёт специализированное высшее?',['Тем, кто уже понимает, для какой профессиональной задачи ему нужны дополнительные знания. Например, это может быть специалист, который хочет углубиться в конкретную отрасль, заняться исследованиями или перейти к управлению командами и проектами.']],
 ['Можно ли после специализированного высшего поступить в аспирантуру?',['Да. После окончания любой из программ специализированного высшего образования можно продолжить обучение в аспирантуре.']]];

$('#fq').innerHTML=FQ.map((f,i)=>`<div class="fi${i===0?' op':''}"><button aria-expanded="${i===0}"><span class="n">0${i+1}</span>${f[0]}<span class="pm"></span></button><div class="ans"><div>${f[1].map(t=>`<p>${t}</p>`).join('')}</div></div></div>`).join('');
document.querySelectorAll('.fi button').forEach(b=>b.onclick=()=>{const o=b.parentNode.classList.toggle('op');b.setAttribute('aria-expanded',o)});{const f=document.querySelector('.fi');if(f){f.classList.add('op');f.querySelector('button').setAttribute('aria-expanded',true)}}

/* финал: мягкое свечение и грани */
(function(){const s=document.querySelector('.rays2');if(!s)return;const W=1440,H=640,P=[720,120];
 const E=[[0,0],[360,0],[720,0],[1080,0],[1440,0],[1440,320],[1440,640],[960,640],[480,640],[0,640],[0,320],[0,0]];
 const C=['#2a1478','#30177f','#2a1478','#341a88','#2a1478','#2f1680'];
 let h=`<defs><filter id="fb" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="70"/></filter><radialGradient id="fg"><stop offset="0" stop-color="#FF875C" stop-opacity=".55"/><stop offset=".5" stop-color="#c77ac8" stop-opacity=".2"/><stop offset="1" stop-color="#6B38F2" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="#2a1478"/>`;
 for(let i=0;i<E.length-1;i++)h+=`<polygon points="${P} ${E[i]} ${E[i+1]}" fill="${C[i%C.length]}"/>`;
 h+=`<g filter="url(#fb)"><ellipse cx="${P[0]}" cy="${P[1]+40}" rx="520" ry="260" fill="url(#fg)"/></g>`;s.innerHTML=h})();

/* подсказки — одна плавающая */
(function(){const t=document.createElement('div');t.style.cssText='position:fixed;z-index:50;pointer-events:none;background:#fff;color:#141416;font:400 13px/18px Golos;padding:8px 12px;border-radius:10px;opacity:0;transition:opacity .2s;max-width:320px;box-shadow:0 4px 16px rgba(0,0,0,.2)';document.body.appendChild(t);
 document.addEventListener('pointerover',e=>{const el=e.target.closest('[data-tip]');if(!el||!el.dataset.tip)return;
  t.textContent=el.dataset.tip;const r=el.getBoundingClientRect();t.style.opacity=1;const w=t.offsetWidth;t.style.left=Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2))+'px';t.style.top=(r.bottom+8)+'px'});
 document.addEventListener('pointerout',e=>{if(e.target.closest('[data-tip]'))t.style.opacity=0});addEventListener('scroll',()=>t.style.opacity=0,{passive:true})})();

/* v19. Консультация — модальное окно (прототип: заявка никуда не уходит) */
(()=>{const m=document.getElementById('cons');if(!m)return;const f=m.querySelector('form'),ok=m.querySelector('.cok');let last=null;
const open=e=>{e&&e.preventDefault();last=document.activeElement;f.hidden=false;ok.hidden=true;f.reset();m.hidden=false;requestAnimationFrame(()=>{m.classList.add('on');f.querySelector('input').focus()});document.documentElement.style.overflow='hidden'};
const close=()=>{m.classList.remove('on');document.documentElement.style.overflow='';setTimeout(()=>{m.hidden=true},300);last&&last.focus&&last.focus()};
document.querySelectorAll('[data-cons]').forEach(b=>b.addEventListener('click',open));
m.addEventListener('click',e=>{if(e.target===m||e.target.closest('[data-x]'))close()});
document.addEventListener('keydown',e=>{if(m.hidden)return;if(e.key==='Escape')close();
 if(e.key==='Tab'){const q=[...m.querySelectorAll('button,input,textarea,a[href]')].filter(x=>!x.closest('[hidden]'));const a=q[0],z=q[q.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
f.addEventListener('submit',e=>{e.preventDefault();f.hidden=true;ok.hidden=false;ok.querySelector('button').focus()})})();
