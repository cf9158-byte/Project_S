window.addEventListener('load', () => {
  const dashboard = document.getElementById('dashboard');

  // 예시 데이터
  const data = [
    {ticker: 'ABCD', prevClose: 1.24, current: 1.21, marketCap: '150억', gap: '-2.41%', fearDown: '10%', structureType: 'A', intentionScore: 0.35, timeEfficiency: 0.8},
    {ticker: 'EFGH', prevClose: 0.95, current: 0.92, marketCap: '80억', gap: '-3.15%', fearDown: '12%', structureType: 'B', intentionScore: 0.30, timeEfficiency: 0.6}
  ];

  let table = '<table><tr><th>Ticker</th><th>전일종가</th><th>현재가</th><th>시총</th><th>주가/세력가 괴리</th><th>공포 하방</th><th>구조 유형</th><th>의도 점수</th><th>시간효용</th></tr>';

  data.forEach(row => {
    table += `<tr>
      <td>${row.ticker}</td>
      <td>${row.prevClose}</td>
      <td>${row.current} (${row.gap})</td>
      <td>${row.marketCap}</td>
      <td>${row.gap}</td>
      <td>${row.fearDown}</td>
      <td>${row.structureType}</td>
      <td>${row.intentionScore}</td>
      <td>${row.timeEfficiency}</td>
    </tr>`;
  });

  table += '</table>';
  dashboard.innerHTML = table;
});