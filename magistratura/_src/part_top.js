/* v11. Лучи первого экрана: до конца «Есть диплом» и дальше под панель «Магистратура или СпВО» (там плавно гаснут). */
(()=>{const t=document.querySelector('.top'),s=t&&t.querySelector('svg.rays'),c=document.querySelector('#compare');if(!s)return;
const fit=()=>{const r=t.getBoundingClientRect(),h=r.height+(c?c.offsetHeight*.85:0);s.style.height=h+'px';
  s.setAttribute('viewBox','0 0 1440 '+Math.round(h*1440/r.width));s.setAttribute('preserveAspectRatio','xMinYMin slice');
  const f=Math.round(r.height/h*100);s.style.webkitMaskImage=s.style.maskImage=`linear-gradient(#000 ${f}%,transparent 100%)`};
fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(t)})();

/* Финал: лучи из видимой точки под кнопками, от края FAQ до низа подвала — без обрезки. */
(()=>{const f=document.querySelector('#apply'),s=f&&f.querySelector('svg.rays3'),ft=document.querySelector('.ft'),a=f&&f.querySelector('.acts');if(!s)return;
const g=document.createElementNS('http://www.w3.org/2000/svg','g');[...s.querySelectorAll(':scope>path')].forEach(p=>g.appendChild(p));s.appendChild(g);
const UP=200;const fit=()=>{const fr=f.getBoundingClientRect(),w=fr.width,k=1440/w;const bot=ft?ft.getBoundingClientRect().bottom:fr.bottom;const h=bot-fr.top+UP;
  s.style.top=-UP+'px';s.style.height=h+'px';s.style.bottom='auto';s.setAttribute('viewBox','0 0 1440 '+Math.round(h*k));s.setAttribute('preserveAspectRatio','xMidYMin slice');
  /* v18: лучи финала развёрнуты на 180° — узкие яркие грани уходят вверх за заголовок, подвал лежит на широких спокойных */const py=(a.getBoundingClientRect().top-fr.top+UP-20)*k;g.setAttribute('transform',`translate(1010 ${py.toFixed(1)}) rotate(180) translate(-495 -408)`);const u=(UP/h*100).toFixed(1);s.style.webkitMaskImage=s.style.maskImage=`linear-gradient(transparent 0,#000 ${u}%)`};
fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(f);if(ft)new ResizeObserver(fit).observe(ft)})();

/* v15. Переливы цвета по граням — три варианта, ?rays=a|b|old (по умолчанию a).
   old — как v13–v14: грань целиком уходит в тёплый или холодный оттенок по углу курсора, lerp .035.
   a   — тот же приём, исправлен: быстрее (lerp .1), у самой точки лучей затихает (иначе 20 px движения перекрашивали весь экран),
         холодный слой — лаванда из палитры вместо бирюзы, сила меньше.
   b   — свет идёт полосой поперёк грани там, где курсор (по углу и по расстоянию от точки), остальной экран спокоен. */
