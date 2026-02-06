const settingsModal = document.getElementById('settingsModal');
document.getElementById('settingsBtn').addEventListener('click',()=>settingsModal.style.display='block');
document.getElementById('closeSettings').addEventListener('click',()=>settingsModal.style.display='none');
document.getElementById('restoreDefault').addEventListener('click',()=>{
    localStorage.clear();
    document.getElementById('fontSizeRange').value=16;
    document.getElementById('volPercent').value=500;
    document.getElementById('priceGapPercent').value=5;
    document.getElementById('avgGapPercent').value=5;
    document.getElementById('fearBase').value=3;
    document.body.style.fontSize='16px';
});
document.getElementById('saveSettings').addEventListener('click',()=>{
    localStorage.setItem('fontSize', document.getElementById('fontSizeRange').value);
    localStorage.setItem('volPercent', document.getElementById('volPercent').value);
    localStorage.setItem('priceGapPercent', document.getElementById('priceGapPercent').value);
    localStorage.setItem('avgGapPercent', document.getElementById('avgGapPercent').value);
    localStorage.setItem('fearBase', document.getElementById('fearBase').value);
    alert('저장 완료');
    settingsModal.style.display='none';
});
document.getElementById('fontSizeRange').addEventListener('input',e=>{
    document.body.style.fontSize=e.target.value+'px';
});
window.addEventListener('load',()=>{
    const savedFont=localStorage.getItem('fontSize');
    if(savedFont) document.body.style.fontSize=savedFont+'px';
});