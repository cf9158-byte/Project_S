function analyzeStock(d) {
  let score = 0;
  let type = '위험';

  if (d.accumulation && d.flatDays > 10) score += 2;
  if (d.volumeSpike >= 5 && d.range <= 5) score += 3;
  if (d.lowBreak && d.volumeLow) score += 2;

  if (d.afterAbnormal) score += 1;
  if (d.lowVolumeDefense) score += 2;
  if (d.fixedRange) score += 1;

  if (score >= 8) type = '매집관리';
  else if (score >= 6) type = '재폭발대기';
  else if (score >= 4) type = '상단테스트';
  else if (score >= 2) type = '하방공포유도';

  const grade = score >= 8 ? 'S' : score >= 6 ? 'A' : score >= 4 ? 'B' : 'C';

  return {
    type,
    grade,
    probability: Math.min(90, score * 10),
    timing: score >= 6 ? '1~3일' : '지연',
    size: grade,
    target: {
      min: (d.price * 1.2).toFixed(2),
      avg: (d.price * 1.6).toFixed(2),
      max: (d.price * 2.2).toFixed(2)
    },
    avg: d.avgPrice,
    fearDrop: score < 4 ? 15 : 5,
    confidence: score * 10
  };
}