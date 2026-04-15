import fetch from 'node-fetch';

async function test() {
  const url = 'https://m.land.naver.com/complex/getComplexArticleList';
  const params = new URLSearchParams({
    hscpNo: '17612',
    tradTpCd: 'A1',
    order: 'point_',
    showR0: 'N'
  });
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${url}?${params.toString()}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36',
        'Referer': 'https://m.land.naver.com/'
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    const data = await response.json();
    console.log("Success! Items:", data.result.list.length);
    if (data.result.list.length > 0) {
      console.log(data.result.list[0].atclNm, data.result.list[0].prc);
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}
test();
