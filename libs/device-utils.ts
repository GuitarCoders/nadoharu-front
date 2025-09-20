/**
 * 환경 감지 관련 유틸리티 함수들
 */

import { MOBILE_BREAKPOINT } from "./constants";

/**
 * 현재 화면 너비가 모바일 환경인지 확인
 * @param width - 확인할 화면 너비 (기본값: window.innerWidth)
 * @returns 모바일 환경 여부
 */
export const isMobileDevice = (width?: number): boolean => {
  if (typeof window === "undefined") {
    // SSR 환경에서는 기본적으로 false 반환
    return false;
  }

  const screenWidth = width ?? window.innerWidth;
  return screenWidth < MOBILE_BREAKPOINT;
};

/**
 * 현재 화면 너비가 PC 환경인지 확인
 * @param width - 확인할 화면 너비 (기본값: window.innerWidth)
 * @returns PC 환경 여부
 */
export const isPCDevice = (width?: number): boolean => {
  if (typeof window === "undefined") {
    // SSR 환경에서는 기본적으로 true 반환 (PC 우선)
    return true;
  }

  const screenWidth = width ?? window.innerWidth;
  return screenWidth >= MOBILE_BREAKPOINT;
};

/**
 * 현재 환경 타입을 문자열로 반환
 * @param width - 확인할 화면 너비 (기본값: window.innerWidth)
 * @returns 'mobile' | 'pc'
 */
export const getDeviceType = (width?: number): "mobile" | "pc" => {
  return isMobileDevice(width) ? "mobile" : "pc";
};
