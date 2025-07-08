"use client";

import { getNewerPosts, getOlderPosts } from "@/app/(tabs)/posts/data";
import PostPreview from "@/components/domains/post/preview";
import EmptyState from "@/components/shared/layouts/empty-state";
import PullToRefresh from "@/components/shared/layouts/pull-to-refresh";
import Spinner from "@/components/shared/layouts/spinner";
import { Post } from "@/graphql/generated/graphql";
import { toastAtom } from "@/libs/atoms";
import { useSetAtom } from "jotai";
import { useState, useRef, useLayoutEffect, forwardRef } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

interface PostsWithRefreshProps {
  initialItemCount: number;
  initialPosts: Post[];
  initialStartCursor?: string | null;
  initialEndCursor?: string | null;
  userAccountId: string | undefined;
}

const DEFAULT_LIMIT = 10;

const DividedList = forwardRef<HTMLDivElement, any>(
  ({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={style}
      className="divide-y divide-neutral-200 dark:divide-neutral-600"
    >
      {children}
    </div>
  )
);
DividedList.displayName = "DividedList";

export default function PostsWithPtr({
  initialItemCount,
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

      if (olderPosts.length > 0) {
        setPosts((prev) => [...prev, ...olderPosts]);
      }
      if (pageInfo.endCursor && pageInfo.hasNext) {
        setCurrentEndCursor(pageInfo.endCursor);
      } else {
        setCurrentEndCursor(null);
      }
    } catch {
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
        initialItemCount={initialItemCount - 1}
        increaseViewportBy={400}
        defaultItemHeight={178}
        endReached={fetchOlderPosts}
        itemContent={(_, post) => (
          <PostPreview
            key={post._id + post.nadoer?._id}
            isUserPost={post.author.account_id === userAccountId}
            {...post}
          />
        )}
        computeItemKey={(_, post) => post._id + post.nadoer?._id}
        components={{
          List: DividedList,
        }}
      />
      {isLoadingOlder && <Spinner className="mx-auto my-6" />}
      {posts.length === 0 && <EmptyState text="조금 허전한데요" />}
    </PullToRefresh>
  );
}
