const sampleDB = [
  {
    ticker: "AZTR",
    prices: [1.21,1.20,1.19,1.20,1.19],
    volumes: [10,9,8,40,9],
    close: 1.19,
    prev: 1.20
  },
  {
    ticker: "POLA",
    prices: [1.42,1.40,1.39,1.40,1.38],
    volumes: [8,7,6,50,6],
    close: 1.38,
    prev: 1.40
  }
];

function analyzeSeryeok(stock) {
  const volSpike = Math.max(...stock.volumes) / stock.volumes[0];
  const priceRange = Math.abs(stock.close - stock.prev) / stock.prev * 100;

  const accumulation = volSpike > 5 && priceRange < 5;
  const avgCost = stock.prices.reduce((a,b)=>a+b)/stock.prices.length;
  const gap = ((stock.close - avgCost) / avgCost) * 100;

  let probability = 0;
  if (accumulation) probability += 40;
  if (gap < -5) probability += 30;
  if (priceRange < 3) probability += 20;

  const grade =
    probability > 80 ? "S" :
    probability > 65 ? "A" :
    probability > 50 ? "B" : "C";

  return {
    ...stock,
    avgCost: avgCost.toFixed(2),
    gap: gap.toFixed(1),
    probability,
    grade
  };
}