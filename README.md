# 📘 MabiNote

> 마비노기 모바일 스타일의 주간/일일 콘텐츠 체크 앱  
> 개인 및 팀 단위의 콘텐츠 루틴 관리를 효율적으로 돕는 모바일 전용 유틸리티

---

## 🧩 주요 기능

- ✅ **일일/주간 콘텐츠 체크**
- ⭐ **즐겨찾기 등록 및 필터링**
- ⏰ **자동 초기화 (매일/매주 자정)**
- 🔍 **카테고리별 필터/정렬**
- 🧼 **UI 애니메이션 및 전환 효과 적용**
- 📱 **iOS/Android 양대 플랫폼 지원 (Expo 기반)**

---

## ⚙️ 기술 스택

| 항목       | 기술/도구               |
|------------|-------------------------|
| 프레임워크 | React Native + Expo     |
| 상태관리   | React Context / Hooks   |
| 네비게이션 | Expo Router (v2)        |
| 빌드       | EAS Build               |
| 애니메이션 | react-native-reanimated, expo-router/stack |
| 기타       | AsyncStorage, Gesture Handler 등 |

---

## 🚀 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npx expo start
```

### 3. 빌드 (EAS)

```bash
eas build --platform android
# 또는
eas build --platform ios
```

> `.env`, `eas.json` 등은 필요 시 별도 구성

---

## 📄 라이선스

MIT License

---

## ✍️ 개발자

- 조성진 [@github.com/Arkaltale](https://github.com/Arkaltale)
