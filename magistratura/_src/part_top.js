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

/* v12. Анимация как в окне программы каталога (rays.js, режим LD), чуть ярче:
   L — грани ловят свет: к курсору светлеют, от курсора темнеют (оттенок граней, а не стыки);
   D — глубина слоями: грани сдвигаются на 6/4 px, свечение точки — на 20/13 px;
   плюс мягкое пятно света скользит за курсором и подсвечивает оттенок грани (soft-light). */
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const NS='http://www.w3.org/2000/svg';const P={x:495,y:408};
const LIT=.16,SHADE=.12;
document.querySelectorAll('svg.rays,svg.rays3').forEach((s,si)=>{const paths=[...s.querySelectorAll('path')];if(!paths.length)return;const host=paths[0].parentNode;
  const defs=s.querySelector('defs');const el=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e};
  defs.insertAdjacentHTML('beforeend',`<filter id="rb${si}" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="46"/></filter>
   <radialGradient id="rgw${si}"><stop offset="0" stop-color="#FF875C" stop-opacity=".55"/><stop offset=".35" stop-color="#FF9F7E" stop-opacity=".3"/><stop offset=".7" stop-color="#c77ac8" stop-opacity=".08"/><stop offset="1" stop-color="#c77ac8" stop-opacity="0"/></radialGradient>
   <radialGradient id="rgs${si}"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".45" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`);
  const gF=el('g',{});host.insertBefore(gF,paths[0]);
  const F=paths.map(p=>{gF.appendChild(p);const m=p.getAttribute('d').match(/-?[\d.]+/g).map(Number);const a=Math.atan2(m[5]-m[1],m[4]-m[0]);
    const hi=p.cloneNode();hi.setAttribute('fill','#fff');hi.setAttribute('opacity',0);const lo=p.cloneNode();lo.setAttribute('fill','#14093f');lo.setAttribute('opacity',0);return {a,hi,lo,v:0,t:0}});
  F.forEach(f=>gF.appendChild(f.hi));F.forEach(f=>gF.appendChild(f.lo));
  const spot=el('ellipse',{rx:420,ry:340,fill:`url(#rgs${si})`,opacity:0,style:'mix-blend-mode:soft-light'});gF.appendChild(spot);
  const gG=el('g',{});const glow=el('ellipse',{cx:P.x,cy:P.y,rx:360,ry:230,fill:`url(#rgw${si})`,filter:`url(#rb${si})`});gG.appendChild(glow);host.appendChild(gG);
  const st={px:0,py:0,tpx:0,tpy:0,sx:P.x,sy:P.y,tsx:P.x,tsy:P.y,so:0,tso:0};let raf=0;
  const lr=(a,b,k)=>a+(b-a)*k;
  const tick=()=>{raf=0;let more=false;const k=.06;const ch=(a,b)=>{if(Math.abs(b-a)>.001)more=true};
    ['px','py','so'].forEach(n=>{const t='t'+n;st[n]=lr(st[n],st[t],k);ch(st[n],st[t])});
    ['sx','sy'].forEach(n=>{const t='t'+n;st[n]=lr(st[n],st[t],.09);if(Math.abs(st[t]-st[n])>.5)more=true});
    F.forEach(f=>{f.v=lr(f.v,f.t,k);ch(f.v,f.t);f.hi.setAttribute('opacity',(Math.max(0,f.v)*LIT).toFixed(3));f.lo.setAttribute('opacity',(Math.max(0,-f.v)*SHADE).toFixed(3))});
    gF.setAttribute('transform',`translate(${(st.px*6).toFixed(2)} ${(st.py*4).toFixed(2)})`);gG.setAttribute('transform',`translate(${(st.px*20).toFixed(2)} ${(st.py*13).toFixed(2)})`);
    spot.setAttribute('cx',st.sx.toFixed(1));spot.setAttribute('cy',st.sy.toFixed(1));spot.setAttribute('opacity',st.so.toFixed(3));
    if(more)raf=requestAnimationFrame(tick)};
  const go=()=>{if(!raf)raf=requestAnimationFrame(tick)};
  const off=()=>{F.forEach(f=>f.t=0);st.tpx=st.tpy=0;st.tso=0;go()};
  addEventListener('pointermove',e=>{const r=s.getBoundingClientRect();if(e.clientY<r.top-80||e.clientY>r.bottom+80){off();return}
    const m=host.getScreenCTM();if(!m)return;const q=new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse());const ca=Math.atan2(q.y-P.y,q.x-P.x);
    F.forEach(f=>f.t=Math.cos(ca-f.a));
    st.tpx=Math.max(-1,Math.min(1,(e.clientX-innerWidth/2)/(innerWidth*.5)));st.tpy=Math.max(-1,Math.min(1,(e.clientY-(r.top+r.bottom)/2)/(r.height*.6)));
    st.tsx=q.x;st.tsy=q.y;st.tso=.75;go()},{passive:true});
  document.addEventListener('pointerleave',off);
})})();

/* «Есть диплом»: фото от своего верха до низа подписей треков */
(()=>{const ph=document.querySelector('.dipA .ph'),im=ph&&ph.querySelector('img'),tk=document.querySelector('.dipA .tks');if(!im||!tk)return;
const fit=()=>{const ps=[...tk.querySelectorAll('p')];if(!ps.length)return;const b=Math.max(...ps.map(p=>p.getBoundingClientRect().bottom));const h=b-ph.getBoundingClientRect().top;if(h>120)im.style.height=Math.round(h)+'px'};
fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(tk);document.fonts&&document.fonts.ready.then(fit)})();
