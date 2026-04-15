import fetch from 'node-fetch';

async function test() {
  const mainUrl = 'https://land.bizmk.kr/';
  const mainRes = await fetch(mainUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    }
  });
  
  const cookies = mainRes.headers.raw()['set-cookie'];
  console.log("Cookies:", cookies);
  
  let cookieStr = '';
  if (cookies) {
    cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
  }
  
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&mgroup=A&mclass=A01%2CA02%2CA03&bdiv=S&areadiv=&aptcode=17612&scalecode=&mseq=&xpos=&ypos=&tab=1&listOrder=&siteOrder=1&JMJ=';
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Cookie': cookieStr,
      'Referer': mainUrl
    }
  });
  const buffer = await response.arrayBuffer();
  const html = new TextDecoder('utf-8').decode(buffer);
  
  if (html.includes('비정상적인 접근입니다')) {
    console.log("Blocked!");
  } else {
    console.log("Success! Length:", html.length);
  }
}
test();
