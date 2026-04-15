export interface Listing {
  listingId: string;
  tradeType: string;
  confirmedDate: string;
  complexName: string;
  areaTypeRaw: string;
  supplyArea: number;
  exclusiveArea: number;
  priceText: string;
  priceValue: number; // 단위: 만원
  buildingNo: string;
  floorRaw: string;
  agencyName: string;
  description: string;
  areaGroup: string;
}

export interface Transaction {
  priceValue: number; // 단위: 만원
  contractDate: string; // 예: 2024.04.01
  exclusiveArea: number;
  floor: number;
  buildYear: number;
  aptName: string;
}

export interface TransactionSummary {
  areaGroup: string;
  recentPrice: number;
  maxPrice: number;
  minPrice: number;
  transactionCount: number;
  recentDate: string;
  recentTransactions: Transaction[];
}

