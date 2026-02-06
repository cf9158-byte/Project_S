const settingsModal = document.getElementById('settingsModal');
document.getElementById('settingsBtn').addEventListener('click', ()=>{settingsModal.style.display='block'});
document.getElementById('closeSettings').addEventListener('click', ()=>{settingsModal.style.display='none'});
document.getElementById('restoreDefault').addEventListener('click', ()=>{
  localStorage.clear();
  document.getElementById('fontSizeRange').value=16;
  document.body.style.fontSize='16px';
});
document.getElementById('fontSizeRange').addEventListener('input', e=>{
  document.body.style.fontSize=e.target.value+'px';
  localStorage.setItem('fontSize', e.target.value);
});
window.addEventListener('load', ()=>{
  const savedFont = localStorage.getItem('fontSize');
  if(savedFont){document.body.style.fontSize=savedFont+'px';}
});