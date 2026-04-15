import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function run() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder('utf-8');
  const html = decoder.decode(buffer);
  
  console.log("Length of HTML:", html.length);
  console.log(html.substring(0, 500));
  
  const $ = cheerio.load(html);
  const rows = $('tr').length;
  console.log("Total TRs:", rows);
  
  const saleTypes = [];
  $('td.SaleType .Inner').each((i, el) => {
      saleTypes.push($(el).text().trim());
  });
  console.log("Sale Types:", [...new Set(saleTypes)]);
}
run();
