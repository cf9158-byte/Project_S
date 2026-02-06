const sampleDB = Array.from({length:30},(_,i)=>({
 ticker:`TST${i+1}`,
 prev:1+Math.random(),
 close:1+Math.random(),
 prices:Array.from({length:10},()=>1+Math.random()),
 volumes:Array.from({length:10},()=>5+Math.random()*50),
 mcap:Math.floor(200+Math.random()*800)*1e9,
 daysSinceVolume:Math.floor(Math.random()*10)
}));

function analyzeSeryeok(s){
 const avg=s.prices.reduce((a,b)=>a+b)/s.prices.length;
 const gap=((s.close-avg)/avg)*100;
 const volSpike=Math.max(...s.volumes)/s.volumes[0];
 const range=Math.abs(s.close-s.prev)/s.prev*100;

 let prob=0;
 if(volSpike>5) prob+=30;
 if(range<5) prob+=25;
 if(gap<-5) prob+=25;
 if(s.daysSinceVolume<3) prob+=20;

 const grade=prob>80?"S":prob>65?"A":prob>50?"B":"C";
 const power=prob>75?"S":prob>60?"A":prob>45?"B":"C";

 const fear=Math.max(0,Math.abs(gap)*0.6);

 const type =
   prob>70 && gap<0 ? "관리" :
   prob>55 ? "재매집" : "위험";

 return {...s,avg:avg.toFixed(2),gap:gap.toFixed(1),
 prob,power,fear:fear.toFixed(1),type,grade};
}