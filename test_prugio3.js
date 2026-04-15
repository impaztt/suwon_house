import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function test() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const html = new TextDecoder('euc-kr').decode(buffer);
  
  const $ = cheerio.load(html);
  console.log("Any listings?", $('tr').length);
  console.log("SaleType count:", $('td.SaleType').length);
  console.log("SaleType texts:", $('td.SaleType').map((i, el) => $(el).text().trim()).get());
}
test();
