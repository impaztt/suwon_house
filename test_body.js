import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function test() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const html = new TextDecoder('utf-8').decode(buffer);
  
  const $ = cheerio.load(html);
  
  // Find tables
  console.log("Tables:");
  $('table').each((i, el) => {
    console.log(`Table ${i} class:`, $(el).attr('class'));
  });
  
  // Find any text containing "매매"
  console.log("매매 in body:", $('body').text().includes('매매'));
  
  // Dump a bit of the body
  console.log("Body length:", $('body').html()?.length);
  
  // Maybe it's in an iframe or loaded via JS?
  console.log("Iframes:", $('iframe').length);
}
test();
