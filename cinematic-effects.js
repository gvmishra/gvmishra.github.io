(()=>{
 const off=()=>document.body.classList.contains('effects-paused')||matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.btn.primary').forEach(button=>{let frame=0;button.addEventListener('pointermove',e=>{if(off())return;cancelAnimationFrame(frame);const rect=button.getBoundingClientRect(),x=(e.clientX-rect.left-rect.width/2)*.1,y=(e.clientY-rect.top-rect.height/2)*.15;frame=requestAnimationFrame(()=>{button.style.translate=`${x}px ${y}px`})});button.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);button.style.translate='0 0'})})}
 const visibility=()=>document.body.classList.toggle('tab-hidden',document.hidden);document.addEventListener('visibilitychange',visibility);visibility();
})();
