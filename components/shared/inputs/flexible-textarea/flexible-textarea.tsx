"use client";

import { useCallback, useEffect, useRef, TextareaHTMLAttributes } from "react";

interface FlexibleTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string; // 에러 메시지
  showLabel?: boolean; // 라벨 표시 여부
  initialRows?: number; // 초기 행 수
  hasButton?: boolean; // 버튼 포함 여부
  submitOnModEnter?: boolean; // Cmd/Ctrl + Enter로 제출 기능 사용 여부
}

/**
 * 입력에 따라 높이가 자동으로 조절되는 textarea 컴포넌트
 * 초기 높이와 포커스 시 높이의 일관성을 보장합니다.
 */
export default function FlexibleTextarea({
  initialRows = 1,
  hasButton = false,
  onInput,
  onKeyDown,
  className,
  submitOnModEnter = true,
  ...rest
}: FlexibleTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // textarea 엘리먼트 참조
  const baseLineHeightRef = useRef<number | null>(null); // 기본 라인 높이 저장
  const minHeightRef = useRef<number | null>(null); // 최소 높이 저장

  // 최소 높이를 보장하는 함수 - padding과 border를 포함한 정확한 계산
  const ensureMinHeight = useCallback(
    (element?: HTMLTextAreaElement) => {
      const el = element ?? textareaRef.current;
      if (!el) return;
      if (baseLineHeightRef.current === null) {
        const computed = window.getComputedStyle(el);
        const lineHeight = parseFloat(computed.lineHeight);
        const paddingTop = parseFloat(computed.paddingTop);
        const paddingBottom = parseFloat(computed.paddingBottom);
        const borderTop = parseFloat(computed.borderTopWidth);
        const borderBottom = parseFloat(computed.borderBottomWidth);

        baseLineHeightRef.current =
          Number.isFinite(lineHeight) && lineHeight > 0 ? lineHeight : 0;
        if (baseLineHeightRef.current) {
          // 정확한 높이 계산: 라인 높이 * 행 수 + 패딩 + 테두리
          const contentHeight = baseLineHeightRef.current * initialRows;
          const totalPadding = paddingTop + paddingBottom;
          const totalBorder = borderTop + borderBottom;
          minHeightRef.current = contentHeight + totalPadding + totalBorder;
          el.style.minHeight = `${minHeightRef.current}px`;
        }
      }
    },
    [initialRows]
  );

  // textarea 높이를 내용에 맞게 조절하는 함수
  const resize = useCallback(
    (element?: HTMLTextAreaElement) => {
      const el = element ?? textareaRef.current;
      if (!el) return;
      ensureMinHeight(el);
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    },
    [ensureMinHeight]
  );

  // textarea 높이를 초기 상태로 리셋하는 함수
  const resetHeight = useCallback(
    (element?: HTMLTextAreaElement) => {
      const el = element ?? textareaRef.current;
      if (!el) return;
      ensureMinHeight(el);
      // 명시적 높이를 제거하여 CSS min-height(initialRows 기반)가 적용되도록 함
      el.style.height = "";
    },
    [ensureMinHeight]
  );

  // 초기 마운트 시 높이 통일
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    // 먼저 정확한 최소 높이를 설정
    ensureMinHeight(el);
  }, [ensureMinHeight]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    const isControlledEmpty =
      typeof rest.value === "string" && rest.value.length === 0;
    if (isControlledEmpty) {
      resetHeight(el);
      return;
    }
    resize(el);
  }, [resize, resetHeight, rest.value]);

  // 가장 가까운 폼이 리셋될 때 textarea 높이도 함께 리셋
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    const form = el.closest("form");
    if (!form) return;
    const handleFormReset = () => resetHeight(el);
    form.addEventListener("reset", handleFormReset);
    return () => {
      form.removeEventListener("reset", handleFormReset);
    };
  }, [resetHeight]);

  // 입력 이벤트 핸들러 - 입력에 따라 높이 조절
  const handleInput: React.FormEventHandler<HTMLTextAreaElement> = (event) => {
    resize(event.currentTarget);
    onInput?.(event);
  };

  // 키보드 이벤트 핸들러 - Cmd/Ctrl + Enter로 폼 제출
  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    onKeyDown?.(event);
    if (!submitOnModEnter) return;
    // IME 입력 조합 중에는 무시
    // @ts-expect-error: nativeEvent.isComposing은 React SyntheticEvent에서 사용 가능
    if (event.isComposing || event.nativeEvent?.isComposing) return;
    const isEnter = event.key === "Enter";
    const isMod = event.metaKey || event.ctrlKey;
    if (isEnter && isMod) {
      event.preventDefault();
      const form = (event.currentTarget as HTMLTextAreaElement).closest("form");
      if (form) {
        // onSubmit과 제약조건을 트리거하기 위해 requestSubmit을 우선 사용
        const requestSubmit = (form as HTMLFormElement).requestSubmit?.bind(
          form
        );
        if (requestSubmit) requestSubmit();
        else (form as HTMLFormElement).submit();
        // 즉시 높이를 리셋; 내용 삭제는 부모 폼에서 처리됨
        resetHeight(event.currentTarget);
      }
    }
  };

  const mergedClassName = `w-full px-4 py-2 border rounded-md outline-none resize-none border-neutral-300 focus:ring-1 focus:ring-violet-600 focus:ring-inset focus:border-violet-600 dark:bg-neutral-700 dark:text-white ${
    hasButton ? "pr-10" : ""
  } ${className ?? ""}`;

  return (
    <textarea
      ref={textareaRef}
      rows={initialRows}
      className={mergedClassName}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
}
