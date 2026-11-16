
/* лендинг: шапка прозрачная поверх первого экрана */
const hero=document.querySelector('.hero');
const tr=()=>hw.classList.toggle('onhero',scrollY<hero.offsetHeight-72);
addEventListener('scroll',tr,{passive:true});addEventListener('resize',tr);tr();
