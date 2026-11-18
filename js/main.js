/* Hashem Sheikhypour portfolio: scroll-scrubbed video frames, build-in animation, smooth scroll */
(function(){
 var base=(document.body.getAttribute('data-assets')||'assets')+'/frames/',N=240;
 window.FR=[];for(var i=1;i<=N;i++)window.FR.push(base+'f'+('00'+i).slice(-3)+'.webp');
})();
(function(){var FA=document.documentElement.lang==='fa';
var P=[0.3,2.4,4.2,5.0,5.6,6.3,6.8,7.3,8.3,9.0,9.9],NM=[0,1,2,5,10]; // video time (s) per section; NM maps nav items to sections
var secs=[].slice.call(document.querySelectorAll('section')),

 menu=[].slice.call(document.querySelectorAll('#menu li')),prog=document.getElementById('prog'),
 cur=P[0],tgt=P[0],active=-1,cv=document.getElementById('cv'),cx=cv.getContext('2d'),IM=new Array((window.FR||[]).length),FPS=24,lastF=-1,lastC=-99,vlast=performance.now();
function ss(t){return t*t*(3-2*t)}
function update(){
 var y=scrollY+innerHeight/2,c=secs.map(function(s){return s.offsetTop+s.offsetHeight/2}),i=0;
 if(y<=c[0])tgt=P[0];
 else if(y>=c[c.length-1])tgt=P[P.length-1];
 else{while(y>c[i+1])i++;var t=ss((y-c[i])/(c[i+1]-c[i]));tgt=P[i]+(P[i+1]-P[i])*t}
 var n=0;c.forEach(function(v,k){if(Math.abs(y-v)<Math.abs(y-c[n]))n=k});
 if(n!==active){active=n;var a=0;NM.forEach(function(v,k){if(n>=v)a=k});menu.forEach(function(m,k){m.classList.toggle('on',k===a)})}
 prog.style.transform='scaleY('+(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))+')';
}
function img(i){var m=IM[i];if(!m){m=IM[i]=new Image();m.src=FR[i]}return m}
function keep(c){
 if(Math.abs(c-lastC)<2)return;lastC=c;var n=FR.length;
 for(var k=Math.max(0,c-8);k<=Math.min(n-1,c+28);k++)img(k);
 for(var k=0;k<n;k++){if(IM[k]&&(k<c-60||k>c+80)){IM[k].src='';IM[k]=null}}
}
function ok(i){var m=IM[i];return m&&m.complete&&m.naturalWidth?m:null}
function draw(t){
 var n=FR.length,f=Math.max(0,Math.min(n-1.001,t*FPS)),i=Math.floor(f),a=f-i;
 keep(i);
 var A=ok(i),exact=!!A;
 if(!A){for(var d=1;d<40&&!A;d++){A=ok(i-d)||ok(i+d)}}
 if(!A||(exact&&Math.abs(f-lastF)<.005))return;
 lastF=exact?f:-1;
 cx.globalAlpha=1;cx.drawImage(A,0,0,cv.width,cv.height);
 var B=exact&&a>.08?ok(i+1):null;
 if(B){cx.globalAlpha=a;cx.drawImage(B,0,0,cv.width,cv.height);cx.globalAlpha=1}
}
function frame(){
 var now=performance.now(),dt=Math.min(.05,(now-vlast)/1000);vlast=now;
 cur+=(tgt-cur)*(1-Math.exp(-dt*7));draw(cur);
 requestAnimationFrame(frame);
}
addEventListener('scroll',update,{passive:true});addEventListener('resize',update);
menu.forEach(function(m,k){m.addEventListener('click',function(){secs[NM[k]].scrollIntoView({behavior:'smooth'})})});
update();frame();


var sy=scrollY,ty=scrollY,sAnim=false;
function sLoop(){
 sy+=(ty-sy)*.12;
 if(Math.abs(ty-sy)<.5){sy=ty;sAnim=false}else requestAnimationFrame(sLoop);
 scrollTo({top:sy,behavior:'instant'});
}
addEventListener('wheel',function(e){
 if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
 e.preventDefault();
 var mx=document.documentElement.scrollHeight-innerHeight;
 if(!sAnim){sy=ty=scrollY}
 ty=Math.max(0,Math.min(mx,ty+e.deltaY*(e.deltaMode===1?34:1)*.9));
 if(!sAnim){sAnim=true;requestAnimationFrame(sLoop)}
},{passive:false});
var tr=document.querySelector('.track');
if(tr){var rtl=getComputedStyle(tr).direction==='rtl';
 var stepS=function(d){var c=tr.querySelector('.card');tr.scrollBy({left:d*(rtl?-1:1)*(tr.clientWidth+18),behavior:'smooth'})};
 document.getElementById('sPrev').onclick=function(){stepS(-1)};
 document.getElementById('sNext').onclick=function(){stepS(1)};}
// text split into characters so cursors can "write" it
document.querySelectorAll('.row b,.row h3,.row p,.card small,.card h3,.card p,.links span').forEach(function(e){e.classList.add('build')});
var els=[].slice.call(document.querySelectorAll('.build')),q=[],cus=[],tpl=document.getElementById('cur'),
 still=matchMedia('(prefers-reduced-motion:reduce)').matches;
els.forEach(function(el){
 var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),ns=[],n;el._ch=[];
 while(n=w.nextNode()){if(n.parentElement.closest('.build')===el&&n.nodeValue.trim())ns.push(n)}
 ns.forEach(function(n){var f=document.createDocumentFragment();(FA?n.nodeValue.split(/(\s+)/).filter(Boolean):n.nodeValue.split('')).forEach(function(c){var s=document.createElement('span');s.className='ch';s.textContent=c;f.appendChild(s);el._ch.push(s)});n.parentNode.replaceChild(f,n)});
});
function reveal(el){el._ch.forEach(function(c){c.classList.add('on')})}
function type(el){var cs=el._ch,i=0,st=Math.max(1,Math.ceil(cs.length/95));if(FA){(function w(){if(i<cs.length){cs[i++].classList.add('on');setTimeout(w,42)}})();return}(function t(){for(var k=0;k<st&&i<cs.length;k++)cs[i++].classList.add('on');if(i<cs.length)requestAnimationFrame(t)})()}
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
(FA?['بساز','بنویس','طراحی','کد','استایل','تایپ','چیدمان','پرداخت','انتشار','تست']:['BUILD','WRITE','DESIGN','CODE','STYLE','TYPE','LAYOUT','POLISH','SHIP','TEST']).forEach(function(name,i){
 var c=i?tpl.cloneNode(true):tpl;c.removeAttribute('id');c.classList.add('idle');
 c.querySelector('span').textContent=name;c.querySelector('span').style.filter='hue-rotate('+(i*36)+'deg)';
 c.style.transform='translate('+(8+i*8)+'vw,96vh)';if(i)document.body.appendChild(c);
 cus.push({el:c,busy:false,i:i});
});
function kick(){cus.forEach(function(c){if(!c.busy&&q.length)work(c)})}
async function work(c){
 c.busy=true;c.el.classList.remove('idle');await sleep(c.i*90);
 while(q.length){
  var el=q.shift(),r=el.getBoundingClientRect();
  if(r.bottom<0||r.top>innerHeight){el.classList.add('in');reveal(el);continue}
  var x=Math.min(innerWidth-60,Math.max(10,r.left+Math.min(r.width*.5,240)+c.i*9)),y=Math.min(innerHeight*.8,Math.max(70,r.top+Math.min(r.height*.5,50)+c.i*6));
  c.el.style.transform='translate('+x+'px,'+y+'px)';
  await sleep(720);
  c.el.classList.remove('click');void c.el.offsetWidth;c.el.classList.add('click');
  el.classList.add('in');type(el);
  await sleep(220);
 }
 await sleep(900);
 if(!q.length)c.el.classList.add('idle');
 c.busy=false;if(q.length)kick();
}
if(still){els.forEach(function(e){e.classList.add('wire','in');reveal(e)})}
else{
 var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting&&!e.target.dataset.q){e.target.dataset.q=1;e.target.classList.add('wire');q.push(e.target);kick()}
 })},{threshold:.1,rootMargin:'0px 0px -4% 0px'});
 els.forEach(function(e){io.observe(e)});
}
})();
