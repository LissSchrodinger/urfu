/* n2: видео — выбор ролика миниатюрой */
(()=>{const s=document.getElementById('vsel'),b=document.getElementById('vbig');if(!s||!b)return;const im=b.querySelector('img');
 const T=['Учёный','Инженер','Продюсер'];
 s.querySelectorAll('button').forEach(x=>x.onclick=()=>{s.querySelectorAll('button').forEach(y=>y.classList.toggle('on',y===x));const i=+x.dataset.v;
  im.style.opacity=0;setTimeout(()=>{im.src='img/v'+(i+1)+'.jpg';im.alt='Видео «Магистратура. '+T[i]+'»';im.style.opacity=1},200)})})();
