const table = document.getElementById('resultTable');

document.getElementById('analyzeBtn').onclick = () => {
  table.innerHTML = '';
  mockData.forEach(d => {
    const r = analyzeStock(d);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><a href="detail.html?t=${d.ticker}">${d.ticker}</a></td>
      <td>${((d.price/d.avgPrice-1)*100).toFixed(1)}%</td>
      <td>${r.type}</td>
      <td>${r.grade}</td>
    `;
    table.appendChild(tr);
  });
};