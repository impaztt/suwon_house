import * as cheerio from 'cheerio';

async function run() {
  const rawUrl = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113000&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=30947&mseq=&xpos=126.9805533&ypos=37.29224&JMJ=';
  const url = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(rawUrl);
  const response = await fetch(url);
  const html = await response.text();
  
  const $ = cheerio.load(html);
  console.log("Body text:", $('body').text().substring(0, 1000));
  const areas = new Set();
  $('td.ScaleType .Inner').each((i, el) => {
    const text = $(el).contents().filter(function() {
      return this.nodeType === 3;
    }).text().trim();
    if (text) areas.add(text);
  });
  console.log("SK Areas:", Array.from(areas));
}
run();
