import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function test() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const html = new TextDecoder('utf-8').decode(buffer);
  
  const $ = cheerio.load(html);
  console.log("매매 count:", $('div.Inner:contains("매매")').length);
  console.log("table rows:", $('table.memul_list tbody tr').length);
  console.log("table exists:", $('table.memul_list').length);
  
  // Print some of the HTML to see what's there
  console.log("HTML snippet:", html.substring(0, 500));
}
test();
