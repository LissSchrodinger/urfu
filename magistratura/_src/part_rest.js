
/* ===== данные: masters.urfu.ru/programs/list, 16.11.2026 ===== */
const PROGS=%PROGS%;
const AREAS=[['Инженерные науки',['07','08','12','13','14','15','18','19','20','22','23','27','28','29']],['Информационные технологии',['02','09','10','11']],['Естественные науки и математика',['01','03','04','05','06','21']],['Социогуманитарные науки и технологии',['37','39','40','41','42','43','44','45','46','47','49','50','51','54','58']],['Экономика и управление',['38']],['Юриспруденция',['40']]];
PROGS.forEach(p=>{p.bud=p.F.reduce((s,f)=>s+f.b,0);p.paid=p.F.reduce((s,f)=>s+f.k,0);const pr=p.F.map(f=>f.p).filter(x=>x>0);p.price=pr.length?Math.min(...pr):0;p.forms=p.F.map(f=>f.f);p.pre=p.c.slice(0,2)});
const LV={'М':'Магистратура','СВ':'Специализированное высшее'};
const S={l:'',a:-1,q:'',i:'',f:'',b:false,v:'table',n:9};
const $=s=>document.querySelector(s);
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const hl=t=>{if(!S.q)return esc(t);const i=t.toLowerCase().indexOf(S.q.toLowerCase());return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+S.q.length))+'</mark>'+esc(t.slice(i+S.q.length))};
const rub=n=>n?'от '+n.toLocaleString('ru-RU').replace(/,/g,' ')+' ₽':'—';
function pass(p,skip){return (skip==='l'||!S.l||p.l===S.l)&&(skip==='a'||S.a<0||AREAS[S.a][1].includes(p.pre))&&(!S.i||p.i===S.i)&&(!S.f||p.forms.includes(S.f))&&(!S.b||p.bud>0)&&
 (!S.q||(p.n+' '+p.c+' '+p.d).toLowerCase().includes(S.q.toLowerCase()))}
