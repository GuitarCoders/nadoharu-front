"use client";

import { getNewerPosts, getOlderPosts } from "@/app/(tabs)/posts/data";
import PostPreview from "@/components/domains/post/preview";
import EmptyState from "@/components/layouts/empty-state";
import PullToRefresh from "@/components/layouts/pull-to-refresh";
import { Post } from "@/graphql/generated/graphql";
import { toastAtom } from "@/libs/atoms";
import { useSetAtom } from "jotai";
import { useState, useRef, useLayoutEffect } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

interface PostsWithRefreshProps {
  initialPosts: Post[];
  initialStartCursor?: string | null;
  initialEndCursor?: string | null;
  userAccountId: string | undefined;
}

const DEFAULT_LIMIT = 3;

// EmptyPlaceholder 컴포넌트 정의
const EmptyPlaceholder = () => (
  <div className="flex items-center justify-center h-64">
    <EmptyState text="조금 허전한데요" />
  </div>
);

export default function PostsWithPtr({
  initialPosts,
  initialStartCursor,
  initialEndCursor,
  userAccountId,
}: PostsWithRefreshProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentStartCursor, setCurrentStartCursor] =
    useState(initialStartCursor);
  const [currentEndCursor, setCurrentEndCursor] = useState(initialEndCursor);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [prependedCount, setPrependedCount] = useState(0);

  const setToast = useSetAtom(toastAtom);

  const fetchOlderPosts = async () => {
    console.log("🚀 fetchOlderPosts 호출됨", {
      isLoadingOlder,
      currentEndCursor,
    });
    if (isLoadingOlder || !currentEndCursor) return;
    setIsLoadingOlder(true);
    try {
      const data = await getOlderPosts({
        limit: DEFAULT_LIMIT,
        cursor: currentEndCursor,
      });
      const {
        postsForTimeline: { posts: olderPosts, pageInfo },
      } = data;

      console.log("📥 새로운 오래된 글", {
        count: olderPosts.length,
        pageInfo,
      });

      if (olderPosts.length > 0) {
        setPosts((prev) => [...prev, ...olderPosts]);
      }
      if (pageInfo.endCursor && pageInfo.hasOverEnd) {
        setCurrentEndCursor(pageInfo.endCursor);
      }
    } catch (error) {
      console.error("❌ fetchOlderPosts 에러:", error);
      setToast({
        visible: true,
        title: "데이터를 불러오는데 실패했습니다",
        isError: true,
      });
    } finally {
      setIsLoadingOlder(false);
    }
  };

  const handleRefresh = async () => {
    try {
      const data = await getNewerPosts({
        limit: DEFAULT_LIMIT,
        until: currentStartCursor,
      });
      const {
        postsForTimeline: { posts: newPosts, pageInfo },
      } = data;

      if (pageInfo.startCursor && pageInfo.startCursor !== currentStartCursor) {
        setCurrentStartCursor(pageInfo.startCursor);
      }

      if (newPosts.length > 0) {
        setPrependedCount(newPosts.length);
        setPosts((prev) => [...newPosts, ...prev]);
      }
    } catch {
      setToast({
        visible: true,
        title: "데이터를 불러오는데 실패했습니다",
        isError: true,
      });
    }
  };

  const virtuosoRef = useRef<VirtuosoHandle | null>(null);

  useLayoutEffect(() => {
    if (prependedCount > 0 && virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: prependedCount,
        align: "start",
      });
      setPrependedCount(0);
    }
  }, [posts]);

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      className="flex flex-col ptr-posts"
    >
      <Virtuoso
        ref={virtuosoRef}
        useWindowScroll
        data={posts}
        increaseViewportBy={800}
        defaultItemHeight={300} // 예상 포스트 높이
        initialItemCount={Math.max(1, initialPosts.length)} // 초기 아이템 수
        endReached={() => {
          console.log("🔄 endReached 콜백 호출됨");
          fetchOlderPosts();
        }}
        itemContent={(_, post) => (
          <PostPreview
            key={post._id}
            isUserPost={post.author.account_id === userAccountId}
            commentsCount={0}
            {...post}
          />
        )}
        computeItemKey={(_, post) => post._id}
        components={{
          EmptyPlaceholder,
        }}
      />
    </PullToRefresh>
  );
}
