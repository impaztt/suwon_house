const rawListings = [
  { listingId: 'M1', tradeType: '매매', confirmedDate: '24.03.01', complexName: '화서역푸르지오더에듀포레', areaTypeRaw: '84/59', supplyArea: 84, exclusiveArea: 59, priceText: '70,000', priceValue: 70000, buildingNo: '101동', floorRaw: '10/20', agencyName: '테스트부동산', description: '남향, 올수리', areaGroup: '25평형' },
  { listingId: 'M2', tradeType: '매매', confirmedDate: '24.03.02', complexName: '화서역푸르지오더에듀포레', areaTypeRaw: '110/84', supplyArea: 110, exclusiveArea: 84, priceText: '95,000', priceValue: 95000, buildingNo: '102동', floorRaw: '15/25', agencyName: '테스트부동산', description: '로얄층, 뷰좋음', areaGroup: '33평형' },
  { listingId: 'M3', tradeType: '매매', confirmedDate: '24.03.03', complexName: '화서역푸르지오더에듀포레', areaTypeRaw: '110/84', supplyArea: 110, exclusiveArea: 84, priceText: '88,000', priceValue: 88000, buildingNo: '103동', floorRaw: '2/25', agencyName: '테스트부동산', description: '급매', areaGroup: '33평형' },
  { listingId: 'M4', tradeType: '매매', confirmedDate: '24.03.04', complexName: '화서역푸르지오더에듀포레', areaTypeRaw: '130/101', supplyArea: 130, exclusiveArea: 101, priceText: '115,000', priceValue: 115000, buildingNo: '104동', floorRaw: '20/25', agencyName: '테스트부동산', description: '대형평수', areaGroup: '42평형' },
];

const selectedComplexes = ['화서역푸르지오더에듀포레'];

const seen = new Set();
const dedupedListings = [];

for (const item of rawListings) {
  const key = `${item.complexName}-${item.priceText}-${item.areaTypeRaw}-${item.buildingNo}-${item.floorRaw}`;
  if (!seen.has(key)) {
    seen.add(key);
    dedupedListings.push(item);
  }
}

const filteredListings = dedupedListings.filter(l => selectedComplexes.includes(l.complexName));

const groupedListings = {};
filteredListings.forEach((item) => {
  if (!groupedListings[item.areaGroup]) groupedListings[item.areaGroup] = [];
  groupedListings[item.areaGroup].push(item);
});

const groupOrder = ['25평형', '33평형', '42평형', '48평형', '55평형', '기타'];
const availableGroups = groupOrder.filter(g => groupedListings[g] && groupedListings[g].length > 0);

console.log("availableGroups:", availableGroups);
console.log("groupedListings keys:", Object.keys(groupedListings));
