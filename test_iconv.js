import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

async function test() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  
  const html = iconv.decode(Buffer.from(buffer), 'euc-kr');
  const $ = cheerio.load(html);
  
  console.log("Title:", $('title').text());
  console.log("Rows:", $('table.memul_list tbody tr').length);
  
  const firstRow = $('table.memul_list tbody tr').first();
  console.log("First row text:", firstRow.text().trim().replace(/\s+/g, ' '));
  
  console.log("매매 count:", $('div.Inner:contains("매매")').length);
}
test();
