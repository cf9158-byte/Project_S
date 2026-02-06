function renderMainList() {
  const list = document.getElementById("stockList");
  document.getElementById("dateLabel").innerText =
    new Date().toLocaleDateString();

  sampleDB.map(analyzeSeryeok).forEach(s => {
    const tr = document.createElement("tr");
    tr.onclick = () => location.href = `detail.html?t=${s.ticker}`;
    tr.innerHTML = `
      <td>${s.ticker}</td>
      <td>${s.close}</td>
      <td>${((s.close-s.prev)/s.prev*100).toFixed(2)}%</td>
      <td>${s.avgCost}</td>
      <td>${s.gap}%</td>
      <td>${s.probability}%</td>
      <td>${s.grade}</td>
    `;
    list.appendChild(tr);
  });
}

function renderDetail() {
  const ticker = new URLSearchParams(location.search).get("t");
  const stock = analyzeSeryeok(sampleDB.find(s=>s.ticker===ticker));
  document.getElementById("detailContainer").innerHTML = `
    <h2>${stock.ticker}</h2>
    <p>세력 평단: ${stock.avgCost}</p>
    <p>괴리율: ${stock.gap}%</p>
    <p>폭발 확률: ${stock.probability}%</p>
    <p>등급: ${stock.grade}</p>
  `;
}

function setFont(level) {
  const size = [12,13,14,16,18][level-1];
  document.documentElement.style.setProperty("--font-size", size+"px");
}

function resetDefault() {
  setFont(3);
}

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
}