const fi=$('#fi');[...new Map(PROGS.map(p=>[p.i,p.I]))].sort((x,y)=>x[0].localeCompare(y[0])).forEach(([k,v])=>fi.insertAdjacentHTML('beforeend',`<option value="${k}">${esc(v)}</option>`));
$('#ar').innerHTML=`<button data-a="-1" class="on">Все области</button>`+AREAS.map((a,i)=>`<button data-a="${i}">${a[0]}</button>`).join('');
const go=p=>window.open('https://masters.urfu.ru/programs/'+p.id,'_blank','noopener');
const ty=p=>`<span class="sl ${p.l==='СВ'?'v':''}" style="height:14px;margin-right:10px"></span>${LV[p.l]}`;
const GO='<span class="go"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
const facts=p=>`<dl class="fx"><div><dt>Бюджет</dt><dd>${p.bud||'—'}</dd></div><div><dt>Контракт</dt><dd>${p.paid||'—'}</dd></div><div><dt>Стоимость в год</dt><dd style="font-size:15px;line-height:20px;margin-top:6px">${rub(p.price)}</dd></div>${S.v==='rows'?GO:''}</dl>`;
function draw(){
 const all=PROGS.filter(p=>pass(p));
 document.querySelectorAll('#lvl button').forEach(b=>{b.classList.toggle('on',b.dataset.l===S.l);b.querySelector('i').textContent=PROGS.filter(p=>pass(p,'l')&&(!b.dataset.l||p.l===b.dataset.l)).length});
 document.querySelectorAll('#ar button').forEach(b=>b.classList.toggle('on',+b.dataset.a===S.a));
 const rows=all.slice(0,S.n);
 $('#cnt').textContent=all.length?`${all.length} ${pl(all.length)}`:'';
 const ls=$('#ls');
 if(!all.length){ls.className='';ls.innerHTML='<div class="empty">Ничего не нашлось. Попробуй изменить фильтры.</div>'}
 else if(S.v==='table'){ls.className='tb';ls.innerHTML=`<table><colgroup><col><col style="width:270px"><col style="width:96px"><col style="width:96px"><col style="width:150px"><col style="width:64px"></colgroup><thead><tr><th>Программа</th><th>Тип</th><th>Бюджет</th><th>Контракт</th><th>Стоимость в год</th><th></th></tr></thead><tbody>${rows.map((p,k)=>`<tr data-k="${k}"><td><span class="nm">${hl(p.n)}</span><span class="cd"><span data-tip="${esc(p.d)}">${hl(p.c)}</span> · ${p.forms.join(', ')||'—'} · <span data-tip="${esc(p.I)}">${p.i}</span></span></td><td>${ty(p)}</td><td class="big">${p.bud||'—'}</td><td class="big">${p.paid||'—'}</td><td>${rub(p.price)}</td><td>${GO}</td></tr>`).join('')}</tbody></table>`}
 else{ls.className='ls '+(S.v==='cards'?'cards':'');ls.innerHTML=rows.map((p,k)=>`<article class="rw" data-k="${k}" tabindex="0"><div><div class="cd">${hl(p.c)} ${hl(p.d)} · ${p.forms.join(', ')} · <span data-tip="${esc(p.I)}">${p.i}</span></div><div class="nm">${hl(p.n)}</div><div class="ty">${ty(p)}</div></div>${facts(p)}</article>`).join('')}
 ls.querySelectorAll('[data-k]').forEach(e=>e.onclick=()=>go(rows[+e.dataset.k]));
 const rest=all.length-rows.length;
 $('#more').innerHTML=rest>0?`<button class="btn wl" id="mb">Показать ещё ${Math.min(9,rest)}</button>`:'';
 if(rest>0)$('#mb').onclick=()=>{S.n+=9;draw()};
}
function pl(n){const a=n%10,b=n%100;return a===1&&b!==11?'программа':a>=2&&a<=4&&(b<12||b>14)?'программы':'программ'}
document.querySelectorAll('#lvl button').forEach(b=>b.onclick=()=>{S.l=b.dataset.l;S.n=9;draw()});
document.querySelectorAll('#ar button').forEach(b=>b.onclick=()=>{S.a=+b.dataset.a;S.n=9;draw()});
const hq=$('#hq');if(hq){hq.closest('form').onsubmit=e=>{e.preventDefault();S.q=hq.value.trim();$('#q').value=S.q;S.n=9;draw();$('#programs').scrollIntoView({behavior:'smooth'})}}
document.querySelectorAll('[data-hq]').forEach(b=>b.onclick=()=>{S.a=+b.dataset.hq;S.n=9;draw();$('#programs').scrollIntoView({behavior:'smooth'})});
document.querySelectorAll('[data-to]').forEach(a=>a.addEventListener('click',()=>{S.l=a.dataset.to;S.n=9;draw()}));
$('#q').oninput=e=>{S.q=e.target.value.trim();S.n=9;draw()};
fi.onchange=e=>{S.i=e.target.value;S.n=9;draw()};
$('#ff').onchange=e=>{S.f=e.target.value;S.n=9;draw()};
const fb=$('#fb');const tb=()=>{S.b=!S.b;fb.classList.toggle('on',S.b);fb.setAttribute('aria-checked',S.b);S.n=9;draw()};fb.onclick=tb;fb.onkeydown=e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();tb()}};
document.querySelectorAll('#vw button').forEach(b=>b.onclick=()=>{S.v=b.dataset.v;document.querySelectorAll('#vw button').forEach(x=>x.classList.toggle('on',x===b));draw()});
draw();

