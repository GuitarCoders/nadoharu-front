import type { TestRunnerConfig } from "@storybook/test-runner";

// Storybook Test Runner (Playwright 기반) 설정
const config: TestRunnerConfig = {
  // 모든 스토리 방문 전 실행: 애니메이션을 줄여서 플레이크를 줄임
  preVisit: async (page) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  },
  
  // 테스트 안정성 향상을 위한 추가 설정
  async postVisit(page) {
    // 모든 이미지 로딩 완료 대기
    await page.waitForLoadState("networkidle");
    
    // 애니메이션 완료 대기
    await page.waitForTimeout(500);
  },
};

export default config;
