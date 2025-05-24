"use client";

import { useDeviceDetection } from "@/hooks";
import { isMobileDevice, isPCDevice, getDeviceType } from "@/libs";

/**
 * 환경 감지 유틸리티 테스트 컴포넌트
 * 개발 중에만 사용하며, 추후 제거 예정
 */
export const DeviceDetectionTest = () => {
  const { isMobile, isPC, screenWidth } = useDeviceDetection();

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm font-mono z-50">
      <h3 className="font-bold mb-2">Device Detection Test</h3>

      <div className="space-y-1">
        <div>화면 너비: {screenWidth}px</div>
        <div>훅 - 모바일: {isMobile ? "✅" : "❌"}</div>
        <div>훅 - PC: {isPC ? "✅" : "❌"}</div>
        <div>함수 - 모바일: {isMobileDevice() ? "✅" : "❌"}</div>
        <div>함수 - PC: {isPCDevice() ? "✅" : "❌"}</div>
        <div>환경 타입: {getDeviceType()}</div>
      </div>

      <div className="mt-2 text-xs text-gray-300">중단점: 768px</div>
    </div>
  );
};
