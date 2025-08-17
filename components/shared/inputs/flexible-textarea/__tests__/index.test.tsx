import React from "react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import FlexibleTextarea from "../flexible-textarea";

afterEach(() => {
  cleanup();
});

const mockComputedStyle = (
  props: Partial<CSSStyleDeclaration>
): CSSStyleDeclaration => {
  const style = document.createElement("div").style; // CSSStyleDeclaration
  Object.assign(style, props);
  return style;
};

describe("FlexibleTextarea", () => {
  it("화면에 렌더링이 가능할 것", () => {
    const { getByRole } = render(<FlexibleTextarea />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("텍스트 입력(라인 수)에 따라 높이가 자동으로 조정될 것", () => {
    const getComputedStyleSpy = vi.spyOn(window, "getComputedStyle");
    const baseLineHeight = 40;

    // 라인 높이 계산을 위해 모의 함수 설정
    getComputedStyleSpy.mockReturnValue(
      mockComputedStyle({ lineHeight: `${baseLineHeight}px` })
    );

    render(<FlexibleTextarea />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    // 입력값에 따른 scrollHeight + 내부 로직 검증(먼저 auto로 설정되는지)
    let readCount = 0;
    Object.defineProperty(textarea, "scrollHeight", {
      configurable: true,
      get: () => {
        readCount += 1;
        expect(textarea.style.height).toBe("auto");
        const lines = textarea.value?.split("\n").length || 1;
        return baseLineHeight * lines;
      },
    });

    fireEvent.input(textarea, { target: { value: `hello` } });
    expect(textarea.style.height).toBe(`${baseLineHeight}px`);

    fireEvent.input(textarea, { target: { value: `hello\nworld` } });
    expect(textarea.style.height).toBe(`${baseLineHeight * 2}px`);

    fireEvent.input(textarea, { target: { value: `hello\nworld\n!` } });
    expect(textarea.style.height).toBe(`${baseLineHeight * 3}px`);

    expect(readCount).toBe(3);

    getComputedStyleSpy.mockRestore();
  });

  it("폼 reset 시 높이가 초기화될 것", () => {
    const getComputedStyleSpy = vi.spyOn(window, "getComputedStyle");
    const baseLineHeight = 40;

    getComputedStyleSpy.mockReturnValue(
      mockComputedStyle({ lineHeight: `${baseLineHeight}px` })
    );

    const { getByRole, container } = render(
      <form>
        <FlexibleTextarea />
        <button type="reset">Reset</button>
      </form>
    );
    const textarea = getByRole("textbox") as HTMLTextAreaElement;

    let readCount = 0;
    Object.defineProperty(textarea, "scrollHeight", {
      configurable: true,
      get: () => {
        readCount += 1;
        expect(textarea.style.height).toBe("auto");
        const lines = textarea.value?.split("\n").length || 1;
        return baseLineHeight * lines;
      },
    });

    fireEvent.input(textarea, { target: { value: `hello\nworld` } });
    expect(textarea.style.height).toBe(`${baseLineHeight * 2}px`);

    const form = container.querySelector("form") as HTMLFormElement;
    fireEvent.reset(form);
    // resetHeight는 명시 height를 비움 (minHeight는 CSS로 유지)
    expect(textarea.style.height).toBe("");
    // minHeight는 초기 rows(기본값 1) * lineHeight로 설정됨
    expect(textarea.style.minHeight).toBe(`${baseLineHeight}px`);

    getComputedStyleSpy.mockRestore();
  });

  it.todo("Command + Enter 혹은 Ctrl + Enter 입력 시 폼 제출될 것");

  it.todo("Command + Enter 혹은 Ctrl + Enter 입력 시 높이가 초기화될 것");
});
