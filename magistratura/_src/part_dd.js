/* v11: свои выпадающие списки с чекбоксами (множественный выбор) поверх select.
   Первый option — подпись «Все …». Выбранные значения — Set в sel._v; при изменении — событие change у select. */
(()=>{const CH='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5l3 3 3-3"/></svg>';
const OK='<svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2.5 6.2 2.3 2.3 4.7-5"/></svg>';
const all=[];let open=null;
function close(){if(!open)return;open.w.classList.remove('on');open.b.setAttribute('aria-expanded','false');open=null}
document.querySelectorAll('.sel select').forEach(sel=>{const w=sel.parentNode;w.classList.add('dd');sel._v=new Set();
  const nm=sel.getAttribute('aria-label')||'';
  const b=document.createElement('button');b.type='button';b.className='ddb';b.setAttribute('aria-haspopup','listbox');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label',nm);
  const p=document.createElement('div');p.className='ddp';p.setAttribute('role','listbox');p.setAttribute('aria-multiselectable','true');w.append(b,p);
  const o={sel,w,b,p};all.push(o);sel._dd=o;
  const opts=()=>[...sel.options].slice(1);
  const label=()=>{const v=sel._v;if(!v.size)return sel.options[0]?sel.options[0].text:nm;if(v.size===1){const x=opts().find(x=>v.has(x.value));return x?x.text:nm}return nm+' · '+v.size};
  const fill=()=>{b.innerHTML='<span>'+label()+'</span>'+CH;b.classList.toggle('set',sel._v.size>0);
    p.innerHTML=opts().map(x=>{const on=sel._v.has(x.value);return `<button type="button" role="option" data-v="${x.value.replace(/"/g,'&quot;')}" aria-selected="${on}"><i class="cbx">${on?OK:''}</i><span>${x.text}</span></button>`}).join('')
      +(sel._v.size?'<button type="button" class="ddr" data-clr>Сбросить</button>':'')};
  o.fill=fill;fill();
  o.open=()=>{close();fill();w.classList.add('on');b.setAttribute('aria-expanded','true');open=o};
  b.onclick=e=>{e.stopPropagation();const was=open===o;close();if(!was)o.open()};
  p.onclick=e=>{e.stopPropagation();if(e.target.closest('[data-clr]')){sel._v.clear()}else{const it=e.target.closest('[data-v]');if(!it)return;const v=it.dataset.v;sel._v.has(v)?sel._v.delete(v):sel._v.add(v)}
    sel.dispatchEvent(new Event('change'));fill()};
});
document.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
window.ddSync=()=>all.forEach(o=>{if(o!==open)o.fill();else{const st=o.p.scrollTop;o.fill();o.p.scrollTop=st}});})();
