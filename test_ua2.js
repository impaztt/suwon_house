import fetch from 'node-fetch';

async function test() {
  const url = 'https://land.bizmk.kr/memul/list.php?bubcode=4111113300&aptcode=17612';
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    }
  });
  const buffer = await response.arrayBuffer();
  const html = new TextDecoder('utf-8').decode(buffer);
  
  if (html.includes('비정상적인 접근입니다')) {
    console.log("Blocked!");
  } else {
    console.log("Success!");
  }
}
test();
