document.documentElement.dataset.hero=(new URLSearchParams(location.search).get('hero')||'a');

/* слоганы и подписи — из макетов концепта «Новая магистратура 2026»; «масштабы» пока без подписи — не сверена */
const SL=[['возможности','','Поступай<br>осознанно,<br>углубляйся<br>в профессию'],['знания','','Продолжай<br>обучение на базе<br>сильного универа'],['масштабы','','Экспертиза<br>и репутация<br>сильного вуза'],['смыслы','','Проектная<br>и практическая<br>работа'],['события','','Связь с реальной<br>профессиональной<br>средой']];
const wEl=document.getElementById('word'),lEl=document.getElementById('lead'),dEl=document.getElementById('dots');
dEl.innerHTML=SL.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('');
let k=0;const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function step(){k=(k+1)%SL.length;wEl.classList.add('out');lEl.classList.add('out');
  setTimeout(()=>{wEl.textContent=SL[k][0];lEl.firstChild.innerHTML=SL[k][2];wEl.classList.remove('out');lEl.classList.remove('out');
  [...dEl.children].forEach((d,i)=>d.classList.toggle('on',i===k))},450)}
if(!RM&&!/static/.test(location.search))setInterval(step,3800);

