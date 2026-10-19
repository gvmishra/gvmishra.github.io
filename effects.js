(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const control=document.getElementById('motion-control');
 let paused=reduced.matches,frame=0,typingTimer;
 const canvas=document.getElementById('neural-canvas'),ctx=canvas.getContext('2d');
 let width=0,height=0,points=[];
 function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);points=Array.from({length:width<650?24:46},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.32,vy:(Math.random()-.5)*.32}));draw(false)}
 function draw(move){if(!ctx)return;ctx.clearRect(0,0,width,height);points.forEach((p,i)=>{if(move){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>width)p.vx*=-1;if(p.y<0||p.y>height)p.vy*=-1}for(let j=i+1;j<points.length;j++){const q=points[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<135){ctx.strokeStyle=`rgba(125,216,231,${(1-d/135)*.22})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}ctx.fillStyle='rgba(165,255,203,.45)';ctx.beginPath();ctx.arc(p.x,p.y,1.7,0,Math.PI*2);ctx.fill()})}
 let heroVisible=true;
 function loop(){if(paused||document.hidden||!heroVisible){frame=0;return}draw(true);frame=requestAnimationFrame(loop)}
 function start(){if(!frame&&!paused&&!document.hidden&&heroVisible)frame=requestAnimationFrame(loop)}
 const roles=['Full-stack developer','Python & machine learning','Problem solver · 150+ DSA'];let role=0,pos=roles[0].length,deleting=true;
 const typed=document.getElementById('typed-role');
 function type(){if(paused||document.hidden)return;const word=roles[role];if(deleting){pos--;typed.textContent=word.slice(0,Math.max(pos,0));if(pos<=0){deleting=false;role=(role+1)%roles.length}}else{pos++;typed.textContent=roles[role].slice(0,pos);if(pos>=roles[role].length){deleting=true;typingTimer=setTimeout(type,1900);return}}typingTimer=setTimeout(type,deleting?35:65)}
 function sync(){document.body.classList.toggle('effects-paused',paused);control.textContent=paused?'Enable effects ◇':'Pause effects ◇';control.setAttribute('aria-pressed',String(paused));clearTimeout(typingTimer);cancelAnimationFrame(frame);frame=0;if(paused){typed.textContent=roles[0];document.querySelector('.hero-art').style.transform=''}else{role=0;pos=roles[0].length;deleting=true;typed.textContent=roles[0];typingTimer=setTimeout(type,1800);start()}}
 control.addEventListener('click',()=>{paused=!paused;sync()});reduced.addEventListener('change',e=>{paused=e.matches;sync()});
 const blocks=document.querySelectorAll('section .section-top,.about-grid,.project,.skill,.split,.achievements,.contact');
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}}),{threshold:.08});blocks.forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)});new IntersectionObserver(([e])=>{heroVisible=e.isIntersecting;start()}).observe(document.querySelector('.hero'))}
 const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
 if(fine){document.querySelectorAll('.project').forEach(card=>card.addEventListener('pointermove',e=>{if(paused)return;const r=card.getBoundingClientRect();card.style.setProperty('--px',`${e.clientX-r.left}px`);card.style.setProperty('--py',`${e.clientY-r.top}px`)}));const art=document.querySelector('.hero-art');art.addEventListener('pointermove',e=>{if(paused)return;const r=art.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;art.style.transform=`perspective(900px) rotateX(${-y*7}deg) rotateY(${x*7}deg)`});art.addEventListener('pointerleave',()=>art.style.transform='')}
 const progress=document.querySelector('.progress-bar');let scrollQueued=false;function scrollUpdate(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?scrollY/max*100:0}%`;scrollQueued=false}addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(scrollUpdate)}},{passive:true});
 document.addEventListener('visibilitychange',()=>{clearTimeout(typingTimer);if(!document.hidden){start();if(!paused)typingTimer=setTimeout(type,1000)}});
 addEventListener('resize',resize);resize();sync();scrollUpdate();
})();
