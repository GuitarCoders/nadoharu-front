# Pull-to-Refresh Component Specification

## 📖 Overview

React 기반의 pull-to-refresh 컴포넌트로, 모바일 친화적인 새로고침 기능을 제공합니다.
Hero Icons의 ArrowPathIcon과 Framer Motion을 사용하여 부드러운 애니메이션을 구현합니다.

## 🎯 Features

### Core Functionality

- **터치 기반 Pull 동작**: 스크롤 최상단에서 아래로 당기기
- **시각적 피드백**: 보라색 그라데이션 배경과 회전 아이콘
- **임계값 기반 트리거**: 100px 이상 당기면 새로고침 실행
- **부드러운 애니메이션**: Spring 기반 자연스러운 움직임
- **모바일 최적화**: Native 브라우저 새로고침 방지

### Visual Elements

- **배경**: 당기는 정도에 따라 투명도가 변하는 보라색 그라데이션
- **아이콘**: Hero Icons의 ArrowPath (회전 및 스케일 애니메이션)
- **색상 변화**: 임계값 도달 시 아이콘 색상 변경
- **페이드 효과**: 복귀 시 아이콘 먼저 페이드아웃

## 🏗️ Architecture

### State Management

```typescript
interface PullState {
  isRefreshing: boolean; // 새로고침 진행 상태
  showIcon: boolean; // 아이콘 표시 여부
  distance: number; // 당긴 거리 (px)
  startY: number; // 터치 시작 Y 좌표
  isDragging: boolean; // 드래그 중 여부
}
```

### Constants

```typescript
const PULL_THRESHOLD = 100; // 새로고침 트리거 거리
const MAX_PULL_DISTANCE = 100; // 최대 당길 수 있는 거리
const REFRESH_OFFSET = 60; // 새로고침 중 컨텐츠 고정 위치
const ANIMATION_DURATION = {
  iconFadeOut: 200, // 아이콘 페이드아웃 시간
  returnToPosition: 400, // 복귀 애니메이션 시간
  opacityTransition: 0.2, // 투명도 전환 시간
};
```

## 🔄 Animation Flow

### 1. Pull Phase (당기기)

```
터치 시작 → 드래그 감지 → 거리 계산 → 실시간 위치 업데이트
└── 아이콘 표시 (거리 > 0)
└── 배경 투명도 증가 (거리 / 임계값)
└── 아이콘 회전/스케일 (거리 / 임계값)
```

### 2. Refresh Phase (새로고침)

```
임계값 도달 → 새로고침 트리거 → 로딩 상태
└── 아이콘 무한 회전
└── 컨텐츠 고정 위치 (60px)
└── onRefresh() 콜백 실행
```

### 3. Return Phase (복귀)

```
새로고침 완료 → 3단계 복귀 애니메이션
├── Phase 1: 아이콘 페이드아웃 (200ms)
├── Phase 2: 배경 + 컨텐츠 동시 복귀 (400ms)
└── Phase 3: 상태 초기화
```

## 📱 Touch Event Handling

### Event Registration

```typescript
// passive: false로 등록하여 preventDefault() 활성화
container.addEventListener("touchstart", handleTouchStart, { passive: false });
container.addEventListener("touchmove", handleTouchMove, { passive: false });
container.addEventListener("touchend", handleTouchEnd, { passive: false });
```

### Pull Calculation

```typescript
const deltaY = currentY - startY;
const pullDistance = Math.min(deltaY * 0.6, MAX_PULL_DISTANCE);
```

- **감쇠 계수**: 0.6 (실제 터치 거리의 60%만 반영)
- **최대 제한**: 100px로 제한하여 과도한 당기기 방지

### Browser Compatibility

```css
overscroll-behavior: contain; /* 브라우저 기본 새로고침 방지 */
-webkit-overflow-scrolling: touch; /* iOS 관성 스크롤 */
touch-action: pan-y; /* 세로 스크롤만 허용 */
/* 주의: overflow-auto, h-full 등 스크롤 관련 속성은 제거됨 (스크롤 겹침 방지) */
```

