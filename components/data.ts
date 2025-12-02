export type ChecklistGroup = {
    title: string;
    items: string[];
  };
  
  export const dailyContentItems: ChecklistGroup[] = [
    {
      title: '일반 콘텐츠',
      items: ['일일 미션', '요일 던전 (알바)', '멤버십 알바'],
    },
    {
      title: '아이템샵 교환',
      items: [
        '[무료] 캐시의상 교환',
        '[골드] 조각난 보석 보물상자',
      ],
    },
    {
      title: '검은 구멍 & 소환의 경계',
      items: ['검은 구멍', '소환의 경계'],
    },
    {
      title: '식료품 구매',
      items: ['케이틴 (티르코네일)', '글라니스 (던바튼)'],
    },
    {
      title: '늑대의 숲 구역 보스',
      items: ['일반', '어려움', '매우 어려움'].map((lv) => `늑대의 숲 구역 보스 사냥 (${lv})`),
    },
    {
      title: '여신의 뜰 구역 보스',
      items: ['일반', '어려움', '매우 어려움'].map((lv) => `여신의 뜰 구역 보스 사냥 (${lv})`),
    },
    {
      title: '얼음 협곡 구역 보스',
      items: ['일반', '어려움', '매우 어려움'].map((lv) => `얼음 협곡 구역 보스 사냥 (${lv})`),
    },
  ];
  
  export const weeklyContentItems: ChecklistGroup[] = [
    {
      title: '주간 콘텐츠',
      items: ['주간 미션', '심층', '던전', '사냥터'],
    },
    {
      title: '필드 보스',
      items: ['페리', '크라브바', '크라마'].map((boss) => `필드 보스 (${boss})`),
    },
    {
      title: '어비스 던전',
      items: ['가라앉은 유적 ', '무너진 제단 ', '파멸의 전당 '].map((boss) => `어비스 던전 (${boss})`),
    },
    {
      title: '마물 퇴치 증표 교환',
      items: ['티르코네일 (던컨) 또는 던바튼 (에반)'],
    },
    {
      title: '임무 게시판 - 티르코네일',
      items: ['거미줄 (10)', '블러디 허브 (20)', '양털 (20)', '계란후라이 (5)'],
    },
    {
      title: '임무 게시판 - 던바튼',
      items: ['쑥쑥버섯 (20)', '우유 (10)', '철광석 (20)'],
    },
    {
      title: '임무 게시판 - 쿨헨',
      items: ['화살꽃 (20)', '달걀 (10)', '상급 통나무+ (20)'],
    },
  ];