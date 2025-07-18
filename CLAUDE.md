# CLAUDE.md

이 파일은 이 저장소에서 Claude Code (claude.ai/code)를 사용할 때의 지침을 제공합니다.

## 프로젝트 개요

**나도하루 (Nadoharu Front)** 는 Next.js 15로 구축된 한국 소셜 미디어 플랫폼으로, 실시간 채팅, 게시물 타임라인, 친구 시스템, PWA 기능을 제공합니다. 이 앱은 모바일 우선 디자인 접근 방식을 따르며 GraphQL 우선 데이터 아키텍처를 특징으로 합니다.

## 핵심 아키텍처

### GraphQL-우선 데이터 계층
- **Apollo Client 3.13.7**: GraphQL Code Generator를 통한 타입 안전한 작업
- **Co-located GraphQL 패턴**: 각 기능 디렉토리에 컴포넌트 옆에 `(graphql)/` 폴더 포함
- **Near-operation-file 프리셋**: `.graphql` 파일 옆에 타입 생성으로 강한 결합
- GraphQL 엔드포인트는 `NEXT_PUBLIC_GRAPHQL_API` 환경 변수로 구성
- 스키마 인트로스펙션 및 `npm run codegen`으로 자동 타입 생성

### 라우트 아키텍처
- **Route Groups**: `(auth)`, `(tabs)`는 URL에 영향을 주지 않으면서 논리적으로 구성
- **Server Actions 패턴**: 각 기능이 `data.ts` (쿼리) 및 `action.ts` (변경 작업)을 보유
- **Dynamic Routes**: `[postId]`, `[accountId]`, `[id]`는 GraphQL 작업과 공존
- **Nested Layouts**: 인증 흐름과 주요 앱 탭 간의 다른 레이아웃 제공

### 상태 관리 전략
- **Jotai 2.12.3**: UI 상태(알림, 토스트, 전역 앱 상태)에 대한 원자적 상태 관리
- **Apollo Client Cache**: GraphQL 데이터로 서버 상태 관리
- **Iron Session 8.0.4**: `nadoharu` 쿠키를 사용하여 안전한 세션 관리
- **React Hook Form**: 유효성 검사와 함께 폼 상태 관리

## 개발 명령어

```bash
# 개발
npm run dev                 # 핫 리로드와 함께 개발 서버 시작
npm run build              # 배포 전 필수 프로덕션 빌드
npm run start              # 프로덕션 서버 시작
npm run lint               # Next.js 규칙과 함께 ESLint 실행

# GraphQL 개발
npm run codegen            # GraphQL 스키마에서 TypeScript 타입 생성
npm run codegen:watch      # 활성 개발을 위한 감시 모드

# Docker (프로덕션)
docker build --build-arg NEXT_PUBLIC_GRAPHQL_API={API_URL} --build-arg COOKIE_PASSWORD={PASSWORD} -t nadoharu-front .
```

## 주요 개발 패턴

### GraphQL 워크플로우
1. 기능의 `(graphql)/` 디렉토리에 `.graphql` 파일 생성
2. `npm run codegen` 실행하여 타입과 훅 생성
3. 완전한 TypeScript 안전성을 갖춘 생성된 문서/훅 가져오기
4. `data.ts`/`action.ts`의 서버 작업으로 데이터 작업 사용

### 컴포넌트 아키텍처
- **도메인 중심 조직**: `components/domains/`는 기능별 컴포넌트를 포함
- **공유 UI**: `components/shared/`는 재사용 가능한 컴포넌트를 포함
- **레이아웃 시스템**: `components/layouts/`로 중첩 레이아웃 지원
- **제공자 패턴**: `components/providers/`에서 컨텍스트 제공자 관리

### 인증 흐름
- Iron Session 쿠키 저장소를 사용한 JWT 기반
- `middleware.ts`에서의 미들웨어 기반 라우트 보호
- `libs/session.ts`에서의 세션 유틸리티
- 로그인 상태에 따라 자동 인증 리다이렉션

