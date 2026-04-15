import fetch from 'node-fetch';

async function test() {
  const url = 'https://new.land.naver.com/api/articles/complex/17612?realEstateType=APT&tradeType=A1&rentPriceMin=0&rentPriceMax=900000000&priceMin=0&priceMax=900000000&areaMin=0&areaMax=900000000&oldBuildYears&recentlyBuildYears&minHouseHoldCount&maxHouseHoldCount&showArticle=false&sameAddressGroup=false&minMaintenanceCost&maxMaintenanceCost&priceType=RETAIL&direction=&page=1&complexNo=17612&buildingNos=&areaNos=&type=list&order=rank';
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Referer': 'https://new.land.naver.com/complexes/17612'
    }
  });
  
  console.log("Status:", response.status);
  const data = await response.json();
  console.log("Data:", data.articleList ? data.articleList.length : "No articleList");
  if (data.articleList && data.articleList.length > 0) {
    console.log("First item:", data.articleList[0]);
  }
}
test();
