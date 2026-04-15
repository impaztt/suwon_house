import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function run() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'Referer': 'https://land.bizmk.kr/'
    }
  });
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder('euc-kr');
  const html = decoder.decode(buffer);
  
  const $ = cheerio.load(html);
  console.log("Body text:", $('body').text().substring(0, 1000));
  console.log("Total TRs:", $('tr').length);
  console.log("매매 count:", $('div.Inner:contains("매매")').length);
  
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
