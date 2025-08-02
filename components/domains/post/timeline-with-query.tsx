"use client";

import PostPreview from "@/components/domains/post/preview";
import EmptyState from "@/components/shared/layouts/empty-state";
import PullToRefresh from "@/components/shared/layouts/pull-to-refresh";
import Spinner from "@/components/shared/layouts/spinner";
import { timelineScrollStateAtom, toastAtom } from "@/libs/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import NewPostBanner from "@/components/domains/post/new-post-banner";
import { VList, VListHandle } from "virtua";
import { usePostsForTimelineQuery } from "@/app/(tabs)/posts/_graphql";
import { PaginationFrom, PaginationSort } from "@/graphql/generated/graphql";
import PostsLoading from "@/app/(tabs)/posts/loading";

interface TimelineWithQueryProps {
  userAccountId?: string;
}

const DEFAULT_LIMIT = 10;

export default function TimelineWithQuery({
  userAccountId,
}: TimelineWithQueryProps) {
  const scrollContainerRef = useRef<VListHandle>(null);
  const [timeline, setTimeline] = useAtom(timelineScrollStateAtom);
  const setToast = useSetAtom(toastAtom);

  const { loading, error, fetchMore, refetch } = usePostsForTimelineQuery({
    variables: {
      pagination: {
        limit: DEFAULT_LIMIT,
        from: PaginationFrom.End,
        sort: PaginationSort.Desc,
      },
    },
    onCompleted: (data) => {
      if (data?.postsForTimeline) {
        const { posts, pageInfo } = data.postsForTimeline;
        setTimeline((prev) => ({
          ...prev,
          posts:
            (prev.posts?.length ?? 0) === 0 ? posts || [] : prev.posts || [],
          startCursor: pageInfo.startCursor,
          endCursor: pageInfo.endCursor,
          hasOverEnd: pageInfo.hasOverEnd,
          userAccountId,
        }));
      }
    },
  });

  // 스크롤 위치 복원 - 컴포넌트 마운트 시에만 실행
  useEffect(() => {
    const shouldRestore =
      timeline.scrollPosition > 0 &&
      (timeline.posts?.length ?? 0) > 0 &&
      scrollContainerRef.current;

    if (shouldRestore) {
      // RAF를 사용해 DOM 업데이트 후 스크롤 복원
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo(timeline.scrollPosition);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 의도적으로 빈 배열 - 마운트 시에만 실행

  const fetchOlderPosts = useCallback(async () => {
    if (timeline.isLoadingOlder || !timeline.endCursor) return;

    setTimeline((prev) => ({ ...prev, isLoadingOlder: true }));

    try {
      const result = await fetchMore({
        variables: {
          pagination: {
            limit: DEFAULT_LIMIT,
            cursor: timeline.endCursor,
            from: PaginationFrom.End,
            sort: PaginationSort.Desc,
          },
        },
      });

      if (result.data?.postsForTimeline) {
        const { posts: olderPosts, pageInfo } = result.data.postsForTimeline;

        setTimeline((prev) => ({
          ...prev,
          posts: [...(prev.posts || []), ...(olderPosts || [])],
          endCursor: pageInfo.endCursor,
          hasOverEnd: pageInfo.hasOverEnd,
          isLoadingOlder: false,
        }));
      }
    } catch {
      setToast({
        visible: true,
        title: "데이터를 불러오는데 실패했습니다",
        isError: true,
      });
      setTimeline((prev) => ({ ...prev, isLoadingOlder: false }));
    }
  }, [
    timeline.endCursor,
    timeline.isLoadingOlder,
    fetchMore,
    setTimeline,
    setToast,
  ]);

  // 스크롤 위치 저장
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const scrollPosition = scrollContainerRef.current.scrollOffset;
    setTimeline((prev) => ({ ...prev, scrollPosition }));

    // 새 포스트 배너 처리
    if (
      scrollContainerRef.current.findStartIndex() < (timeline.newPostCount || 0)
    ) {
      setTimeline((prev) => ({ ...prev, newPostLoaded: false }));
    }

    // 무한 스크롤
    if (
      timeline.hasOverEnd &&
      !timeline.isLoadingOlder &&
      scrollContainerRef.current.findEndIndex() >=
        (timeline.posts?.length ?? 0) - 2
    ) {
      fetchOlderPosts();
    }
  }, [
    timeline.hasOverEnd,
    timeline.isLoadingOlder,
    timeline.posts?.length,
    timeline.newPostCount,
    setTimeline,
    fetchOlderPosts,
  ]);

  const handleRefresh = useCallback(async () => {
    try {
      const result = await refetch({
        pagination: {
          limit: DEFAULT_LIMIT,
          until: timeline.startCursor,
          from: PaginationFrom.End,
          sort: PaginationSort.Desc,
        },
      });

      if (result.data?.postsForTimeline) {
        const { posts: newPosts, pageInfo } = result.data.postsForTimeline;

        if (newPosts && newPosts.length > 0) {
          setTimeline((prev) => ({
            ...prev,
            posts: [...newPosts, ...(prev.posts || [])],
            startCursor: pageInfo.startCursor,
            newPostLoaded: true,
            newPostCount: newPosts.length,
          }));
        }
      }
    } catch {
      setToast({
        visible: true,
        title: "데이터를 불러오는데 실패했습니다",
        isError: true,
      });
    }
  }, [timeline.startCursor, refetch, setTimeline, setToast]);

  if (loading && (timeline.posts?.length ?? 0) === 0) {
    return <PostsLoading />;
  }

  if (error && (timeline.posts?.length ?? 0) === 0) {
    console.log("🚨 error", error);
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState text="데이터를 불러오는데 실패했습니다" />
      </div>
    );
  }

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      className="flex-1 ptr-posts"
      getScrollOffset={() =>
        scrollContainerRef.current ? scrollContainerRef.current.scrollOffset : 0
      }
    >
      <AnimatePresence>
        {timeline.newPostLoaded && (
          <NewPostBanner count={timeline.newPostCount || 0} />
        )}
      </AnimatePresence>
      <VList
        ref={scrollContainerRef}
        onScroll={handleScroll}
        style={{ height: "calc(100vh - 152px)" }}
        className="relative h-full"
      >
        {(timeline.posts || []).map((post, i) => (
          <PostPreview
            key={post._id + post.nadoer?._id}
            isUserPost={post.author.account_id === userAccountId}
            className={
              i ? "border-t border-neutral-200 dark:border-neutral-800" : ""
            }
            {...post}
          />
        ))}
        {timeline.hasOverEnd && <Spinner className="mx-auto my-6" />}
        {(timeline.posts?.length ?? 0) === 0 && (
          <EmptyState text="조금 허전한데요" />
        )}
      </VList>
    </PullToRefresh>
  );
}
