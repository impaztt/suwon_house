/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, RefreshCw, CheckCircle2, TrendingUp, Calendar, X, Search } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { mockListings } from './data';
import { Listing, TransactionSummary } from './types';

// --- Utils ---
const formatPrice = (manwon: number) => {
  const uk = Math.floor(manwon / 10000);
  const remainder = manwon % 10000;
  if (remainder === 0) return `${uk}억`;
  return `${(manwon / 10000).toFixed(2).replace(/\.?0+$/, '')}억`;
};

// --- Components ---

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white px-6 pt-20 pb-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-toss-blue" />
        </div>
        <h2 className="text-sm font-semibold text-toss-blue mb-3 tracking-wide">
          화서역푸르지오더에듀포레
        </h2>
        <h1 className="text-3xl font-bold text-toss-text leading-tight mb-4 break-keep">
          현재 매물 흐름을<br />빠르게 확인해보세요
        </h1>
        <p className="text-toss-subtext text-base leading-relaxed break-keep">
          매물 현황을 한눈에 보고<br />평형별로 바로 비교할 수 있어요.
        </p>
      </div>
      <button
        onClick={onStart}
        className="w-full bg-toss-blue text-white font-semibold text-lg py-4 rounded-2xl active:scale-[0.98] transition-transform"
      >
        시작하기
      </button>
    </div>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  const isPrugio = listing.complexName.includes('푸르지오');
  
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isPrugio ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
            {isPrugio ? '푸르지오' : 'SK'}
          </span>
          <span className="text-lg font-bold text-toss-text">
            {formatPrice(listing.priceValue)}
          </span>
        </div>
        {/* Optional Badge */}
        <span className="text-[10px] font-medium bg-blue-50 text-toss-blue px-2 py-0.5 rounded-full">
          확인매물
        </span>
      </div>
      <div className="text-[15px] text-toss-text font-medium mb-1.5 tracking-tight">
        {listing.areaTypeRaw} <span className="text-gray-300 mx-1">·</span> {listing.buildingNo} <span className="text-gray-300 mx-1">·</span> {listing.floorRaw}
      </div>
      <div className="text-xs text-toss-subtext mb-2 flex items-center">
        <span>{listing.confirmedDate} 확인</span>
        <span className="text-gray-300 mx-1.5">|</span>
        <span>{listing.agencyName}</span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2 leading-snug">
        {listing.description}
      </p>
    </div>
  );
}