document.querySelectorAll('#fin button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#fin button').forEach(x=>x.classList.toggle('on',x===b))});
document.querySelectorAll('#vl a').forEach((a,i)=>a.onclick=()=>{document.querySelectorAll('#vl a').forEach(x=>x.classList.toggle('on',x===a));$('#vb img').src='img/v'+(i+1)+'.jpg';$('#vb img').alt=a.textContent});
$('#nM').textContent=PROGS.filter(p=>p.l==='М').length;$('#nS').textContent=PROGS.filter(p=>p.l==='СВ').length;
const nW=f=>PROGS.filter(p=>p.forms.includes(f)).length;$('#wk').textContent=`Учишься без отрыва от работы: заочно — ${nW('Заочная')} программы, очно-заочно — ${nW('Очно-заочная')}`;
document.querySelectorAll('[data-f=w]').forEach(a=>a.addEventListener('click',()=>{S.f='Заочная';$('#ff').value='Заочная';S.n=9;draw()}));

const RV=[
 ['Магистратура — это возможность расти быстрее и качественнее.','Юлия Толмачева','Программа «Развитие бизнеса: стратегии, проекты, финансы»','Эта программа привлекла меня учебным планом, который сочетает в себе крепкую теоретическую базу и проектное обучение, позволяющее прорабатывать реальные задачи бизнеса. Процесс обучения мне удается гармонично сочетать с работой в компании: каждое задание выполняю в плоскости своей сферы деятельности и сразу же применяю полученные результаты на практике. Мне нравится, что для обучения привлекаются практикующие специалисты, которые дают конструктивную обратную связь. Это позволяет чувствовать себя частью рынка, а не смотрящим на него со стороны. Магистратура — это возможность расти быстрее и качественнее. Она развивает меня как личность, учит исследовать огромные массивы данных, находить решение сложных задач и создавать новое.'],
 ['Все обучение по этой программе исключительно по вечерам, поэтому совмещать с работой — легко.','Владимир Давыдик','Студент «Маркетинг и управление проектом»','При выборе программы я опирался на описание учебного плана и отзывы студентов. Мне очень нравится, я ни разу не пожалел. Несмотря на гуманитарный вектор, обучение очень практико-ориентированное, у нас постоянно проходят: игры, тренинги, полевые исследования и т.п. Изучать новый материал — одно удовольствие. Магистратуру, связанную с маркетингом, я выбирал осознано, так как в данный момент работаю по профилю и хочу развиваться в этой сфере. Кстати, все обучение по этой программе исключительно по вечерам, поэтому совмещать с работой — легко.'],
 ['У нас в университете достаточно сильные программы по рекламе и связям с общественностью.','Мария Кремешкова','Студентка направления «PR и реклама в интернет-маркетинге»','У нас в университете достаточно сильные программы по рекламе и связям с общественностью, на выбор было несколько профилей, интернет-маркетинг посчитала наиболее актуальным и интересным для себя. Поступая в магистратуру, у меня не было завышенных ожиданий, так как основную роль играет тут самообразование и твой личный вклад в образовательный процесс. Хотелось бы получать более актуальные и современные знания, но сфера рекламы настолько быстроизменяющаяся, что сфере образования за ней никак не поспеть. В бакалавриата я училась на другой специальности, и желания строить карьеру в той сфере не было. По ходу своей работы мне приходилось сталкиваться со сферой рекламы и маркетинга, поэтому выбор пал на данную специальность.']];

const AV={'Юлия Толмачева':'img/a_tolm.jpg','Владимир Давыдик':'img/a_dav.jpg','Мария Кремешкова':'img/a_krem.jpg'};const ini=n=>`<img src="${AV[n]}" alt="">`;
let ri=0;
function drawRv(){const m=RV[ri],o=[RV[(ri+1)%3],RV[(ri+2)%3]];
 $('#rm').className='rmain';$('#rm').innerHTML=`<div class="qm">«</div><q>${m[0]}</q><p class="full">${m[3]}</p><button>Читать полностью</button><div class="who"><span class="av">${ini(m[1])}</span><div><b>${m[1]}</b><span>${m[2]}</span></div></div>`;
 $('#rm button').onclick=e=>{const r=$('#rm');r.classList.toggle('op');e.target.textContent=r.classList.contains('op')?'Свернуть':'Читать полностью'};
 $('#rsd').innerHTML=o.map(r=>`<div class="rs" data-i="${RV.indexOf(r)}"><q>${r[0]}</q><div class="who"><span class="av">${ini(r[1])}</span><div><b>${r[1]}</b><span>${r[2]}</span></div></div></div>`).join('');
 document.querySelectorAll('.rs').forEach(e=>e.onclick=()=>{ri=+e.dataset.i;drawRv()})}
