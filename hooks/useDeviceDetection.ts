"use client";

import { MOBILE_BREAKPOINT } from "@/libs/constants";
import { useState, useEffect } from "react";

/**
 * 768px를 기준으로 모바일/PC 환경을 감지하는 훅
 * @returns {Object} 환경 감지 결과
 * @returns {boolean} isMobile - 모바일 환경 여부 (화면 너비 < 768px)
 * @returns {boolean} isPC - PC 환경 여부 (화면 너비 >= 768px)
 * @returns {number | null} screenWidth - 현재 화면 너비 (SSR 시 null)
 */
export const useDeviceDetection = () => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  useEffect(() => {
    // 초기 화면 너비 설정
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // 초기값 설정
    updateScreenWidth();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", updateScreenWidth);

    // 정리 함수
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const isMobile =
    screenWidth !== null ? screenWidth < MOBILE_BREAKPOINT : false;
  const isPC = screenWidth !== null ? screenWidth >= MOBILE_BREAKPOINT : false;

  return {
    isMobile,
    isPC,
    screenWidth,
  };
};
