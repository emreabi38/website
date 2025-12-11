const btn=document.querySelector('.mobile-menu-btn'),nav=document.querySelector('nav ul');
btn.addEventListener('click',()=>{nav.classList.toggle('show');btn.querySelector('i').classList.toggle('fa-bars');btn.querySelector('i').classList.toggle('fa-times');});
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)window.scrollTo({top:t.offsetTop-80,behavior:'smooth'});});});
const impressum=document.getElementById('impressum-link'),datenschutz=document.getElementById('datenschutz-link'),modals=document.querySelectorAll('.modal'),closeBtn=document.querySelectorAll('.close-modal');
impressum.addEventListener('click',e=>{e.preventDefault();document.getElementById('impressum-modal').style.display='block';});
datenschutz.addEventListener('click',e=>{e.preventDefault();document.getElementById('datenschutz-modal').style.display='block';});
closeBtn.forEach(b=>b.addEventListener('click',()=>modals.forEach(m=>m.style.display='none')));
window.addEventListener('click',e=>{if(e.target.classList.contains('modal'))modals.forEach(m=>m.style.display='none');});
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();alert('Vielen Dank! Wir melden uns.');e.target.reset();});
// Vorher/Nachher Slider
document.querySelectorAll('[data-slider]').forEach(slider=>{const range=slider.querySelector('.range'),after=slider.querySelector('.after');range.addEventListener('input',()=>after.style.clipPath=`inset(0 0 0 ${range.value}%)`);});