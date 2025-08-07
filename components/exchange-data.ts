// 📁 exchange-data.ts (dailyExchangeItems with region)

export type ExchangeEntry = {
  npc: string;
  region: string;
  exchanges: string[];
};

export const dailyExchangeItems: ExchangeEntry[] = [
  {
    region: '티르코네일',
    npc: '퍼거스 (대장간)',
    exchanges: [
      '분해된 장비 부품 (10) → 석탄 (30)',
      '강철괴 (8) → 합금강괴 (4)',
    ],
  },
  {
    region: '티르코네일',
    npc: '알리사 (풍차)',
    exchanges: [
      '달걀 (10) → 연금술 부스러기',
      '라벤더 꽃 → 연금술 부스러기',
      '달걀 (3) → 밀가루',
      '라벤더 꽃 → 밀가루',
    ],
  },
  {
    region: '티르코네일',
    npc: '케이틴 (식료품점)',
    exchanges: [
      '우유 (10) → 케이틴 특제 통밀빵 (3) ',
    ],
  },
  {
    region: '티르코네일',
    npc: '메이븐 (성당)',
    exchanges: [
      '케이틴 특제 통밀빵 → 성수',
    ],
  },
  {
    region: '티르코네일',
    npc: '리사 (학교)',
    exchanges: [
      '사과주스 → 고급 연금술 촉매',
      '연금술 부스러기 (3) → 고급 연금술 촉매',
    ],
  },
  {
    region: '두갈드아일',
    npc: '트레이시',
    exchanges: [
      '통나무 (10) → 생가죽 (10)',
      '통나무 (100) → 상급 생가죽 (10)',
    ],
  },
  {
    region: '두갈드아일',
    npc: '엘빈',
    exchanges: [
      '야채볶음 (2) → 상급 목재 (8)',
    ],
  },
  {
    region: '던바튼',
    npc: '네리스 (무기점)',
    exchanges: [
      '동광석 (10) → 상급 생가죽 (10)',
      '합금강괴 (8) → 특수강괴 (4)',
    ],
  },
  {
    region: '던바튼',
    npc: '제롬 (의류점 앞)',
    exchanges: ['크림소스 스테이크 → 상급 실크 (4)'],
  },
  {
    region: '던바튼',
    npc: '제이미 (의류점 앞)',
    exchanges: [
      '사과 수플레 → 상급 옷감 (4)',
      '사과 생크림케이크(2) → 상급 옷감+ (8)',
    ],
  },
  {
    region: '던바튼',
    npc: '발터 (잡화점)',
    exchanges: ['참사랑어 (5) → 하트 토큰'],
  },
  {
    region: '던바튼',
    npc: '글라니스 (식료품점)',
    exchanges: ['생크림 (4) → 글라니스의 애플 밀크티'],
  },
  {
    region: '던바튼',
    npc: '마누스 (치료소)',
    exchanges: ['펫먹이 (20) → 생명의 마나석 (2)'],
  },
  {
    region: '던바튼',
    npc: '코너 (잡화점)',
    exchanges: ['초롱아귀 (5) → 폐허의 마나석'],
  },
];