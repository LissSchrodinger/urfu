
/* лендинг: шапка прозрачная поверх первого экрана */
const hero=document.querySelector('.hero');
const tr=()=>hw.classList.toggle('onhero',scrollY<hero.offsetHeight-72);
addEventListener('scroll',tr,{passive:true});addEventListener('resize',tr);tr();

/* v14: при закрытии меню над первым экраном шапка остаётся светлой, пока меню сворачивается */
{let t=0,was=hw.classList.contains('open');new MutationObserver(()=>{const o=hw.classList.contains('open');if(was&&!o){hw.classList.add('shut');clearTimeout(t);t=setTimeout(()=>hw.classList.remove('shut'),520)}if(o&&hw.classList.contains('shut')){clearTimeout(t);hw.classList.remove('shut')}was=o}).observe(hw,{attributes:true,attributeFilter:['class']})}
