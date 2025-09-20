# FlexibleTextarea 컴포넌트

입력에 따라 높이가 자동으로 조절되는 textarea 컴포넌트입니다.

## 특징

- ✅ 텍스트 입력에 따른 자동 높이 조절
- ✅ 초기 행 수와 최대 행 수 설정 가능
- ✅ Cmd/Ctrl + Enter로 폼 제출 기능
- ✅ 폼 리셋 시 높이 자동 초기화
- ✅ 버튼 포함 시 패딩 자동 조정

## Props

```typescript
interface FlexibleTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  initialRows?: number; // 초기 행 수 (기본값: 1)
  maxRows?: number; // 최대 행 수 (설정 시 스크롤 표시)
  hasButton?: boolean; // 버튼 포함 여부 (기본값: false)
  submitOnModEnter?: boolean; // Cmd/Ctrl + Enter 제출 (기본값: true)
}
```

## 사용 예시

### 기본 사용법

```tsx
<FlexibleTextarea placeholder="메시지를 입력하세요..." maxRows={5} />
```

### 폼 내에서 사용

```tsx
<form onSubmit={handleSubmit}>
  <FlexibleTextarea
    name="message"
    initialRows={2}
    maxRows={6}
    placeholder="Cmd/Ctrl + Enter로 제출..."
  />
  <button type="submit">전송</button>
</form>
```

### 버튼과 함께 사용

```tsx
<div className="relative">
  <FlexibleTextarea hasButton={true} placeholder="메시지 입력..." />
  <button className="absolute right-2 top-1/2 -translate-y-1/2">전송</button>
</div>
```

## 테스트

### Storybook으로 테스트

```bash
yarn storybook
```

브라우저에서 `http://localhost:6006`에 접속하여 다양한 시나리오를 확인할 수 있습니다.

### Playwright E2E 테스트

```bash
# Storybook 먼저 실행
yarn storybook

# 새 터미널에서 E2E 테스트 실행
yarn test:e2e

# UI 모드로 테스트 실행 (디버깅용)
yarn test:e2e-ui
```

### 테스트 항목

- ✅ 기본 렌더링 확인
- ✅ 텍스트 입력에 따른 높이 자동 조절
- ✅ 최대 높이 제한 동작
- ✅ 폼 제출 시 높이 초기화
- ✅ Cmd/Ctrl + Enter 키보드 제출
- ✅ 복사/붙여넣기 기능
- ✅ hasButton 속성 동작
- ✅ 다중 초기 행 설정
- ✅ 폼 리셋 기능

## 개발 노트

### 높이 계산 로직

컴포넌트는 다음과 같은 방식으로 높이를 계산합니다:

1. **초기화**: `initialRows`와 CSS 스타일을 기반으로 최소 높이 설정
2. **확장**: 내용이 늘어나면 `scrollHeight`를 기반으로 높이 조절
3. **제한**: `maxRows`가 설정된 경우 최대 높이 제한 및 스크롤 표시
4. **리셋**: 폼 제출이나 리셋 시 초기 높이로 복원

### 키보드 이벤트 처리

- **Enter**: 일반적인 줄바꿈
- **Cmd/Ctrl + Enter**: 폼 제출 (submitOnModEnter가 true인 경우)
- **IME 입력 중**: 키보드 이벤트 무시하여 한글 입력 지원

### 접근성 고려사항

- 적절한 `aria-label` 및 `placeholder` 제공
- 키보드 내비게이션 지원
- 포커스 스타일 제공
