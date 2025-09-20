import { test, expect } from "@playwright/test";

test.describe("FlexibleTextarea", () => {
  test.beforeEach(async ({ page }) => {
    // Storybook iframe 주소로 이동
    await page.goto(
      "http://localhost:6006/iframe.html?id=flexible-textarea--default"
    );
  });

  test("기본 설정으로 렌더링되는지 확인", async ({ page }) => {
    const textarea = page.locator("textarea");
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveAttribute(
      "placeholder",
      "메시지를 입력하세요..."
    );
    await expect(textarea).toHaveAttribute("rows", "1");
  });

  test("텍스트 입력에 따라 높이가 자동으로 조정될 것", async ({ page }) => {
    const textarea = page.locator("textarea");

    // 초기 높이 측정
    const initialHeight = await textarea.evaluate((el) => el.clientHeight);

    // 여러 줄 텍스트 입력
    const multilineText = "첫 번째 줄\n두 번째 줄\n세 번째 줄\n네 번째 줄";
    await textarea.fill(multilineText);

    // 높이가 증가했는지 확인
    const expandedHeight = await textarea.evaluate((el) => el.clientHeight);
    expect(expandedHeight).toBeGreaterThan(initialHeight);

    // 텍스트 삭제 후 높이가 줄어드는지 확인
    await textarea.fill("한 줄 텍스트");
    const reducedHeight = await textarea.evaluate((el) => el.clientHeight);
    expect(reducedHeight).toBeLessThan(expandedHeight);
  });

  test("최대 높이 설정 시 최대 높이 이상으로는 늘어나지 않을 것", async ({
    page,
  }) => {
    // maxRows가 설정된 스토리로 이동
    await page.goto(
      "http://localhost:6006/iframe.html?id=flexible-textarea--with-long-text"
    );

    const textarea = page.locator("textarea");

    // maxRows에 도달할 때까지 텍스트 입력
    const longText = Array(20).fill("매우 긴 텍스트 라인입니다.").join("\n");
    await textarea.fill(longText);

    const maxHeight = await textarea.evaluate((el) => el.clientHeight);

    // 더 많은 텍스트 추가
    const evenLongerText =
      longText + "\n" + Array(10).fill("추가 라인").join("\n");
    await textarea.fill(evenLongerText);

    const finalHeight = await textarea.evaluate((el) => el.clientHeight);

    // 높이가 동일하게 유지되어야 함 (maxRows 제한)
    expect(finalHeight).toBe(maxHeight);

    // 스크롤이 생겼는지 확인
    const hasScroll = await textarea.evaluate(
      (el) => el.scrollHeight > el.clientHeight
    );
    expect(hasScroll).toBe(true);
  });

  test("폼 제출 시 높이가 초기화될 것", async ({ page }) => {
    // 폼이 있는 스토리로 이동
    await page.goto(
      "http://localhost:6006/iframe.html?id=flexible-textarea--in-form"
    );

    const textarea = page.locator("textarea");
    const submitButton = page.locator('button[type="submit"]');

    // 여러 줄 텍스트 입력
    const multilineText = "첫 번째 줄\n두 번째 줄\n세 번째 줄";
    await textarea.fill(multilineText);

    const expandedHeight = await textarea.evaluate((el) => el.clientHeight);

    // 폼 제출
    await submitButton.click();

    // 알림 창 처리
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    // 높이가 초기화되었는지 확인
    await page.waitForTimeout(100); // 리셋 애니메이션 대기
    const resetHeight = await textarea.evaluate((el) => el.clientHeight);
    expect(resetHeight).toBeLessThan(expandedHeight);

    // 텍스트가 비워졌는지 확인
    const textValue = await textarea.inputValue();
    expect(textValue).toBe("");
  });

  test("Cmd/Ctrl + Enter로 폼 제출이 가능할 것", async ({ page }) => {
    // 폼이 있는 스토리로 이동
    await page.goto(
      "http://localhost:6006/iframe.html?id=flexible-textarea--in-form"
    );

    const textarea = page.locator("textarea");

    // 텍스트 입력
    await textarea.fill("테스트 메시지");

    // 알림 창 이벤트 리스너 등록
    let alertMessage = "";
    page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Cmd/Ctrl + Enter 키 조합 (운영체제에 따라)
    const modifier = process.platform === "darwin" ? "Meta" : "Control";
    await textarea.press(`${modifier}+Enter`);

    // 알림이 표시되었는지 확인
    await page.waitForTimeout(100);
    expect(alertMessage).toContain("테스트 메시지");
  });

  test("submitOnModEnter가 false일 때 Cmd/Ctrl + Enter로 제출되지 않을 것", async ({
    page,
  }) => {
    // submitOnModEnter가 false인 스토리로 이동
    await page.goto(
      "http://localhost:6006/iframe.html?id=flexible-textarea--no-submit-on-enter"
    );

    const textarea = page.locator("textarea");

    // 텍스트 입력
    await textarea.fill("테스트 메시지");

    // 초기 텍스트 값 저장
    const initialValue = await textarea.inputValue();

    // Cmd/Ctrl + Enter 키 조합
    const modifier = process.platform === "darwin" ? "Meta" : "Control";
    await textarea.press(`${modifier}+Enter`);

    await page.waitForTimeout(100);

    // 텍스트가 그대로 유지되어야 함 (제출되지 않음)
    const finalValue = await textarea.inputValue();
    expect(finalValue).toBe(initialValue);
  });

  test("입력한 텍스트의 복사 및 붙여넣기가 가능할 것", async ({ page }) => {
    const textarea = page.locator("textarea");

    const testText = "복사 붙여넣기 테스트 텍스트";

    const modifier = process.platform === "darwin" ? "Meta" : "Control";

    // 텍스트 입력 및 전체 선택
    await textarea.fill(testText);
    await textarea.press(`${modifier}+a`);

    // 복사
    await textarea.press(`${modifier}+c`);

    // 텍스트 지우고 붙여넣기
    await textarea.fill("");
    await textarea.press(`${modifier}+v`);

    // 붙여넣기된 텍스트 확인
    const pastedText = await textarea.inputValue();
    expect(pastedText).toBe(testText);
  });

  test("hasButton 속성이 true일 때 오른쪽 패딩이 적용될 것", async ({
    page,
  }) => {
    // 버튼이 있는 스토리로 이동
    await page.goto(
      "http://localhost:6006/iframe.html?id=flexible-textarea--with-button"
    );

    const textarea = page.locator("textarea");

    // pr-10 클래스가 적용되었는지 확인
    const className = await textarea.getAttribute("class");
    expect(className).toContain("pr-10");

    // 버튼이 표시되는지 확인 (구체적인 선택자 사용)
    const button = page
      .locator('button[type="submit"]')
      .filter({ hasText: "전송" });
    await expect(button).toBeVisible();
    await expect(button).toHaveText("전송");
  });

  test("다중 초기 행 설정이 올바르게 작동할 것", async ({ page }) => {
    // 다중 행 초기 설정 스토리로 이동
    await page.goto(
      "http://localhost:6006/iframe.html?id=flexible-textarea--multiple-initial-rows"
    );

    const textarea = page.locator("textarea");

    // rows 속성이 3으로 설정되었는지 확인
    await expect(textarea).toHaveAttribute("rows", "3");

    // 초기 높이가 1행보다 큰지 확인
    const initialHeight = await textarea.evaluate((el) => el.clientHeight);
    expect(initialHeight).toBeGreaterThan(40); // 대략적인 3행 높이
  });

  test("reset 버튼으로 폼 리셋 시 높이가 초기화될 것", async ({ page }) => {
    // 폼이 있는 스토리로 이동
    await page.goto(
      "http://localhost:6006/iframe.html?id=flexible-textarea--in-form"
    );

    const textarea = page.locator("textarea");
    const resetButton = page.locator('button[type="reset"]');

    // 여러 줄 텍스트 입력
    const multilineText = "첫 번째 줄\n두 번째 줄\n세 번째 줄";
    await textarea.fill(multilineText);

    const expandedHeight = await textarea.evaluate((el) => el.clientHeight);

    // 리셋 버튼 클릭
    await resetButton.click();

    // 높이가 초기화되었는지 확인
    await page.waitForTimeout(100);
    const resetHeight = await textarea.evaluate((el) => el.clientHeight);
    expect(resetHeight).toBeLessThan(expandedHeight);

    // 텍스트가 비워졌는지 확인
    const textValue = await textarea.inputValue();
    expect(textValue).toBe("");
  });
});
