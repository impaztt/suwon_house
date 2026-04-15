import fetch from 'node-fetch';

async function test() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url);
  console.log("Headers:", response.headers.raw());
  
  const buffer = await response.arrayBuffer();
  const buf = Buffer.from(buffer);
  
  console.log("First 100 bytes:", buf.slice(0, 100).toString('hex'));
  console.log("UTF-8:", buf.slice(0, 200).toString('utf-8'));
}
test();
