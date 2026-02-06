const dashboard = document.getElementById('dashboard');

function calculateSeryeokMetrics(stock){
  const gap = ((stock.current - stock.avgPrice)/stock.avgPrice*100).toFixed(1);
  let fearDown = 0;
  let structureType = '';
  let intentionScore = 0;
  let timeEfficiency = '';

  // 공포 하방 % (예시 로직)
  if(stock.current < stock.avgPrice) fearDown = Math.min(100, ((stock.avgPrice - stock.current)/stock.avgPrice*100).toFixed(1));

  // 구조 유형
  if(stock.current > stock.avgPrice) structureType = '매집+상단테스트';
  else if(stock.current < stock.avgPrice) structureType = '분배+하방방어';
  else structureType = '평가 중';

  // 의도 점수
  intentionScore = Math.min(100, (Math.abs(stock.current - stock.avgPrice)/stock.avgPrice*200).toFixed(0));

  // 시간 효용 (임시)
  timeEfficiency = stock.volume > 100000 ? '높음' : '보통';

  return {gap, fearDown, structureType, intentionScore, timeEfficiency};
}

async function fetchData(){
  try{
    const response = await fetch('data.json');
    const data = await response.json();

    if(!data || data.length === 0){
      dashboard.innerHTML = '<p>데이터가 없습니다.</p>';
      return;
    }

    let table = `<table>
      <tr>
        <th>Ticker</th>
        <th>전일종가</th>
        <th>현재가</th>
        <th>거래량</th>
        <th>평단</th>
        <th>주가/세력가 괴리(%)</th>
        <th>공포 하방(%)</th>
        <th>구조 유형</th>
        <th>의도 점수</th>
        <th>시간효용</th>
      </tr>`;

    data.forEach(stock => {
      const metrics = calculateSeryeokMetrics(stock);
      table += `<tr>
        <td>${stock.ticker}</td>
        <td>${stock.prevClose}</td>
        <td>${stock.current}</td>
        <td>${stock.volume}</td>
        <td>${stock.avgPrice}</td>
        <td>${metrics.gap}</td>
        <td>${metrics.fearDown}</td>
        <td>${metrics.structureType}</td>
        <td>${metrics.intentionScore}</td>
        <td>${metrics.timeEfficiency}</td>
      </tr>`;
    });

    table += '</table>';
    dashboard.innerHTML = table;

  }catch(err){
    dashboard.innerHTML = `<p>데이터 불러오기 실패: ${err}</p>`;
    console.error(err);
  }
}

window.addEventListener('load', fetchData);