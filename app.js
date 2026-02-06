const dashboard=document.getElementById('dashboard');
const analyzeBtn=document.getElementById('analyzeBtn');
const detailModal=document.getElementById('detailModal');
const detailTicker=document.getElementById('detailTicker');
const detailContent=document.getElementById('detailContent');
const closeDetail=document.getElementById('closeDetail');

async function fetchData(){
    try{
        const response=await fetch('data.json');
        return await response.json();
    }catch(err){
        dashboard.innerHTML='<p>데이터 불러오기 실패</p>';
        console.error(err);
        return [];
    }
}

function getSettings(){
    return {
        volPercent: Number(localStorage.getItem('volPercent')||500),
        priceGapPercent: Number(localStorage.getItem('priceGapPercent')||5),
        avgGapPercent: Number(localStorage.getItem('avgGapPercent')||5),
        fearBase: Number(localStorage.getItem('fearBase')||3)
    };
}

function calculateMetrics(stock, settings){
    const gap=((stock.current-stock.avgPrice)/stock.avgPrice*100).toFixed(1);
    let fearDown=0;
    let structureType='';
    let intentionScore=0;
    let timeEfficiency='';

    if(stock.current<stock.avgPrice) fearDown=Math.min(100,((stock.avgPrice-stock.current)/stock.avgPrice*100).toFixed(1));
    if(stock.current>stock.avgPrice) structureType='매집+상단테스트';
    else if(stock.current<stock.avgPrice) structureType='분배+하방방어';
    else structureType='평가중';
    intentionScore=Math.min(100,(Math.abs(stock.current-stock.avgPrice)/stock.avgPrice*200).toFixed(0));
    timeEfficiency=stock.volume>100000?'높음':'보통';

    return {gap,fearDown,structureType,intentionScore,timeEfficiency};
}

function renderTable(data){
    const settings=getSettings();
    let table=`<table>
        <tr>
            <th>Ticker</th>
            <th>전일종가</th>
            <th>현재가</th>
            <th>주가/세력가 괴리(%)</th>
            <th>공포 하방(%)</th>
            <th>구조 유형</th>
            <th>의도 점수</th>
            <th>시간효용</th>
        </tr>`;
    data.forEach(stock=>{
        const metrics=calculateMetrics(stock,settings);
        table+=`<tr data-ticker="${stock.ticker}" class="detailRow">
            <td>${stock.ticker}</td>
            <td>${stock.prevClose}</td>
            <td>${stock.current}</td>
            <td>${metrics.gap}</td>
            <td>${metrics.fearDown}</td>
            <td>${metrics.structureType}</td>
            <td>${metrics.intentionScore}</td>
            <td>${metrics.timeEfficiency}</td>
        </tr>`;
    });
    table+='</table>';
    dashboard.innerHTML=table;

    document.querySelectorAll('.detailRow').forEach(row=>{
        row.addEventListener('click',()=>{
            const ticker=row.dataset.ticker;
            showDetail(ticker,data);
        });
    });
}

function showDetail(ticker,data){
    const stock=data.find(s=>s.ticker===ticker);
    detailTicker.innerText=ticker+' 세부 정보';
    detailContent.innerHTML=`
        <p>전일종가: ${stock.prevClose}</p>
        <p>현재가: ${stock.current}</p>
        <p>거래량: ${stock.volume}</p>
        <p>세력평단: ${stock.avgPrice}</p>`;
    detailModal.style.display='block';
}

closeDetail.addEventListener('click',()=>detailModal.style.display='none');

analyzeBtn.addEventListener('click',async()=>{
    dashboard.innerHTML='<p>분석 중...</p>';
    const data=await fetchData();
    renderTable(data);
});

window.addEventListener('load',async()=>{
    const data=await fetchData();
    renderTable(data);
});