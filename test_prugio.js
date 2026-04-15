import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function run() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder('utf-8');
  const html = decoder.decode(buffer);
  const $ = cheerio.load(html);
  
  const areas = [];
  $('div.Inner:contains("매매")').each((i, el) => {
    const row1 = $(el).closest('tr');
    if (!row1.find('td.SaleType').length) return;
    const areaTypeRaw = row1.find('td.ScaleType .Inner').contents().filter(function() {
      return this.nodeType === 3;
    }).text().trim();
    areas.push(areaTypeRaw);
  });
  console.log('Prugio Areas:', [...new Set(areas)]);
}
run();
