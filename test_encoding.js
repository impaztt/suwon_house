import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function test() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  
  try {
    const decoder = new TextDecoder('euc-kr');
    const html = decoder.decode(buffer);
    const $ = cheerio.load(html);
    const count = $('div.Inner:contains("매매")').length;
    console.log("euc-kr decoding count:", count);
  } catch(e) {
    console.log("euc-kr failed", e);
  }

  try {
    const decoder = new TextDecoder('utf-8');
    const html = decoder.decode(buffer);
    const $ = cheerio.load(html);
    const count = $('div.Inner:contains("매매")').length;
    console.log("utf-8 decoding count:", count);
  } catch(e) {
    console.log("utf-8 failed", e);
  }
}
test();
