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
  const py=(a.getBoundingClientRect().bottom-fr.top+UP+84)*k;g.setAttribute('transform',`translate(${720-495} ${(py-408).toFixed(1)})`);const u=(UP/h*100).toFixed(1);s.style.webkitMaskImage=s.style.maskImage=`linear-gradient(transparent 0,#000 ${u}%)`};
fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(f);if(ft)new ResizeObserver(fit).observe(ft)})();

/* v13. Переливы цвета по граням: грани стоят на месте, без пятна за курсором.
   У каждой грани два цветовых слоя вдоль неё (от точки к краю): тёплый (коралл → розовый) и холодный (бирюза → лаванда).
   Грани в сторону курсора плавно уходят в тёплый оттенок, противоположные — в холодный; соседние смешиваются — цвет перетекает. */
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const NS='http://www.w3.org/2000/svg';const P={x:495,y:408},L=1500;
const WARM=['#FF875C','#ff8fb3'],COOL=['#55E0EC','#8f8cf0'],KW=.34,KC=.26;
document.querySelectorAll('svg.rays,svg.rays3').forEach((s,si)=>{const paths=[...s.querySelectorAll('path')];if(!paths.length)return;const host=paths[0].parentNode;const defs=s.querySelector('defs');
  const F=paths.map((p,i)=>{const m=p.getAttribute('d').match(/-?[\d.]+/g).map(Number);const a=Math.atan2(m[5]-m[1],m[4]-m[0]);
    const x2=(P.x+Math.cos(a)*L).toFixed(1),y2=(P.y+Math.sin(a)*L).toFixed(1);
    const g=(id,c)=>`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${P.x}" y1="${P.y}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${c[0]}" stop-opacity=".9"/><stop offset=".45" stop-color="${c[1]}" stop-opacity=".55"/><stop offset="1" stop-color="${c[1]}" stop-opacity="0"/></linearGradient>`;
    defs.insertAdjacentHTML('beforeend',g(`pw${si}_${i}`,WARM)+g(`pc${si}_${i}`,COOL));
    const w=p.cloneNode();w.setAttribute('fill',`url(#pw${si}_${i})`);w.setAttribute('opacity',0);w.style.mixBlendMode='soft-light';
    const c=p.cloneNode();c.setAttribute('fill',`url(#pc${si}_${i})`);c.setAttribute('opacity',0);c.style.mixBlendMode='soft-light';
    return {a,w,c,v:0,t:0}});
  const last=paths[paths.length-1];F.slice().reverse().forEach(f=>{last.after(f.c);last.after(f.w)});
  let raf=0;const tick=()=>{raf=0;let more=false;
    F.forEach(f=>{f.v+=(f.t-f.v)*.035;if(Math.abs(f.t-f.v)>.002)more=true;f.w.setAttribute('opacity',(Math.max(0,f.v)*KW/.34).toFixed(3));f.c.setAttribute('opacity',(Math.max(0,-f.v)*KC/.26).toFixed(3))});
    if(more)raf=requestAnimationFrame(tick)};
  const go=()=>{if(!raf)raf=requestAnimationFrame(tick)};
  addEventListener('pointermove',e=>{const r=s.getBoundingClientRect();if(e.clientY<r.top-80||e.clientY>r.bottom+80){F.forEach(f=>f.t=0);go();return}
    const m=host.getScreenCTM();if(!m)return;const q=new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse());const ca=Math.atan2(q.y-P.y,q.x-P.x);
    F.forEach(f=>{const c=Math.cos(ca-f.a);f.t=c>0?Math.pow(c,1.6):-Math.pow(-c,1.6)});go()},{passive:true});
  document.addEventListener('pointerleave',()=>{F.forEach(f=>f.t=0);go()});
})})();

/* наведение на программы — как в каталоге: заливка кругом от точки входа курсора, уходит к точке выхода */
(()=>{const S='.pl .t51 tbody tr,.pl .rw';const set=(el,e,cl)=>{const r=el.getBoundingClientRect();let x=e.clientX-r.left,y=e.clientY-r.top;if(cl){x=Math.min(Math.max(x,0),r.width);y=Math.min(Math.max(y,0),r.height)}
  el.style.setProperty('--mx',x+'px');el.style.setProperty('--my',y+'px');el.style.setProperty('--rw',Math.hypot(r.width,r.height)*1.05+'px')};
document.addEventListener('pointerover',e=>{const el=e.target.closest&&e.target.closest(S);if(!el||el.contains(e.relatedTarget))return;set(el,e)},true);
document.addEventListener('pointerout',e=>{const el=e.target.closest&&e.target.closest(S);if(!el||el.contains(e.relatedTarget))return;set(el,e,1)},true)})();

/* «Есть диплом»: фото от своего верха до низа подписей треков */
(()=>{const ph=document.querySelector('.dipA .ph'),im=ph&&ph.querySelector('img'),tk=document.querySelector('.dipA .tks');if(!im||!tk)return;
const fit=()=>{const ps=[...tk.querySelectorAll('p')];if(!ps.length)return;const b=Math.max(...ps.map(p=>p.getBoundingClientRect().bottom));const h=b-ph.getBoundingClientRect().top;if(h>120)im.style.height=Math.round(h)+'px'};
fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(tk);document.fonts&&document.fonts.ready.then(fit)})();
