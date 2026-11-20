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
    /* v19: грани перекрыты на 0,3° — два слоя света на шве складывались в толстую светлую линию; слой света ужат на 0,4° с каждого края */const rot=(x,y,d)=>{const dx=x-P.x,dy=y-P.y,c=Math.cos(d),s=Math.sin(d);return (P.x+dx*c-dy*s).toFixed(1)+','+(P.y+dx*s+dy*c).toFixed(1)};const sg=Math.sign((m[2]-m[0])*(m[7]-m[1])-(m[3]-m[1])*(m[6]-m[0]))||1,DL=.4*Math.PI/180;const dIn=`M${P.x},${P.y} L${rot(m[2],m[3],sg*DL)} L${m[4]},${m[5]} L${rot(m[6],m[7],-sg*DL)}Z`;const mk=id=>{const n=p.cloneNode();n.setAttribute('d',dIn);n.setAttribute('class','rx15');n.setAttribute('fill',`url(#${id})`);n.setAttribute('opacity',0);n.style.mixBlendMode='soft-light';return n};
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

/* 20.11 — «полоса света» на фоне первого экрана из Figma (svg.figbg): тот же приём, что режим b выше,
   вершина веера — (0, 902) в координатах группы .fan (группа перекошена: на экране вершина у линии над кнопками). Слой света — копия грани с градиентом вдоль её оси, soft-light. */
/* 20.11 — та же функция светит и в финале (svg.finbg, фон повёрнут на 180°: координаты курсора переводятся через getScreenCTM группы, поворот учитывается сам). */
const figLight=(s,pre)=>{if(!s||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const defs=s.querySelector('defs'),P0={x:0,y:902},K=.14,PW=3,BAND=380;
/* 20.11 Василиса: свет и по нижним граням — под линией вершины, вне перекошенной группы .fan (вершина там (0,700)) */
const faces=[...s.querySelectorAll('.fan path[fill*="_linear"],.lowf')];if(!faces.length)return;
const F=faces.map((p,i)=>{const low=p.classList.contains('lowf'),P=low?{x:0,y:700}:P0,host=p.parentNode;const m=p.getAttribute('d').match(/-?\d*\.?\d+(?:e-?\d+)?/g).map(Number);let sx=0,sy=0,n=0;
  for(let k=2;k+1<m.length;k+=2){sx+=m[k]-P.x;sy+=m[k+1]-P.y;n++}const a=Math.atan2(sy/n,sx/n);
  defs.insertAdjacentHTML('beforeend',`<linearGradient id="${pre}${i}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF875C" stop-opacity="0"/><stop offset=".5" stop-color="#FFB08F" stop-opacity=".95"/><stop offset="1" stop-color="#FF875C" stop-opacity="0"/></linearGradient>`);
  const w=p.cloneNode();w.setAttribute('fill',`url(#${pre}${i})`);w.setAttribute('opacity','0');w.style.mixBlendMode='soft-light';
  const nx=p.nextElementSibling;(nx&&nx.getAttribute('d')===p.getAttribute('d')?nx:p).after(w);
  return {a,w,P,host,g:defs.querySelector('#'+pre+i),v:0,t:0,r:300,rt:300}});
let raf=0;const tick=()=>{raf=0;let more=false;
  F.forEach(f=>{f.v+=(f.t-f.v)*K;f.r+=(f.rt-f.r)*K;if(Math.abs(f.t-f.v)>.002||Math.abs(f.rt-f.r)>.5)more=true;
    f.w.setAttribute('opacity',Math.max(0,f.v).toFixed(3));const r0=f.r-BAND,r1=f.r+BAND,cx=Math.cos(f.a),cy=Math.sin(f.a);
    f.g.setAttribute('x1',(f.P.x+cx*r0).toFixed(1));f.g.setAttribute('y1',(f.P.y+cy*r0).toFixed(1));f.g.setAttribute('x2',(f.P.x+cx*r1).toFixed(1));f.g.setAttribute('y2',(f.P.y+cy*r1).toFixed(1))});
  if(more)raf=requestAnimationFrame(tick)};
const go=()=>{if(!raf)raf=requestAnimationFrame(tick)};
const sm=(x,a,b)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
addEventListener('pointermove',e=>{const r=s.getBoundingClientRect();if(e.clientY<r.top-80||e.clientY>r.bottom+80){F.forEach(f=>f.t=0);go();return}
  F.forEach(f=>{const m=f.host.getScreenCTM();if(!m)return;const q=new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse());
  const dx=q.x-f.P.x,dy=q.y-f.P.y,ca=Math.atan2(dy,dx),d=Math.hypot(dx,dy),near=sm(d,40,340);
  const c=Math.cos(ca-f.a);f.t=c>0?Math.pow(c,PW)*near:0;f.rt=d*Math.max(.25,c)});go()},{passive:true});
document.addEventListener('pointerleave',()=>{F.forEach(f=>f.t=0);go()},{passive:true});
};
figLight(document.querySelector('.top>svg.figbg'),'fbl');

