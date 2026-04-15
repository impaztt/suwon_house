import * as cheerio from 'cheerio';

async function testPaginationLinks() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const html = new TextDecoder('utf-8').decode(buf);
  const $ = cheerio.load(html);
  
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && (href.includes('page') || href.includes('goPage'))) {
      console.log('Link:', href);
    }
  });
}
testPaginationLinks();
