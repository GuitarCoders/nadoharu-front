"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 시스템 테마 변경 감지 함수
    const updateThemeColor = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      // theme-color meta 태그 업데이트
      let themeColorMeta = document.querySelector(
        'meta[name="theme-color"]'
      ) as HTMLMetaElement;
      if (!themeColorMeta) {
        themeColorMeta = document.createElement("meta");
        themeColorMeta.name = "theme-color";
        document.head.appendChild(themeColorMeta);
      }

      // apple-mobile-web-app-status-bar-style meta 태그 업데이트
      let statusBarMeta = document.querySelector(
        'meta[name="apple-mobile-web-app-status-bar-style"]'
      ) as HTMLMetaElement;
      if (!statusBarMeta) {
        statusBarMeta = document.createElement("meta");
        statusBarMeta.name = "apple-mobile-web-app-status-bar-style";
        document.head.appendChild(statusBarMeta);
      }

      if (isDark) {
        // 다크 모드: 검은색 배경
        themeColorMeta.content = "#000000";
        statusBarMeta.content = "black-translucent"; // 흰색 텍스트
      } else {
        // 라이트 모드: 흰색 배경
        themeColorMeta.content = "#ffffff";
        statusBarMeta.content = "default"; // 검은색 텍스트
      }
    };

    // 초기 설정
    updateThemeColor();

    // 시스템 테마 변경 감지
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateThemeColor);

    // 클린업
    return () => {
      mediaQuery.removeEventListener("change", updateThemeColor);
    };
  }, []);

  return <>{children}</>;
}
