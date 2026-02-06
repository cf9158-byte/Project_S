let sortKey=null;

function renderMainList(){
 const list=document.getElementById("stockList");
 document.getElementById("dateLabel").innerText=new Date().toLocaleDateString();
 let data=sampleDB.map(analyzeSeryeok);
 if(sortKey) data.sort((a,b)=>b[sortKey]-a[sortKey]);

 data.forEach(s=>{
  const tr=document.createElement("tr");
  tr.onclick=()=>location.href=`detail.html?t=${s.ticker}`;
  tr.innerHTML=`
  <td class="sticky">${s.ticker}</td>
  <td>${s.grade}(${s.prob}%)</td>
  <td>${s.power}</td>
  <td>${s.prev.toFixed(2)}</td>
  <td>${s.close.toFixed(2)}</td>
  <td>${((s.close-s.prev)/s.prev*100).toFixed(2)}%</td>
  <td>${(s.mcap/1e9).toFixed(0)}억</td>
  <td>${s.gap}%</td>
  <td>${s.fear}%</td>
  <td>${s.type}</td>`;
  list.appendChild(tr);
 });
}

function renderDetail(){
 const t=new URLSearchParams(location.search).get("t");
 const s=analyzeSeryeok(sampleDB.find(x=>x.ticker===t));
 document.getElementById("detailContainer").innerHTML=`
 <h2>${s.ticker}</h2>
 <p>종합등급 ${s.grade} / 폭발확률 ${s.prob}% / 화력 ${s.power}</p>
 <p>세력평단 ${s.avg} / 괴리 ${s.gap}%</p>
 <p>공포 하방 ${s.fear}% / 구조 ${s.type}</p>

 <h3>폭발 시나리오</h3>
 <p>최저 ${(s.close*1.3).toFixed(2)}</p>
 <p>평균 ${(s.close*1.8).toFixed(2)}</p>
 <p>최고 ${(s.close*2.5).toFixed(2)}</p>

 <h3>종합 분석</h3>
 <p>최근 거래량 왜곡과 가격 억제가 동시에 관측됨. 
 현재 구간은 ${s.type} 단계로 판단되며,
 공포 유도 후 단기 변동성 확장 가능성 존재.</p>`;
}

function toggleSort(){
 sortKey=sortKey?"": "prob";
 renderMainList();
}

function confirmReset(){
 if(confirm("디폴트로 복구하시겠습니까?")) resetDefault();
}

function registerSW(){
 if('serviceWorker'in navigator)
 navigator.serviceWorker.register('service-worker.js');
}