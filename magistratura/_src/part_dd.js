/* свои выпадающие списки поверх нативных select (значение и change остаются у select) */
(()=>{const CH='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5l3 3 3-3"/></svg>';
const OK='<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7.2l2.6 2.6L11 4.4"/></svg>';
const all=[];let open=null;
function close(){if(!open)return;open.w.classList.remove('on');open.b.setAttribute('aria-expanded','false');open=null}
document.querySelectorAll('.sel select').forEach(sel=>{const w=sel.parentNode;w.classList.add('dd');
  const b=document.createElement('button');b.type='button';b.className='ddb';b.setAttribute('aria-haspopup','listbox');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label',sel.getAttribute('aria-label')||'');
  const p=document.createElement('div');p.className='ddp';p.setAttribute('role','listbox');w.append(b,p);
  const o={sel,w,b,p};all.push(o);
  const fill=()=>{const so=sel.selectedOptions[0]||sel.options[0];b.innerHTML='<span>'+(so?so.text:'')+'</span>'+CH;b.classList.toggle('set',sel.selectedIndex>0);
    p.innerHTML=[...sel.options].map((x,i)=>`<button type="button" role="option" data-i="${i}" aria-selected="${i===sel.selectedIndex}">${x.text}${i===sel.selectedIndex?OK:''}</button>`).join('')};
  o.fill=fill;fill();
  b.onclick=e=>{e.stopPropagation();const was=open===o;close();if(!was){fill();w.classList.add('on');b.setAttribute('aria-expanded','true');open=o;const c=p.querySelector('[aria-selected=true]');c&&c.scrollIntoView({block:'nearest'})}};
  p.onclick=e=>{const it=e.target.closest('[data-i]');if(!it)return;e.stopPropagation();sel.selectedIndex=+it.dataset.i;sel.dispatchEvent(new Event('change'));close();fill();b.focus()};
});
document.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
window.ddSync=()=>all.forEach(o=>o.fill());})();
