document.documentElement.dataset.hero=(new URLSearchParams(location.search).get('hero')||'a');

/* слоганы и подписи — из макетов концепта «Новая магистратура 2026» */
const SL=[['возможности','Поступай<br>осознанно,<br>углубляйся<br>в профессию'],['знания','Продолжай<br>обучение на базе<br>сильного универа'],['масштабы','Экспертиза<br>и репутация<br>сильного вуза'],['смыслы','Проектная<br>и практическая<br>работа'],['события','Связь с реальной<br>профессиональной<br>средой']];
const QS=new URLSearchParams(location.search);
window.ANIM=(QS.get('anim')||'c');
const wEl=document.getElementById('word'),lEl=document.getElementById('lead');
window.LEADFIX=(QS.get('lead')||'fix')!=='swap';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const lines=h=>h.split('<br>');
/* v20: у слоя всегда есть clip-path и свой слой отрисовки — текст не перерисовывается иначе в начале и в конце смены (давало рывок) */
const PFULL='polygon(-30% 0,160% 0,130% 100%,-60% 100%)';
function layer(h,chars){const d=document.createElement('span');d.className='ly';d.style.clipPath=PFULL;
  d.innerHTML=lines(h).map(t=>'<span class="ln"><span class="li">'+(chars?t.split(/(\s+)/).map(w=>/^\s+$/.test(w)?w:'<span class="wd">'+[...w].map(c=>'<i class="ch">'+c+'</i>').join('')+'</span>').join(''):t)+'</span></span>').join('');return d}
function mount(el,h){el.innerHTML='';el.classList.add('stk');el.appendChild(layer(h,true))}
mount(wEl,SL[0][0]);if(lEl)mount(lEl,SL[0][1]); /* 17.11: подпись слева убрана по итогам созвона */
const EIN='cubic-bezier(.22,.8,.24,1)',EOUT='cubic-bezier(.6,0,.8,.3)',EW='cubic-bezier(.7,0,.25,1)';
function swap(el,h,delay){
  /* добить прошлую смену: оставить только последний слой, без хвостов анимаций */
  const L=[...el.querySelectorAll(':scope>.ly')];L.slice(0,-1).forEach(x=>x.remove());
  el.getAnimations({subtree:true}).forEach(a=>a.cancel());
  const old=L[L.length-1],nw=layer(h,true);el.appendChild(nw);
  const fin=[];const A=(n,k,o)=>{const a=n.animate(k,Object.assign({fill:'both'},o));fin.push(a.finished);return a};
  const m=window.ANIM;
  if(m==='a'){ /* A — маска строками: старое уходит вверх, новое поднимается снизу */
    old.querySelectorAll('.li').forEach((n,i)=>A(n,[{transform:'translateY(0)'},{transform:'translateY(-110%)'}],{duration:380,delay:delay+i*40,easing:EOUT}));
    nw.querySelectorAll('.li').forEach((n,i)=>A(n,[{transform:'translateY(110%)'},{transform:'translateY(0)'}],{duration:620,delay:delay+260+i*60,easing:EIN}));
  }else if(m==='b'){ /* B — буквы проявляются из размытия волной */
    const oc=old.querySelectorAll('.ch'),nc=nw.querySelectorAll('.ch'),st=Math.min(28,420/nc.length);
    oc.forEach((n,i)=>A(n,[{opacity:1,filter:'blur(0)'},{opacity:0,filter:'blur(8px)'}],{duration:260,delay:delay+i*Math.min(8,80/oc.length),easing:'ease-in'}));
    nc.forEach((n,i)=>A(n,[{opacity:0,filter:'blur(10px)',transform:'translateY(.18em)'},{opacity:1,filter:'blur(0)',transform:'none'}],{duration:560,delay:delay+330+i*st,easing:EIN}));
  }else if(m==='d'){ /* D — тихий наплыв, без движения */
    A(old,[{opacity:1},{opacity:0}],{duration:260,delay,easing:'ease-in'});
    A(nw,[{opacity:0},{opacity:1}],{duration:480,delay:delay+250,easing:'ease-out'});
  }else if(m==='e'){ /* E — лента вбок: слово уходит влево, новое приходит справа; подпись — наплывом */
    if(el===wEl){A(old,[{transform:'none',opacity:1},{transform:'translateX(-.6em)',opacity:0}],{duration:300,delay,easing:EOUT});
      A(nw,[{transform:'translateX(.6em)',opacity:0},{transform:'none',opacity:1}],{duration:560,delay:delay+300,easing:EIN})}
    else{A(old,[{opacity:1},{opacity:0}],{duration:260,delay,easing:'ease-in'});A(nw,[{opacity:0},{opacity:1}],{duration:480,delay:delay+250,easing:'ease-out'})}
  }else{ /* C — грань: диагональ проходит по тексту, как луч, новое на миг подсвечено кораллом */
    const P0='polygon(-30% 0,-30% 0,-60% 100%,-60% 100%)',P1='polygon(-30% 0,160% 0,130% 100%,-60% 100%)',P2='polygon(160% 0,160% 0,130% 100%,130% 100%)';
    A(old,[{clipPath:P1},{clipPath:P2}],{duration:700,delay,easing:EW});
    A(nw,[{clipPath:P0},{clipPath:P1}],{duration:700,delay,easing:EW});
    A(nw,[{color:'#ffc2a8'},{color:'#ffc2a8',offset:.45},{color:'#fff'}],{duration:1300,delay,easing:'ease-out'});
  }
  Promise.all(fin).then(()=>{old.remove();nw.getAnimations({subtree:true}).forEach(a=>{try{a.commitStyles()}catch(e){}a.cancel()})}).catch(()=>{});
}
let k=0;
function step(){k=(k+1)%SL.length;
  if(RM){mount(wEl,SL[k][0]);if(lEl&&!window.LEADFIX)mount(lEl,SL[k][1]);return}
  swap(wEl,SL[k][0],0);if(lEl&&!window.LEADFIX)swap(lEl,SL[k][1],120)}
if(!/static/.test(location.search))window.HT=setInterval(step,4000);
