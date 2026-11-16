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

/* Переливы по граням: свет бежит по линиям между гранями туда, где курсор (сами грани и фон не меняются). */
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const NS='http://www.w3.org/2000/svg';const P={x:495,y:408},L=2200;
const OFF=[-.2,-.07,0,.07,.2],COL=['#FF875C','#FFB08F','#ffffff','#C9C4FF','#8f8cf0'],OP=[0,.75,1,.75,0];
document.querySelectorAll('svg.rays,svg.rays3').forEach((s,si)=>{const paths=[...s.querySelectorAll('path')];if(!paths.length)return;const host=paths[0].parentNode;
  const defs=s.querySelector('defs')||s.insertBefore(document.createElementNS(NS,'defs'),s.firstChild);
  const lay=document.createElementNS(NS,'g');lay.setAttribute('style','mix-blend-mode:screen;pointer-events:none');host.appendChild(lay);
  const E=paths.map((p,i)=>{const m=p.getAttribute('d').match(/-?[\d.]+/g).map(Number);const ang=Math.atan2(m[3]-m[1],m[2]-m[0]),dx=Math.cos(ang),dy=Math.sin(ang);
    const id=`sh${si}_${i}`,gr=document.createElementNS(NS,'linearGradient');gr.id=id;gr.setAttribute('gradientUnits','userSpaceOnUse');
    gr.setAttribute('x1',P.x);gr.setAttribute('y1',P.y);gr.setAttribute('x2',P.x+dx*L);gr.setAttribute('y2',P.y+dy*L);
    const st=OFF.map((o,k)=>{const e=document.createElementNS(NS,'stop');e.setAttribute('stop-color',COL[k]);e.setAttribute('stop-opacity',OP[k]);gr.appendChild(e);return e});defs.appendChild(gr);
    const mk=(w,o)=>{const l=document.createElementNS(NS,'line');l.setAttribute('x1',P.x);l.setAttribute('y1',P.y);l.setAttribute('x2',P.x+dx*L);l.setAttribute('y2',P.y+dy*L);
      l.setAttribute('stroke',`url(#${id})`);l.setAttribute('stroke-width',w);l.setAttribute('stroke-linecap','round');l.setAttribute('opacity',0);lay.appendChild(l);return l};
    return {ang,st,wide:mk(26,0),thin:mk(2.2,0),hair:(()=>{const l=mk(1,0);l.setAttribute('stroke','#fff');l.setAttribute('opacity','.07');return l})(),c:.3,tc:.3,w:0,tw:0}});
  let run=false;
  const tick=()=>{let mv=false;E.forEach(e=>{e.c+=(e.tc-e.c)*.09;e.w+=(e.tw-e.w)*.08;if(Math.abs(e.tc-e.c)+Math.abs(e.tw-e.w)>.001)mv=true;
      e.st.forEach((x,k)=>x.setAttribute('offset',Math.min(1,Math.max(0,e.c+OFF[k])).toFixed(4)));e.thin.setAttribute('opacity',Math.min(1,e.w*1.1).toFixed(3));e.wide.setAttribute('opacity',(e.w*.42).toFixed(3))});
    if(mv)requestAnimationFrame(tick);else run=false};
  addEventListener('pointermove',ev=>{const r=s.getBoundingClientRect();const inb=ev.clientY>r.top-60&&ev.clientY<r.bottom+60;
    let ca=null,dist=0;if(inb){const m=host.getScreenCTM();if(m){const q=new DOMPoint(ev.clientX,ev.clientY).matrixTransform(m.inverse());ca=Math.atan2(q.y-P.y,q.x-P.x);dist=Math.hypot(q.x-P.x,q.y-P.y)}}
    E.forEach(e=>{if(ca===null){e.tw=0;return}let d=Math.abs(e.ang-ca);d=Math.min(d,2*Math.PI-d);e.tw=Math.pow(Math.max(0,Math.cos(d)),3);e.tc=Math.min(.95,Math.max(.03,dist/L))});
    if(!run){run=true;requestAnimationFrame(tick)}},{passive:true});
  document.addEventListener('pointerleave',()=>{E.forEach(e=>e.tw=0);if(!run){run=true;requestAnimationFrame(tick)}});
})})();