$('#rp').onclick=()=>{ri=(ri+2)%3;drawRv()};$('#rn').onclick=()=>{ri=(ri+1)%3;drawRv()};drawRv();

const FQ=[
 ['Как поступить в магистратуру?',['Поступление в магистратуру происходит в несколько этапов:','1. Выбор направления магистратуры из каталога образовательных программ. При выборе направления для обучения в магистратуре следует учитывать свои интересы, цели и планы на будущее. Важно изучить программы различных институтов УрФУ, ознакомиться с требованиями к поступающим и задать все интересующие вопросы.','2. Подай документы. Обрати внимание, что для бюджетной и контрактной формы обучения сроки подачи документов для поступления в магистратуру отличаются.','3. Вступительные испытания. Для поступления в магистратуру нужно пройти вступительные испытания, перечень испытаний зависит от направления обучения.']],
 ['Что такое специализированное высшее образование?',['Специализированное высшее образование — это новый уровень подготовки, который в УрФУ появился в рамках федерального пилотного проекта. Он рассчитан на тех, кому после первого диплома нужна углубленная подготовка под конкретную профессиональную задачу: научные исследования, развитие в профессии или управление.','В 2026 году УрФУ впервые одновременно набирает студентов на классическую магистратуру и программы специализированного высшего образования.']],
 ['Чем новая магистратура отличается от обычной?',['Главное отличие — в цели подготовки. Классическая магистратура дает углубленные знания по направлению, а специализированное высшее строится вокруг конкретной профессиональной задачи и роли выпускника. Поэтому программы могут различаться по содержанию, продолжительности обучения и квалификации, которую получит выпускник.']],
 ['Какие программы специализированного высшего есть в УрФУ?',['В УрФУ предусмотрены три типа программ:','Исследовательские — для тех, кто планирует заниматься научной или аналитической работой. Студенты учатся проводить исследования, формулировать проблемы, проверять гипотезы, анализировать данные и работать над научными проектами.','Профессиональные — для углубления в конкретную отрасль. В центре внимания прикладные задачи, технологии, оборудование, профессиональное программное обеспечение, стажировки и отраслевые проекты.','Управленческие — для специалистов, которые хотят руководить командами и проектами. В программу входят стратегия, лидерство, управление изменениями, ресурсами, сроками и рисками.']],
 ['Кому подойдет специализированное высшее?',['Тем, кто уже понимает, для какой профессиональной задачи ему нужны дополнительные знания. Например, это может быть специалист, который хочет углубиться в конкретную отрасль, заняться исследованиями или перейти к управлению командами и проектами.']],
 ['Можно ли после специализированного высшего поступить в аспирантуру?',['Да. После окончания любой из программ специализированного высшего образования можно продолжить обучение в аспирантуре.']]];

$('#fq').innerHTML=FQ.map((f,i)=>`<div class="fi${i===1?' op':''}"><button aria-expanded="${i===1}"><span class="n">0${i+1}</span>${f[0]}<span class="pm"></span></button><div class="ans"><div>${f[1].map(t=>`<p>${t}</p>`).join('')}</div></div></div>`).join('');
document.querySelectorAll('.fi button').forEach(b=>b.onclick=()=>{const o=b.parentNode.classList.toggle('op');b.setAttribute('aria-expanded',o)});

/* финал: мягкое свечение и грани */
(function(){const s=document.querySelector('.rays2'),W=1440,H=640,P=[720,120];
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
