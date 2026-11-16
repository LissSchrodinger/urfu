
/* лучи первого экрана: viewBox по высоте блока, чтобы грани шли до низа «Есть диплом» */
(()=>{const t=document.querySelector('.top'),s=t&&t.querySelector('svg.rays');if(!s)return;
const fit=()=>{const r=t.getBoundingClientRect();s.setAttribute('viewBox','0 0 1440 '+Math.round(r.height*1440/r.width));s.setAttribute('preserveAspectRatio','xMinYMin slice')};
fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(t)})();
/* свет за курсором: грани к курсору светлеют, дальние темнеют, слои смещаются (как окно программы в каталоге) */
(()=>{const t=document.querySelector('.top'),s=t&&t.querySelector('svg.rays');if(!s||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const NS='http://www.w3.org/2000/svg',g=document.createElementNS(NS,'g');const paths=[...s.querySelectorAll(':scope>path')];
paths[0].before(g);const F=[];
paths.forEach(p=>{g.appendChild(p);const m=p.getAttribute('d').match(/-?[\d.]+/g).map(Number);const ang=Math.atan2(m[5]-m[1],m[4]-m[0]);
  const lt=p.cloneNode();lt.setAttribute('fill','#fff');lt.setAttribute('opacity','0');const dk=p.cloneNode();dk.setAttribute('fill','#1b0f5c');dk.setAttribute('opacity','0');g.append(lt,dk);F.push({ang,lt,dk,l:0,d:0})});
const P={x:495,y:408};let tx=.5,ty=.5,cx=.5,cy=.5,ca=null,str=0,tstr=0,run=false;
addEventListener('pointermove',e=>{const r=s.getBoundingClientRect();if(e.clientY>r.bottom+100){tstr=0}else{const k=1440/r.width;const x=(e.clientX-r.left)*k,y=(e.clientY-r.top)*k;ca=Math.atan2(y-P.y,x-P.x);tstr=Math.min(1,Math.hypot(x-P.x,y-P.y)/420)}
  tx=e.clientX/innerWidth;ty=e.clientY/innerHeight;if(!run){run=true;requestAnimationFrame(tick)}},{passive:true});
document.addEventListener('pointerleave',()=>{tstr=0});
function tick(){cx+=(tx-cx)*.05;cy+=(ty-cy)*.05;str+=(tstr-str)*.05;let moving=Math.abs(tx-cx)+Math.abs(ty-cy)+Math.abs(tstr-str)>.002;
  g.setAttribute('transform',`translate(${((.5-cx)*14).toFixed(2)} ${((.5-cy)*10).toFixed(2)})`);
  F.forEach(f=>{let L=0,Dk=0;if(ca!==null){let d=Math.abs(f.ang-ca);d=Math.min(d,2*Math.PI-d);const c=Math.cos(d);L=Math.max(0,c)*.10*str;Dk=Math.max(0,-c)*.22*str}
    f.l+=(L-f.l)*.08;f.d+=(Dk-f.d)*.08;if(Math.abs(L-f.l)+Math.abs(Dk-f.d)>.001)moving=true;f.lt.setAttribute('opacity',f.l.toFixed(3));f.dk.setAttribute('opacity',f.d.toFixed(3))});
  if(moving)requestAnimationFrame(tick);else run=false}
})();
