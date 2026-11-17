/* 17.11 шапка лендинга: прозрачная над первым экраном, подсветка текущего раздела */
(()=>{const ah=document.getElementById('ah'),hero=document.querySelector('.hero');if(!ah)return;
const L=[...ah.querySelectorAll('.anv a')],S=L.map(a=>document.querySelector(a.getAttribute('href')));
const up=()=>{ah.classList.toggle('onhero',!!hero&&scrollY<hero.offsetHeight-72);
 let k=-1;S.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<=120)k=i});
 if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)k=-1;
 L.forEach((a,i)=>a.classList.toggle('on',i===k))};
addEventListener('scroll',up,{passive:true});addEventListener('resize',up);up()})();