## 🎨 Visual Specifications

### Background Gradient

```typescript
background: `linear-gradient(to bottom, 
  rgba(147, 51, 234, ${opacity * 0.1}), 
  rgba(147, 51, 234, ${opacity * 0.3})
)`;
```

### Icon States

| 상태        | 회전      | 스케일    | 색상              |
| ----------- | --------- | --------- | ----------------- |
| 당기는 중   | 0° ~ 180° | 0.8 ~ 1.0 | `text-purple-400` |
| 임계값 도달 | 180°      | 1.2       | `text-purple-600` |
| 새로고침 중 | 무한 회전 | 1.2       | `text-purple-600` |

### Animation Curves

- **Spring**: `stiffness: 300, damping: 30` (자연스러운 bounce)
- **EaseOut**: `1 - Math.pow(1 - progress, 3)` (부드러운 감속)

## 🔧 Usage

### Basic Implementation

```tsx
import PullToRefresh from "@/components/layouts/pull-to-refresh";

function MyComponent() {
  const handleRefresh = async () => {
    // 데이터 새로고침 로직
    await fetchData();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      {/* 스크롤 가능한 컨텐츠 */}
      <div>...</div>
    </PullToRefresh>
  );
}
```

### Props Interface

```typescript
interface PullToRefreshProps {
  children: ReactNode; // 래핑할 컨텐츠
  onRefresh: () => Promise<void>; // 새로고침 콜백 (비동기)
  className?: string; // 추가 CSS 클래스
}
```

### Requirements

- **컨테이너**: `overflow-auto`, `h-full` 클래스 필요
- **콜백**: `onRefresh`는 Promise를 반환해야 함
- **의존성**: Framer Motion, Hero Icons

## 🔍 Technical Details

### Performance Optimizations

- **useCallback**: 모든 이벤트 핸들러 메모이제이션
- **requestAnimationFrame**: 커스텀 애니메이션 최적화
- **상태 통합**: 단일 객체로 리렌더링 최소화

### Memory Management

- **Event Cleanup**: useEffect cleanup으로 메모리 누수 방지
- **Timer Cleanup**: setTimeout 정리
- **Ref 사용**: DOM 직접 조작으로 성능 향상

### Error Handling

```typescript
try {
  await onRefresh();
} catch (error) {
  console.error("Refresh failed:", error);
} finally {
  // 항상 상태 초기화
  updatePullState({ isRefreshing: false });
}
```

## 🐛 Known Issues & Solutions

### Issue: Passive Event Listener Warning

**해결책**: `addEventListener`를 `passive: false`로 직접 등록

### Issue: iOS Safari 스크롤 간섭

**해결책**: `overscroll-behavior: contain` 및 터치 영역 제한

### Issue: 초기 렌더링 시 위치 어긋남

**해결책**: DOM 안정화 후 초기 위치 설정 및 상태 통합

## 🚀 Future Enhancements

- [ ] 가로 방향 Pull-to-Refresh 지원
- [ ] 커스텀 아이콘/애니메이션 지원
- [ ] 다양한 테마 프리셋
- [ ] 접근성 개선 (스크린 리더 지원)
- [ ] 성능 메트릭 측정 도구

## 📚 Dependencies

```json
{
  "framer-motion": "^10.x.x",
  "@heroicons/react": "^2.x.x",
  "react": "^18.x.x"
}
```

## 스크롤 처리 방식

- **페이지 레벨 스크롤 사용**: 컴포넌트 자체에는 스크롤을 적용하지 않고 `window.scrollY`를 사용
- **스크롤 겹침 방지**: `overflow-auto`, `h-full` 등의 스크롤 관련 클래스 제거
- **네이티브 새로고침 방지**: `overscroll-behavior: contain`으로 브라우저 기본 동작 차단

## Technical Specifications
