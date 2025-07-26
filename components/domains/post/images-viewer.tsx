"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface ImagesViewerProps {
  imageUrls: string[];
  initialIndex?: number;
}

export default function ImagesViewer({
  imageUrls,
  initialIndex = 0,
}: ImagesViewerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 최소 스와이프 거리 (픽셀)
  const minSwipeDistance = 50;

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < imageUrls.length - 1;

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [canGoPrevious]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [canGoNext]);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  // 컨테이너 너비 측정
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (canGoPrevious) goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (canGoNext) goToNext();
          break;
        case "Escape":
          e.preventDefault();
          handleClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, handleClose, canGoPrevious, canGoNext]);

  // 터치 이벤트 핸들러
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || touchStart === null) return;

    const currentTouch = e.targetTouches[0].clientX;
    const offset = currentTouch - touchStart;
    setDragOffset(offset);
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canGoNext) {
      goToNext();
    } else if (isRightSwipe && canGoPrevious) {
      goToPrevious();
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const slideWidthPercent = 100 / imageUrls.length;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* 헤더 - 뒤로가기 버튼 */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <button
          onClick={handleClose}
          className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors cursor-pointer"
          aria-label="뒤로가기"
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>

        {/* 이미지 카운터 */}
        {imageUrls.length > 1 && (
          <div className="px-3 py-1 rounded-full bg-black/50 text-white text-sm">
            {currentIndex + 1} / {imageUrls.length}
          </div>
        )}
      </div>

      {/* 메인 이미지 영역 */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${
              -currentIndex * slideWidthPercent +
              (isDragging && containerWidth > 0
                ? (dragOffset / containerWidth) * slideWidthPercent
                : 0)
            }%)`,
            width: `${imageUrls.length * 100}%`,
          }}
        >
          {imageUrls.map((url, index) => (
            <div
              key={url}
              className="w-full h-full flex items-center justify-center relative"
              style={{ width: `${100 / imageUrls.length}%` }}
            >
              <Image
                src={url}
                alt={`이미지 ${index + 1}`}
                fill
                className="object-contain"
                priority={index === currentIndex}
                onLoad={() => index === currentIndex && setIsLoading(false)}
                onLoadStart={() => index === currentIndex && setIsLoading(true)}
                sizes="100vw"
              />

              {/* 로딩 스피너 */}
              {isLoading && index === currentIndex && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 네비게이션 버튼 (이미지가 2개 이상일 때만) */}
        {imageUrls.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={!canGoPrevious}
              className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                canGoPrevious
                  ? "bg-black/50 hover:bg-black/70 cursor-pointer"
                  : "bg-black/20 cursor-not-allowed opacity-50"
              }`}
              aria-label="이전 이미지"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={goToNext}
              disabled={!canGoNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                canGoNext
                  ? "bg-black/50 hover:bg-black/70 cursor-pointer"
                  : "bg-black/20 cursor-not-allowed opacity-50"
              }`}
              aria-label="다음 이미지"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* 하단 인디케이터 (이미지가 2개 이상일 때만) */}
      {imageUrls.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-2">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`${index + 1}번째 이미지로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