let raysAC=null;function raysInit(MODE){if(raysAC)raysAC.abort();raysAC=new AbortController();const SIG={signal:raysAC.signal,passive:true};document.querySelectorAll('.rx15').forEach(n=>n.remove());
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const P={x:495,y:408},L=1500;
const CFG={old:{warm:['#FF875C','#ff8fb3'],cool:['#55E0EC','#8f8cf0'],kw:1,kc:1,k:.035,pw:1.6},
           a:{warm:['#FF875C','#ff8fb3'],cool:['#8f8cf0','#6E6DC5'],kw:.8,kc:.55,k:.1,pw:1.6},
           b:{warm:['#FFB08F','#FF875C'],cool:null,kw:1,kc:0,k:.14,pw:3}}[MODE]||null;if(!CFG)return;
document.querySelectorAll('svg.rays,svg.rays3').forEach((s,si)=>{const paths=[...s.querySelectorAll('path:not(.rx15)')];if(!paths.length)return;const host=paths[0].parentNode;const defs=s.querySelector('defs');
  const F=paths.map((p,i)=>{const m=p.getAttribute('d').match(/-?[\d.]+/g).map(Number);const a=Math.atan2(m[5]-m[1],m[4]-m[0]);
    const x2=(P.x+Math.cos(a)*L).toFixed(1),y2=(P.y+Math.sin(a)*L).toFixed(1);
    const g=(id,c)=>MODE==='b'
      ?`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${P.x}" y1="${P.y}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${c[1]}" stop-opacity="0"/><stop offset=".5" stop-color="${c[0]}" stop-opacity=".95"/><stop offset="1" stop-color="${c[1]}" stop-opacity="0"/></linearGradient>`
      :`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${P.x}" y1="${P.y}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${c[0]}" stop-opacity=".9"/><stop offset=".45" stop-color="${c[1]}" stop-opacity=".55"/><stop offset="1" stop-color="${c[1]}" stop-opacity="0"/></linearGradient>`;
    defs.insertAdjacentHTML('beforeend',(g(`pw${si}_${i}`,CFG.warm)+(CFG.cool?g(`pc${si}_${i}`,CFG.cool):'')).replace(/<linearGradient /g,'<linearGradient class="rx15" '));
    const mk=id=>{const n=p.cloneNode();n.setAttribute('class','rx15');n.setAttribute('fill',`url(#${id})`);n.setAttribute('opacity',0);n.style.mixBlendMode='soft-light';return n};
    return {a,w:mk(`pw${si}_${i}`),c:CFG.cool?mk(`pc${si}_${i}`):null,gw:null,v:0,t:0,r:300,rt:300,id:`pw${si}_${i}`}});
  const last=paths[paths.length-1];F.slice().reverse().forEach(f=>{if(f.c)last.after(f.c);last.after(f.w)});
  F.forEach(f=>f.gw=defs.querySelector('#'+f.id));
  const BAND=380;
  let raf=0;const tick=()=>{raf=0;let more=false;
    F.forEach(f=>{f.v+=(f.t-f.v)*CFG.k;if(Math.abs(f.t-f.v)>.002)more=true;
      f.w.setAttribute('opacity',(Math.max(0,f.v)*CFG.kw).toFixed(3));if(f.c)f.c.setAttribute('opacity',(Math.max(0,-f.v)*CFG.kc).toFixed(3));
      if(MODE==='b'){f.r+=(f.rt-f.r)*CFG.k;if(Math.abs(f.rt-f.r)>.5)more=true;const r0=f.r-BAND,r1=f.r+BAND,cx=Math.cos(f.a),cy=Math.sin(f.a);
        f.gw.setAttribute('x1',(P.x+cx*r0).toFixed(1));f.gw.setAttribute('y1',(P.y+cy*r0).toFixed(1));f.gw.setAttribute('x2',(P.x+cx*r1).toFixed(1));f.gw.setAttribute('y2',(P.y+cy*r1).toFixed(1))}});
    if(more)raf=requestAnimationFrame(tick)};
  const go=()=>{if(!raf)raf=requestAnimationFrame(tick)};
  const sm=(x,a,b)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
  addEventListener('pointermove',e=>{const r=s.getBoundingClientRect();if(e.clientY<r.top-80||e.clientY>r.bottom+80){F.forEach(f=>f.t=0);go();return}
    const m=host.getScreenCTM();if(!m)return;const q=new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse());const dx=q.x-P.x,dy=q.y-P.y,ca=Math.atan2(dy,dx),d=Math.hypot(dx,dy);
    const near=MODE==='old'?1:sm(d,40,340);
    F.forEach(f=>{const c=Math.cos(ca-f.a);if(MODE==='b'){f.t=c>0?Math.pow(c,CFG.pw)*near:0;f.rt=d*Math.max(.25,c)}else f.t=(c>0?Math.pow(c,CFG.pw):-Math.pow(-c,CFG.pw))*near});go()},SIG);
  document.addEventListener('pointerleave',()=>{F.forEach(f=>f.t=0);go()},SIG);
})}
const RAYS0=(new URLSearchParams(location.search).get('rays')||'b').toLowerCase();raysInit(RAYS0);
/* переключатель вариантов — только в сборке для просмотра (build.py --pick) */
if(window.RAYS_PICK){const w=document.createElement('div');w.style.cssText='position:fixed;left:16px;bottom:16px;z-index:999;display:flex;gap:4px;align-items:center;padding:6px 8px;border-radius:10px;background:rgba(20,16,50,.86);color:#fff;font:500 13px/20px Golos,sans-serif';
 w.innerHTML='<span style="opacity:.7;margin-right:6px">Лучи</span>'+[['a','A · исправленный'],['b','B · полоса'],['old','v14']].map(([k,t])=>`<button data-k="${k}" style="all:unset;cursor:pointer;padding:4px 10px;border-radius:7px">${t}</button>`).join('');
 const mark=k=>w.querySelectorAll('button').forEach(x=>x.style.background=x.dataset.k===k?'#FF875C':'transparent');
 w.querySelectorAll('button').forEach(x=>x.onclick=()=>{raysInit(x.dataset.k);mark(x.dataset.k)});mark(RAYS0);document.body.appendChild(w)}

/* наведение на программы — как в каталоге: заливка кругом от точки входа курсора, уходит к точке выхода */
(()=>{const S='.pl .t51 tbody tr,.pl .rw';const set=(el,e,cl)=>{const r=el.getBoundingClientRect();let x=e.clientX-r.left,y=e.clientY-r.top;if(cl){x=Math.min(Math.max(x,0),r.width);y=Math.min(Math.max(y,0),r.height)}
  el.style.setProperty('--mx',x+'px');el.style.setProperty('--my',y+'px');el.style.setProperty('--rw',Math.hypot(r.width,r.height)*1.05+'px')};
document.addEventListener('pointerover',e=>{const el=e.target.closest&&e.target.closest(S);if(!el||el.contains(e.relatedTarget))return;set(el,e)},true);
document.addEventListener('pointerout',e=>{const el=e.target.closest&&e.target.closest(S);if(!el||el.contains(e.relatedTarget))return;set(el,e,1)},true)})();

/* «Есть диплом»: фото от своего верха до низа подписей треков */
(()=>{const ph=document.querySelector('.dipA .ph'),im=ph&&ph.querySelector('img'),tk=document.querySelector('.dipA .tks');if(!im||!tk)return;
const fit=()=>{const ps=[...tk.querySelectorAll('p')];if(!ps.length)return;const b=Math.max(...ps.map(p=>p.getBoundingClientRect().bottom));const h=b-ph.getBoundingClientRect().top;if(h>120)im.style.height=Math.round(h)+'px'};
fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(tk);document.fonts&&document.fonts.ready.then(fit)})();