/* 20.11 — финал и подвал: svg.finbg от верха финала до низа подвала. 1 ед. viewBox = 1 px на 1440 (как --u у первого экрана);
   на узких масштаб не мельче 1,3 ед./px; ≤1023 — левая часть веера, вершина за правым краем (зеркально первому экрану: там ≤1023 вершина за левым краем) — иначе свечение вершины ложится под заголовок и кнопки. Затем — тот же свет от курсора. */
(()=>{const f=document.querySelector('#apply'),s=f&&f.querySelector('svg.finbg'),ft=document.querySelector('.ft');if(!s)return;
const fit=()=>{const fr=f.getBoundingClientRect(),w=fr.width;if(!w)return;const bot=ft?ft.getBoundingClientRect().bottom:fr.bottom,h=Math.ceil(bot-fr.top);
  const k=Math.min(1440/w,1.3),vw=w*k,vh=h*k,x0=w<1024?0:1440-vw;s.style.height=h+'px';
  /* верх кадра на 20 ед. выше угла среза (61,2): иначе пик срезан краем SVG и луч из вершины не попадает в уголок (Василиса 20.11) */
  s.setAttribute('viewBox',`${x0.toFixed(1)} 40 ${vw.toFixed(1)} ${vh.toFixed(1)}`);s.setAttribute('preserveAspectRatio','xMaxYMin meet');
  /* ≤1023 видна левая, самая толстая часть среза — сжимаем срез по высоте до 120·u, как был .fin::before, иначе он наезжает на заголовок */
  const ct=s.querySelector('.cut');if(ct){const fy=w<1024?Math.min(1,120*w/1440*k/116):1;ct.setAttribute('transform',`translate(0 40) scale(1 ${fy.toFixed(3)}) translate(0 -40) rotate(180 720 508)`);
    /* веер — вслед за сжатым углом среза (944,6; 61,2), чтобы луч из вершины по-прежнему приходил в уголок */
    const rt=s.querySelector('.rot');if(rt)rt.setAttribute('transform',`translate(0 ${(21.2*fy-21.2).toFixed(2)}) rotate(180 720 508)`)}
  /* затемнение со стороны текста: грани у вершины светлые, без него «выбери программу» и обводная кнопка ниже 3 : 1 и 4,5 : 1 */
  const sc=s.querySelector('.scrim'),gr=s.querySelector('#fnscrim'),hd=f.querySelector('.h1');
  if(sc&&gr&&hd){const rg=document.createRange();rg.selectNodeContents(hd);const tr=(rg.getBoundingClientRect().right-fr.left+240)*k;sc.setAttribute('x',x0.toFixed(1));sc.setAttribute('y','0');sc.setAttribute('width',vw.toFixed(1));sc.setAttribute('height',(vh+120).toFixed(1));
    gr.setAttribute('x1',x0.toFixed(1));gr.setAttribute('x2',(x0+tr).toFixed(1))}};
fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(f);if(ft)new ResizeObserver(fit).observe(ft);
figLight(s,'fnl')})();
