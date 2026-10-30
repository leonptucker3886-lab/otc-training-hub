// OTC Rules Quiz - 2nd Lt Bert. Sources: Field Manual Ed.1 (abb9227) and OTC Basic Training orders (30 Oct).
const QUESTIONS = [
 {q:"When Leon or a General posts an order, when may anyone else speak?", a:["Right away, to acknowledge","After \"DONE\" is posted, and only if called","Whenever they have an idea","After five minutes"], c:1, s:"OTC rule: turn-taking"},
 {q:"Who answers after an order is finished?", a:["Every officer","The most senior officer","Only the officer who is called, once","Whoever posts first"], c:2, s:"OTC rule: turn-taking"},
 {q:"Under Article II, what may an officer NOT do?", a:["Ask the lead a question","Correct Leon or a General","Post a commit link","Work on a branch"], c:1, s:"OTC rule: Article II"},
 {q:"Where does disagreement with a General go?", a:["Posted in the topic for all","Straight to Leon","To the General privately, once, or proven by stress test","Nowhere; it is ignored"], c:2, s:"OTC rule: Article II"},
 {q:"In what form is all OTC work delivered?", a:["A chat summary","A PDF with proof","A voice memo","A screenshot only"], c:1, s:"OTC rule: delivery"},
 {q:"What happens if an assignment from Leon has no PDF committed to a branch with its commit link?", a:["It is INCOMPLETE","It passes with a warning","It is graded later","Nothing"], c:0, s:"Manual Art. 8 (Rule 15)"},
 {q:"Which post counts as proof under Article 7?", a:["\"Done, trust me\"","A report with a commit link or live link","An acknowledgement","A plan for tomorrow"], c:1, s:"Manual Art. 7"},
 {q:"A \"waiting\" post must state the blocker, proof of the blocker and...", a:["Your rank","What you are working on meanwhile","An apology","The time you'll be back"], c:1, s:"Manual Art. 10"},
 {q:"What is the penalty for a second incomplete \"waiting\" post?", a:["Nothing","A warning","A strike","Promotion freeze for a year"], c:2, s:"Manual Art. 10"},
 {q:"Every order must state WHO, WHAT, WHEN and...", a:["WHY","PROOF (the done-when condition)","WHERE","HOW MUCH"], c:1, s:"Manual Art. 6"},
 {q:"Where should officers commit work?", a:["Directly to main","Their own branch","Any branch, twice to be safe","A personal fork only"], c:1, s:"Manual Art. 9"},
 {q:"How many General slots exist, and how are they earned?", a:["Unlimited, by seniority","Two, by going above and beyond","One, by vote","Three, by meeting requirements"], c:1, s:"Manual Art. 4"},
 {q:"The commit that adds a LOGBOOK entry cannot log its own hash. What happens?", a:["It is never logged","It is logged in the officer's next entry on the same branch","The commit is reverted","Leon logs it"], c:1, s:"Manual Art. 7"},
 {q:"Which is NOT one of the inspection grades?", a:["PASS","INCOMPLETE","FAIL","PENDING"], c:3, s:"Manual Art. 13"},
 {q:"What is worth more than being right?", a:["Speed","Respect","Rank","Word count"], c:1, s:"Manual Art. 2 (OTS 13)"}
];
let i=0, score=0, picked=[];
const box=(typeof document!=='undefined')?document.getElementById('quiz'):null;
let actx=null;
function click(){ try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); const o=actx.createOscillator(),g=actx.createGain(); o.frequency.value=880; g.gain.setValueAtTime(.15,actx.currentTime); g.gain.exponentialRampToValueAtTime(.001,actx.currentTime+.08); o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime+.08);}catch(e){} }
function esc(t){return t.replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
function show(){
 const Q=QUESTIONS[i];
 box.innerHTML=`<p><strong>Question ${i+1} of ${QUESTIONS.length}</strong> &middot; Score ${score}</p><h3>${esc(Q.q)}</h3>`+
  Q.a.map((t,k)=>`<p><button class="opt" data-k="${k}" style="width:100%;text-align:left">${esc(t)}</button></p>`).join('')+`<p id="fb"></p>`;
 box.querySelectorAll('.opt').forEach(b=>b.onclick=()=>answer(+b.dataset.k));
}
function answer(k){
 click();
 const Q=QUESTIONS[i], ok=k===Q.c; if(ok) score++; picked.push(k);
 box.querySelectorAll('.opt').forEach(b=>{b.disabled=true; const n=+b.dataset.k; if(n===Q.c) b.style.background='#22c55e'; else if(n===k) b.style.background='#ef4444';});
 document.getElementById('fb').innerHTML=(ok?'Correct. ':'Wrong. Answer: '+esc(Q.a[Q.c])+'. ')+'<em>('+esc(Q.s)+')</em><br><br><button id="nx">'+(i<QUESTIONS.length-1?'Next':'See results')+'</button>';
 document.getElementById('nx').onclick=()=>{i++; i<QUESTIONS.length?show():results();};
}
function results(){
 const pct=Math.round(score/QUESTIONS.length*100), pass=pct>=80;
 box.innerHTML=`<h3>Results: ${score} / ${QUESTIONS.length} (${pct}%)</h3><p style="font-size:1.3rem;color:${pass?'#22c55e':'#ef4444'}"><strong>${pass?'PASS':'FAIL'}</strong> (pass mark 80%)</p>`+
  `<ol>`+QUESTIONS.map((Q,n)=>`<li>${picked[n]===Q.c?'&#10004;':'&#10008;'} ${esc(Q.q)}<br><small>Answer: ${esc(Q.a[Q.c])} &middot; ${esc(Q.s)}</small></li>`).join('')+`</ol><button id="rt">Retake quiz</button>`;
 document.getElementById('rt').onclick=()=>{i=0;score=0;picked=[];show();};
}
if(box) show();
if(typeof module!=='undefined') module.exports={QUESTIONS};