## 기술 스택

### 핵심 프레임워크
- **Next.js 15.3.0**: 앱 라우터와 Docker를 위한 독립 실행형 출력
- **React 19.0.0**: 엄격 모드와 함께
- **TypeScript 5.8.3**: 엄격한 설정과 경로 별칭 (`@/*`) 포함

### UI 및 스타일링
- **Tailwind CSS 4**: 사용자 정의 테마와 다크 모드 지원
- **Radix UI**: 접근 가능한 컴포넌트 기본 요소
- **Framer Motion 12.12.1**: 애니메이션
- **Heroicons**: 일관된 아이콘
- **Geist 글꼴**: Sans 및 Mono 포함

### 모바일 및 PWA
- **Next PWA 5.6.0**: 오프라인 기능
- 게시물 타임라인에서의 **Pull-to-refresh** 구현
- 모바일 우선 반응형 디자인 패턴
- 터치 최적화 상호작용

## 환경 구성

### 필수 환경 변수
```bash
NEXT_PUBLIC_GRAPHQL_API=    # GraphQL API 엔드포인트
COOKIE_PASSWORD=            # Iron Session 암호화 키 (32자 이상)
NODE_ENV=                   # development/production
```

### 구성 파일
- `next.config.ts`: PWA 설정, 독립 실행형 출력, React 엄격 모드
- `codegen.ts`: GraphQL 타입 생성
- `tsconfig.json`: 경로 별칭, 엄격 모드, 번들러 해상도
- `tailwind.config.ts`: 한국어 글꼴 지원 사용자 정의 테마

## 핵심 기능

### 소셜 플랫폼 기능
- **게시물 타임라인**: Pull-to-refresh와 함께 무한 스크롤
- **실시간 채팅**: 개인 및 그룹 메시징
- **친구 시스템**: 친구 요청 전송/수락, 친구 목록
- **사용자 프로필**: 프로필 관리 및 보기
- **알림**: 활동 알림 시스템
- **댓글 및 리포스트**: 소셜 상호작용 기능

### 모바일 경험
- 앱 같은 경험을 제공하는 PWA
- 터치 제스처 및 모바일 내비게이션
- 모바일 브레이크포인트를 활용한 반응형 디자인
- 서비스 워커를 통한 오프라인 기능

## 파일 조직 인사이트

### GraphQL 공동 위치
각 기능은 다음 패턴을 따릅니다:
```
feature/
├── page.tsx              # React 컴포넌트
├── data.ts               # 쿼리를 위한 서버 작업
├── action.ts             # 변경 작업을 위한 서버 작업
├── layout.tsx            # 기능별 레이아웃
└── (graphql)/            # GraphQL 작업
    ├── query.graphql     # GraphQL 쿼리
    ├── mutation.graphql  # GraphQL 변경 작업
    └── *.generated.ts    # 자동 생성된 타입
```

### 상태 관리 파일
- `libs/atoms.ts`: Jotai 원자 정의
- `libs/apollo-client.ts`: Apollo Client 구성
- `libs/session.ts`: 세션 관리 유틸리티
- `libs/utils.ts`: 공용 유틸리티 함수

## 개발 모범 사례

### 타입 안전성
- GraphQL 스키마에서 React 컴포넌트까지의 종단 간 타입 안전성
- 모든 GraphQL 작업에 대해 생성된 TypeScript 타입
- 암묵적 any 없이 엄격한 TypeScript 구성

### 코드 생성
- `.graphql` 파일을 수정한 후 항상 `npm run codegen` 실행
- GraphQL 작업에 대해 생성된 훅과 타입 사용
- GraphQL 작업을 소비 컴포넌트 가까이에 유지

### 모바일 우선 개발
- 먼저 모바일 디바이스/뷰포트에서 테스트
- 터치 친화적 UI 패턴 사용
- 모바일 UX를 위한 적절한 로딩 및 오류 상태 구현