function TransactionSummaryBox({ summary }: { summary?: TransactionSummary }) {
  if (!summary) {
    return (
      <div className="bg-gray-50 rounded-xl p-4 mb-4 text-center">
        <p className="text-sm text-toss-subtext">최근 실거래가 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-toss-blue" />
        <h3 className="text-sm font-bold text-toss-text">실거래가 요약</h3>
        <span className="text-xs text-toss-subtext ml-auto">최근 {summary.transactionCount}건 기준</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white p-2 rounded-lg shadow-sm text-center">
          <p className="text-[10px] text-toss-subtext mb-0.5">최근 거래가</p>
          <p className="text-sm font-bold text-toss-blue">{formatPrice(summary.recentPrice)}</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-sm text-center">
          <p className="text-[10px] text-toss-subtext mb-0.5">최고가</p>
          <p className="text-sm font-bold text-toss-text">{formatPrice(summary.maxPrice)}</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-sm text-center">
          <p className="text-[10px] text-toss-subtext mb-0.5">최저가</p>
          <p className="text-sm font-bold text-toss-text">{formatPrice(summary.minPrice)}</p>
        </div>
      </div>

      {summary.recentTransactions.length > 0 && (
        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs font-medium text-toss-subtext mb-2 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> 최근 거래 내역
          </p>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {summary.recentTransactions.map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-toss-subtext">{tx.contractDate}</span>
                <span className="text-toss-subtext">{tx.floor}층</span>
                <span className="font-medium text-toss-text">{formatPrice(tx.priceValue)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const FLOOR_PLANS: Record<string, { name: string; url: string }[]> = {
  '25평형': [
    { name: '25평형', url: 'https://landthumb-phinf.pstatic.net/20120309_262/hscp_img_1331279293067CijRL_JPEG/GW70711_1331279289292.jpg?type=m1024' }
  ],
  '33평형': [
    { name: '109D', url: 'https://landthumb-phinf.pstatic.net/20120309_77/hscp_img_1331279420292Ie0ll_JPEG/GW70711_1331279418563.jpg?type=m1024' },
    { name: '110E', url: 'https://landthumb-phinf.pstatic.net/20130314_13/hscp_img_1363243629762zOfGF_JPEG/photoinfra_1363243629151.jpg?type=m1024' },
    { name: '110C', url: 'https://landthumb-phinf.pstatic.net/20120309_134/hscp_img_1331279378586cPHsY_JPEG/GW70711_1331279372628.jpg?type=m1024' },
    { name: '111A', url: 'https://landthumb-phinf.pstatic.net/20190304_139/hscp_img_15516693621983iatz_JPEG/photoinfra_1551669361980.jpg?type=m1024' },
    { name: '112B', url: 'https://landthumb-phinf.pstatic.net/20190304_54/hscp_img_1551669352952FoLRC_JPEG/photoinfra_1551669352574.jpg?type=m1024' }
  ],
  '42평형': [
    { name: '141A', url: 'https://landthumb-phinf.pstatic.net/20120309_226/hscp_img_1331279446357dkoCg_JPEG/GW70711_1331279444563.jpg?type=m1024' },
    { name: '141B', url: 'https://landthumb-phinf.pstatic.net/20220622_97/hscp_img_1655891749816CUeTd_JPEG/photoinfra_1655891749275.jpg?type=m1024' },
    { name: '141C', url: 'https://landthumb-phinf.pstatic.net/20120224_55/hscp_img_1330077136604pJDTk_JPEG/GW10081_1330077135159.jpg?type=m1024' }
  ],
  '48평형': [
    { name: '160C', url: 'https://landthumb-phinf.pstatic.net/20120309_43/hscp_img_1331279677399XpJs3_JPEG/GW70711_1331279675709.jpg?type=m1024' },
    { name: '161A', url: 'https://landthumb-phinf.pstatic.net/20120224_158/hscp_img_13300771537072SuOC_JPEG/GW10081_1330077152370.jpg?type=m1024' },
    { name: '161B', url: 'https://landthumb-phinf.pstatic.net/20120224_151/hscp_img_1330077181792wkSfe_JPEG/GW10081_1330077180367.jpg?type=m1024' }
  ],
  '55평형': [
    { name: '182A', url: 'https://landthumb-phinf.pstatic.net/20120309_49/hscp_img_1331279693664WQdeD_JPEG/GW70711_1331279692341.jpg?type=m1024' },
    { name: '182B', url: 'https://landthumb-phinf.pstatic.net/20120309_258/hscp_img_13312797132592T3F7_JPEG/GW70711_1331279711698.jpg?type=m1024' }
  ]
};

function AccordionSection({
  groupName,
  listings,
  transactionSummary,
  onImageClick,
}: {
  groupName: string;
  listings: Listing[];
  transactionSummary?: TransactionSummary;
  onImageClick: (url: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'listings' | 'floorplan'>('listings');

  const minPrice = Math.min(...listings.map((l) => l.priceValue));
  const maxPrice = Math.max(...listings.map((l) => l.priceValue));

  return (
    <div className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-5 flex items-center justify-between bg-white active:bg-gray-50 transition-colors"
      >
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-toss-text">{groupName}</h3>
            <span className="text-sm font-medium text-toss-blue bg-blue-50 px-2 py-0.5 rounded-full">
              {listings.length}건
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-toss-subtext mt-1">
            <span className="text-[10px] font-bold text-white bg-blue-500 px-1.5 py-0.5 rounded">호가</span>
            <span>최저 {formatPrice(minPrice)} <span className="mx-1">·</span> 최고 {formatPrice(maxPrice)}</span>
          </div>
        </div>
        <div className="text-gray-400">
          {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-2 pt-1 border-t border-gray-50">
              {/* 탭 메뉴 */}
              <div className="flex p-1 bg-gray-100 rounded-lg mb-4">
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'listings' ? 'bg-white text-toss-text shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  매물 및 실거래가
                </button>
                <button
                  onClick={() => setActiveTab('floorplan')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'floorplan' ? 'bg-white text-toss-text shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  평면도
                </button>
              </div>

              {activeTab === 'listings' ? (
                <>
                  <TransactionSummaryBox summary={transactionSummary} />
                  {listings.map((listing) => (
                    <ListingCard key={listing.listingId} listing={listing} />
                  ))}
                </>
              ) : (
                <div className="flex flex-col gap-4 mb-4">
                  {FLOOR_PLANS[groupName] ? (
                    FLOOR_PLANS[groupName].map((plan, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                          <h4 className="text-sm font-bold text-toss-text">{plan.name}</h4>
                        </div>
                        <div className="p-4 flex justify-center bg-white cursor-pointer" onClick={() => onImageClick(plan.url)}>
                          <img 
                            src={plan.url} 
                            alt={`${groupName} ${plan.name} 평면도`} 
                            className="max-w-full h-auto object-contain hover:opacity-90 transition-opacity"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full aspect-[4/3] bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center p-4">
                      <svg className="w-16 h-16 text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9M14 3v6" />
                        <path d="M15 15h6M9 15h6" />
                      </svg>
                      <p className="text-gray-500 font-medium">{groupName} 평면도</p>
                      <p className="text-xs text-gray-400 mt-1 text-center">현재 단지의 평면도 이미지를<br/>준비 중입니다.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DashboardScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rawListings, setRawListings] = useState<Listing[]>([]);
  const [transactions, setTransactions] = useState<Record<string, TransactionSummary>>({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedComplexes, setSelectedComplexes] = useState<string[]>(['화서역푸르지오더에듀포레']);

  const fetchData = async () => {
    setError(null);
    try {
      const [listingsRes, transactionsRes] = await Promise.all([
        fetch('/api/listings'),
        fetch('/api/transactions')
      ]);

      if (!listingsRes.ok || !transactionsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const listingsData = await listingsRes.json();
      const transactionsData = await transactionsRes.json();

      setRawListings(listingsData);
      setTransactions(transactionsData);
    } catch (err) {
      console.error(err);
      setError('정보를 불러오지 못했어요');
    }
  };

  // Fetch on mount with progress bar
  React.useEffect(() => {
    const startTime = Date.now();
    const duration = 10000; // 10 seconds
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 95); // Cap at 95%
      setProgress(newProgress);
    }, 100);

    fetchData().then(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setIsInitialLoading(false), 400); // Wait a bit for 100% animation
    });

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  // 1. Deduplication Logic
  const { dedupedListings, totalRawCount } = useMemo(() => {
    const seen = new Set<string>();
    const deduped: Listing[] = [];

    for (const item of rawListings) {
      // 중복 제거 키 강화: 단지명 + 가격 + 면적 + 동 + 층 + 설명글 앞 10자
      const descSnippet = item.description.substring(0, 10).replace(/\s/g, '');
      const key = `${item.complexName}-${item.priceValue}-${item.areaTypeRaw}-${item.buildingNo}-${item.floorRaw}-${descSnippet}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(item);
      }
    }
    return { dedupedListings: deduped, totalRawCount: rawListings.length };
  }, [rawListings]);

  // Filter by selected complexes
  const filteredListings = useMemo(() => {
    return dedupedListings.filter(l => selectedComplexes.includes(l.complexName));
  }, [dedupedListings, selectedComplexes]);

  // 2. Grouping & Sorting Logic
  const groupedListings = useMemo(() => {
    const groups: Record<string, Listing[]> = {};
    
    filteredListings.forEach((item) => {
      if (!groups[item.areaGroup]) groups[item.areaGroup] = [];
      groups[item.areaGroup].push(item);
    });

    // Sort each group
    Object.values(groups).forEach((list) => {
      list.sort((a, b) => {
        // 1. 매물가 오름차순
        if (a.priceValue !== b.priceValue) return a.priceValue - b.priceValue;
        // 2. 면적 타입 원문 오름차순
        if (a.areaTypeRaw !== b.areaTypeRaw) return a.areaTypeRaw.localeCompare(b.areaTypeRaw);
        // 3. 동 오름차순
        if (a.buildingNo !== b.buildingNo) return a.buildingNo.localeCompare(b.buildingNo);
        // 4. 층 원문 오름차순
        return a.floorRaw.localeCompare(b.floorRaw);
      });
    });

    return groups;
  }, [filteredListings]);

  const globalMinPrice = useMemo(() => {
    if (selectedComplexes.length === 0) return 0;
    const activeListings = dedupedListings.filter(l => selectedComplexes.includes(l.complexName));
    return activeListings.length > 0 ? Math.min(...activeListings.map(l => l.priceValue)) : 0;
  }, [dedupedListings, selectedComplexes]);

  const globalMaxPrice = useMemo(() => {
    if (selectedComplexes.length === 0) return 0;
    const activeListings = dedupedListings.filter(l => selectedComplexes.includes(l.complexName));
    return activeListings.length > 0 ? Math.max(...activeListings.map(l => l.priceValue)) : 0;
  }, [dedupedListings, selectedComplexes]);

  // Define group order
  const groupOrder = ['25평형', '33평형', '42평형', '48평형', '55평형', '기타'];
  const availableGroups = groupOrder.filter(g => groupedListings[g] && groupedListings[g].length > 0);

  const groupStats = useMemo(() => {
    return availableGroups.map(group => {
      const groupListings = groupedListings[group];
      
      const complexes = selectedComplexes.map(complexName => {
        const cListings = groupListings.filter(l => l.complexName === complexName);
        if (cListings.length === 0) return null;
        return {
          complexName,
          min: Math.min(...cListings.map(l => l.priceValue)),
          max: Math.max(...cListings.map(l => l.priceValue)),
          count: cListings.length
        };
      }).filter(Boolean) as { complexName: string; min: number; max: number; count: number }[];

      return { group, complexes };
    });
  }, [availableGroups, groupedListings, selectedComplexes]);

  const priceRange = globalMaxPrice - globalMinPrice || 1;

  if (isInitialLoading) {
    return (
      <div className="flex flex-col h-full bg-white px-6 items-center justify-center text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <RefreshCw className="w-8 h-8 text-toss-blue animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-toss-text mb-8">실시간 매물 정보를<br/>수집하고 있어요</h2>
        
        <div className="w-full max-w-xs bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
          <motion.div 
            className="bg-toss-blue h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
        
        <p className="text-sm text-toss-subtext leading-relaxed">
          모든 페이지를 확인하여 중복을 제거합니다.<br/>
          (예상 대기시간: 약 10초)
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-toss-bg overflow-y-auto">
      {error && (
        <div className="bg-red-100 text-red-700 p-4 text-center">
          {error}
        </div>
      )}
      {/* Header */}
      <header className="sticky top-0 z-10 bg-toss-bg/80 backdrop-blur-md px-5 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-toss-text">단지 비교 대시보드</h1>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 -mr-2 rounded-full active:bg-gray-200 transition-colors text-gray-500 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </header>

      <main className="px-5 pb-10">
        {/* Live Title Section */}
        <div className="mt-2 mb-6">
          <h2 className="text-2xl font-extrabold text-toss-text flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live 실시간 매물
          </h2>
          <p className="text-sm text-toss-subtext mt-1">현재 등록된 실제 매물 호가 정보입니다.</p>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-toss-text font-medium mb-2">{error}</p>
            <button 
              onClick={handleRefresh}
              className="text-toss-blue text-sm font-medium px-4 py-2 bg-blue-50 rounded-lg"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <>
            {/* Complex Selection Checkboxes */}
            <div className="flex flex-col mb-4">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { name: '화서역푸르지오더에듀포레', color: 'bg-emerald-600', borderColor: 'border-emerald-600', textColor: 'text-emerald-700' },
                  { name: 'SK스카이뷰', color: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-600' }
                ].map(complex => (
                  <label key={complex.name} className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-colors whitespace-nowrap ${selectedComplexes.includes(complex.name) ? `${complex.borderColor} bg-white shadow-sm` : 'border-gray-200 bg-gray-50 opacity-60'}`}>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedComplexes.includes(complex.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedComplexes([...selectedComplexes, complex.name]);
                        } else {
                          setSelectedComplexes(selectedComplexes.filter(c => c !== complex.name));
                        }
                      }}
                    />
                    <div className={`w-3 h-3 rounded-full ${complex.color}`}></div>
                    <span className={`text-sm font-bold ${selectedComplexes.includes(complex.name) ? complex.textColor : 'text-gray-500'}`}>{complex.name}</span>
                  </label>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 px-1 mt-1">※ SK스카이뷰 펜트/테라스(P, T) 타입은 시세 통계에서 제외되었습니다.</p>
            </div>

            {/* Price Range by Area */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 mb-6">
              <h3 className="text-base font-bold text-toss-text mb-5">평형별 호가 범위</h3>
              <div className="space-y-6">
                {groupStats.map(stat => (
                  <div key={stat.group} className="relative">
                    <div className="mb-3 font-bold text-sm text-toss-text bg-gray-50 px-3 py-1.5 rounded-lg inline-block">{stat.group}</div>
                    <div className="space-y-4">
                      {stat.complexes.map(cStat => {
                        const leftPercent = ((cStat.min - globalMinPrice) / priceRange) * 100;
                        const widthPercent = Math.max(2, ((cStat.max - cStat.min) / priceRange) * 100);
                        const isPrugio = cStat.complexName.includes('푸르지오');
                        const colorClass = isPrugio ? 'from-emerald-500 to-emerald-600' : 'from-red-400 to-red-500';
                        const badgeClass = isPrugio ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500';
                        const shortName = isPrugio ? '푸르지오' : 'SK스카이뷰';
                        
                        return (
                          <div key={cStat.complexName} className="relative">
                            <div className="flex justify-between items-end mb-2">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-sm text-toss-text">{shortName}</span>
                                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${badgeClass}`}>{cStat.count}건</span>
                              </div>
                              <span className="font-bold text-sm text-toss-text">
                                {cStat.min === cStat.max ? formatPrice(cStat.min) : `${formatPrice(cStat.min)} ~ ${formatPrice(cStat.max)}`}
                              </span>
                            </div>
                            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
                              <div 
                                className={`absolute h-full bg-gradient-to-r ${colorClass} rounded-full`}
                                style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {availableGroups.length > 0 ? (
                availableGroups.map((group) => (
                  <AccordionSection
                    key={group}
                    groupName={group}
                    listings={groupedListings[group]}
                    transactionSummary={transactions[group]}
                    onImageClick={setSelectedImage}
                  />
                ))
              ) : (
                <div className="text-center py-20 text-toss-subtext">
                  현재 표시할 매물이 없어요
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          >
            <div className="flex justify-end p-4 z-50">
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden flex items-center justify-center">
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
              >
                <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                  <img 
                    src={selectedImage} 
                    alt="평면도 원본" 
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
            <div className="p-6 text-center text-white/60 text-sm">
              두 손가락으로 확대/축소할 수 있습니다
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-200">
      {/* Mobile Container Simulator */}
      <div className="w-full max-w-md bg-white h-screen sm:h-[100dvh] shadow-2xl relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20"
            >
              <StartScreen onStart={() => setStarted(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10"
            >
              <DashboardScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
