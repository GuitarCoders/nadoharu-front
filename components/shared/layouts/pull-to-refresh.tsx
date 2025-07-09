"use client";

import { motion, useAnimation } from "framer-motion";
import { ReactNode, useRef, useState, useCallback, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

// ========================================================================================
// TYPES & CONSTANTS
// ========================================================================================

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  className?: string;
  /**
   * 현재 스크롤 오프셋을 반환하는 함수. 전달되지 않으면 window.scrollY 를 사용한다.
   * VList 등 내부 스크롤 컨테이너와 함께 사용할 때 유용하다.
   */
  getScrollOffset?: () => number;
}

interface PullState {
  isRefreshing: boolean;
  showIcon: boolean;
  distance: number;
  startY: number;
  isDragging: boolean;
}

const PULL_THRESHOLD = 80;
const MAX_PULL_DISTANCE = 80;
const REFRESH_OFFSET = 60;
const ANIMATION_DURATION = {
  iconFadeOut: 200,
  returnToPosition: 400,
  opacityTransition: 0.2,
};

// ========================================================================================
// MAIN COMPONENT
// ========================================================================================

export default function PullToRefresh({
  children,
  onRefresh,
  className = "",
  getScrollOffset,
}: PullToRefreshProps) {
  // ========================================================================================
  // STATE & REFS
  // ========================================================================================

  const [pullState, setPullState] = useState<PullState>({
    isRefreshing: false,
    showIcon: false,
    distance: 0,
    startY: 0,
    isDragging: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // 마운트 여부를 추적하여 controls.start 호출 시점을 보장
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ========================================================================================
  // UTILITY FUNCTIONS
  // ========================================================================================

  const updatePullState = useCallback((updates: Partial<PullState>) => {
    setPullState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetPullState = useCallback(() => {
    updatePullState({
      distance: 0,
      isDragging: false,
      startY: 0,
      showIcon: false,
    });
  }, [updatePullState]);

  const shouldStartPull = useCallback(() => {
    const offset = getScrollOffset ? getScrollOffset() : window.scrollY;
    return offset === 0 && !pullState.isRefreshing;
  }, [getScrollOffset, pullState.isRefreshing]);

  // ========================================================================================
  // ANIMATION FUNCTIONS
  // ========================================================================================

  const animateDistanceToZero = useCallback(() => {
    return new Promise<void>((resolve) => {
      const startDistance = pullState.distance;
      const duration = ANIMATION_DURATION.returnToPosition;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentDistance = startDistance * (1 - easeOut);

        updatePullState({ distance: currentDistance });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          updatePullState({ distance: 0 });
          resolve();
        }
      };

      animate();
    });
  }, [pullState.distance, updatePullState]);

  const returnToInitialPosition = useCallback(async () => {
    // Phase 1: Hide icon first
    updatePullState({ showIcon: false });
    await new Promise((resolve) =>
      setTimeout(resolve, ANIMATION_DURATION.iconFadeOut)
    );

    // Phase 2: Animate content and distance to zero simultaneously
    const animations = [animateDistanceToZero()];
    // 컴포넌트가 마운트된 이후에만 controls.start 호출
    if (hasMounted) {
      animations.unshift(
        controls.start({
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
        })
      );
    }

    await Promise.all(animations);

    // Phase 3: Reset all state
    resetPullState();
  }, [
    controls,
    animateDistanceToZero,
    resetPullState,
    updatePullState,
    hasMounted,
  ]);

  // ========================================================================================
  // TOUCH EVENT HANDLERS
  // ========================================================================================

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (shouldStartPull()) {
        updatePullState({
          startY: e.touches[0].clientY,
          isDragging: true,
        });
      }
    },
    [shouldStartPull, updatePullState]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (
        !pullState.isDragging ||
        !containerRef.current ||
        pullState.isRefreshing
      ) {
        return;
      }

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - pullState.startY;

      const offset = getScrollOffset ? getScrollOffset() : window.scrollY;
      if (deltaY > 0 && offset === 0) {
        e.preventDefault();
        const newDistance = Math.min(deltaY * 0.6, MAX_PULL_DISTANCE);

        updatePullState({ distance: newDistance });

        // Show icon when pull starts
        if (newDistance > 0 && !pullState.showIcon) {
          updatePullState({ showIcon: true });
        }
      }
    },
    [
      pullState.isDragging,
      pullState.isRefreshing,
      pullState.startY,
      pullState.showIcon,
      updatePullState,
      getScrollOffset,
    ]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!pullState.isDragging || pullState.isRefreshing) return;

    const shouldRefresh = pullState.distance >= PULL_THRESHOLD;

    if (shouldRefresh) {
      updatePullState({
        isRefreshing: true,
        isDragging: false,
      });

      try {
        await onRefresh();
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        updatePullState({ isRefreshing: false });
        await returnToInitialPosition();
      }
    } else {
      updatePullState({ isDragging: false });
      await returnToInitialPosition();
    }
  }, [
    pullState.isDragging,
    pullState.isRefreshing,
    pullState.distance,
    onRefresh,
    returnToInitialPosition,
    updatePullState,
  ]);

  // ========================================================================================
  // EFFECTS
  // ========================================================================================

  // Register touch event listeners with passive: false
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = { passive: false };
    container.addEventListener("touchstart", handleTouchStart, options);
    container.addEventListener("touchmove", handleTouchMove, options);
    container.addEventListener("touchend", handleTouchEnd, options);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Update content position based on pull distance
  useEffect(() => {
    if (!pullState.isRefreshing && contentRef.current) {
      controls.set({ y: pullState.distance });
    }
  }, [pullState.distance, pullState.isRefreshing, controls]);

  // ========================================================================================
  // COMPUTED VALUES
  // ========================================================================================

  const iconRotation = pullState.isRefreshing
    ? [0, 360]
    : pullState.distance > PULL_THRESHOLD
    ? 180
    : (pullState.distance / PULL_THRESHOLD) * 180;
  const iconScale =
    pullState.distance > PULL_THRESHOLD
      ? 1.2
      : Math.max(pullState.distance / PULL_THRESHOLD, 0.8);

  // ========================================================================================
  // RENDER
  // ========================================================================================

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        // 모바일 브라우저의 네이티브 새로고침 방지
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-y",
      }}
      // React 터치 이벤트는 제거하고 직접 등록한 이벤트 사용
    >
      {/* Pull-to-refresh 인디케이터 */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center"
        style={{ height: Math.max(pullState.distance, 0) }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: pullState.distance > 0 || pullState.isRefreshing ? 1 : 0,
        }}
        transition={{
          opacity: {
            duration: ANIMATION_DURATION.opacityTransition,
            ease: "easeInOut",
          },
        }}
      >
        {/* 아이콘 컨테이너 - 별도 페이드아웃 제어 */}
        <motion.div
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity:
              pullState.showIcon &&
              (pullState.distance > 0 || pullState.isRefreshing)
                ? 1
                : 0,
          }}
          transition={{
            duration: ANIMATION_DURATION.opacityTransition,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              rotate: iconRotation,
              scale: iconScale,
            }}
            transition={{
              rotate: pullState.isRefreshing
                ? {
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            }}
          >
            <ArrowPathIcon
              className={`w-6 h-6 transition-colors duration-300 ${
                pullState.distance >= PULL_THRESHOLD
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-400 dark:text-neutral-600"
              }`}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 컨텐츠 */}
      <motion.div
        ref={contentRef}
        animate={controls}
        className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-600"
        style={{
          y: pullState.isRefreshing ? REFRESH_OFFSET : pullState.distance,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
