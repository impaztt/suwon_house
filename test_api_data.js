import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

async function test() {
  const apiKey = '00c7de1fcb5a962f0988cc8542399cd4a564e26fa695b391e88ffcb67debaa53';
  const lawdCd = '41111';
  const months = ['202604', '202603', '202602', '202601'];
  
  for (const dealYmd of months) {
    const url = `http://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev?serviceKey=${apiKey}&pageNo=1&numOfRows=1000&LAWD_CD=${lawdCd}&DEAL_YMD=${dealYmd}`;
    const res = await fetch(url);
    const xml = await res.text();
    try {
      const result = await parseStringPromise(xml, { explicitArray: false });
      let items = result?.response?.body?.items?.item;
      if (items) {
        items = Array.isArray(items) ? items : [items];
        const filtered = items.filter(i => i.aptNm && i.aptNm.replace(/\s/g, '').includes('푸르지오더에듀포레'));
        console.log(`--- ${dealYmd} ---`);
        filtered.forEach(i => {
          console.log(`${i.dealYear}.${i.dealMonth}.${i.dealDay} | ${i.excluUseAr}㎡ | ${i.dealAmount}만원`);
        });
      }
    } catch (e) {
      console.error('Parse error for', dealYmd);
    }
  }
}
test();
