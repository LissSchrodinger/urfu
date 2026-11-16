
/* лучи первого экрана: viewBox по высоте блока, чтобы грани шли до низа «Есть диплом» */
(()=>{const t=document.querySelector('.top'),s=t&&t.querySelector('svg.rays');if(!s)return;
const fit=()=>{const r=t.getBoundingClientRect();s.setAttribute('viewBox','0 0 1440 '+Math.round(r.height*1440/r.width));s.setAttribute('preserveAspectRatio','xMinYMin slice')};
fit();addEventListener('resize',fit);new ResizeObserver(fit).observe(t)})();
