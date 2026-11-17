/* 17.11 адаптив v2: бургер в шапке; на узком экране список программ — только карточки */
(()=>{const ah=document.getElementById('ah'),b=document.getElementById('ahb');
if(ah&&b){const set=o=>{ah.classList.toggle('open',o);b.setAttribute('aria-expanded',o)};
 b.onclick=()=>set(!ah.classList.contains('open'));
 ah.querySelectorAll('.anv a').forEach(a=>a.addEventListener('click',()=>set(false)));
 addEventListener('keydown',e=>{if(e.key==='Escape')set(false)})}
const mq=matchMedia('(max-width:820px)');let keep=null;
const ap=()=>{if(typeof S==='undefined'||typeof draw!=='function')return;
 if(mq.matches){if(S.v!=='cards'){keep=S.v;S.v='cards';draw()}}
 else if(keep){S.v=keep;keep=null;draw()}};
mq.addEventListener('change',ap);ap()})();
/* телефон: уровень — выпадающим списком вместо сегмента; один уровень за раз, синхронно с сегментом #lvl */
(()=>{const sel=document.getElementById('flv');if(!sel||typeof S==='undefined'||typeof draw!=='function')return;
sel.addEventListener('change',()=>{const v=sel._v,n=[...v].find(x=>x!==S.l);S.l=v.size?(n||[...v][0]):'';S.pg=1;draw()});
const d0=draw;draw=function(){sel._v=new Set(S.l?[S.l]:[]);return d0.apply(this,arguments)};draw()})();
/* телефон ≤560: фильтры в шторке, поиск остаётся на виду; рядом кнопка «Фильтры» со счётчиком выбранного */
(()=>{const fl=document.querySelector('#programs .fl'),srch=fl&&fl.querySelector('.srch');if(!fl||!srch||typeof S==='undefined')return;
const items=[...fl.children].filter(e=>e!==srch);
const FI='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>';
const X='<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12"/></svg>';
const fbn=document.createElement('button');fbn.type='button';fbn.className='fbn';fbn.setAttribute('aria-haspopup','dialog');fbn.innerHTML=FI+'<span>Фильтры</span><b hidden></b>';fl.append(fbn);
const sh=document.createElement('div');sh.className='fsh';sh.innerHTML=`<div class="fsh-o" data-x></div><div class="fsh-p" role="dialog" aria-modal="true" aria-label="Фильтры"><div class="fsh-h"><span>Фильтры</span><button type="button" class="fsh-x" data-x aria-label="Закрыть">${X}</button></div><div class="fsh-b"></div><div class="fsh-f"><button type="button" class="fsh-r">Сбросить</button><button type="button" class="fsh-go" data-x></button></div></div>`;
document.body.append(sh);const body=sh.querySelector('.fsh-b'),go=sh.querySelector('.fsh-go'),rs=sh.querySelector('.fsh-r');
const n=()=>(S.l?1:0)+S.a.size+S.i.size+S.f.size+(S.b?1:0);
const upd=()=>{const k=n(),b=fbn.querySelector('b');b.hidden=!k;b.textContent=k;rs.disabled=!k;const c=parseInt(document.getElementById('cnt').textContent)||0,a=c%10,h=c%100;go.textContent=c?'Показать '+c+' '+(a===1&&h!==11?'программу':a>=2&&a<=4&&(h<12||h>14)?'программы':'программ'):'Ничего не нашлось'};
const op=o=>{sh.classList.toggle('on',o);document.documentElement.classList.toggle('fsh-lock',o);if(o){upd();setTimeout(()=>sh.querySelector('.fsh-x').focus(),50)}else fbn.focus({preventScroll:true})};
fbn.onclick=()=>op(true);sh.addEventListener('click',e=>{if(e.target.closest('[data-x]'))op(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&sh.classList.contains('on'))op(false)});
rs.onclick=()=>{S.l='';S.a.clear();S.i.clear();S.f.clear();if(S.b){S.b=false;const fb=document.getElementById('fb');fb.classList.remove('on');fb.setAttribute('aria-checked',false)}S.pg=1;draw()};
const d0=draw;draw=function(){const r=d0.apply(this,arguments);upd();return r};
const mq=matchMedia('(max-width:560px)');
const ap=()=>{if(mq.matches)items.forEach(e=>body.append(e));else{items.forEach(e=>fl.insertBefore(e,srch));op(false)}};
mq.addEventListener('change',ap);ap();upd()})();
/* уровень в списке — один за раз: после выбора список закрывается */
(()=>{const sel=document.getElementById('flv');if(sel)sel.addEventListener('change',()=>setTimeout(()=>document.dispatchEvent(new Event('click')),0))})();
/* сравнение: тире не уходит в начало строки */
document.querySelectorAll('#compare dd').forEach(d=>{const w=document.createTreeWalker(d,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())n.nodeValue=n.nodeValue.replace(/ (—|–) /g,'\u00a0$1\u00a0')});
