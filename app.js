document.getElementById('runScan').addEventListener('click', async () => {
  const data = await fetchScanData();
  updateTable(data);
  localStorage.setItem('lastScan', JSON.stringify(data));
});

async function fetchScanData() {
  return [
    {ticker:'ABCD', prev:1.24, curr:1.21, mcap:'50억', gap:'-2.41%', fear:10, structure:'매집', intent:0.70, utility:0.65},
    {ticker:'EFGH', prev:0.85, curr:0.83, mcap:'30억', gap:'-2.35%', fear:12, structure:'관리', intent:0.60, utility:0.55}
  ];
}

function updateTable(data){
  const tbody = document.querySelector('#topTable tbody');
  tbody.innerHTML = '';
  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.ticker}</td>
      <td>${item.prev}</td>
      <td>${item.curr} (${item.gap})</td>
      <td>${item.mcap}</td>
      <td>${item.gap}</td>
      <td>${item.fear}%</td>
      <td>${item.structure}</td>
      <td>${item.intent}</td>
      <td>${item.utility}</td>
    `;
    tbody.appendChild(tr);
  });
}

window.addEventListener('load', () => {
  const lastScan = localStorage.getItem('lastScan');
  if(lastScan){ updateTable(JSON.parse(lastScan)); }
});