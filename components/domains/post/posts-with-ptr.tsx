"use client";

import { getNewerPosts, getOlderPosts } from "@/app/(tabs)/posts/data";
import PostPreview from "@/components/domains/post/preview";
import EmptyState from "@/components/shared/layouts/empty-state";
import PullToRefresh from "@/components/shared/layouts/pull-to-refresh";
import Spinner from "@/components/shared/layouts/spinner";
import { Post } from "@/graphql/generated/graphql";
import { toastAtom } from "@/libs/atoms";
import { useSetAtom } from "jotai";
import { useState, forwardRef, useRef } from "react";
import { VList, VListHandle } from "virtua";

interface PostWithPtrProps {
  initialItemCount: number;
  initialPosts: Post[];
  initialStartCursor?: string | null;
  initialEndCursor?: string | null;
  initialHasOverStart?: boolean;
  initialHasOverEnd?: boolean;
  userAccountId: string | undefined;
}

const DEFAULT_LIMIT = 10;

export default function PostWithPtr({
  initialItemCount,
  initialPosts,
  initialStartCursor,
  initialEndCursor,
  initialHasOverStart,
  initialHasOverEnd,
  userAccountId,
}: PostWithPtrProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentStartCursor, setCurrentStartCursor] =
    useState(initialStartCursor);
  const [currentEndCursor, setCurrentEndCursor] = useState(initialEndCursor);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [hasOverStart, setHasOverStart] = useState(initialHasOverStart);
  const [hasOverEnd, setHasOverEnd] = useState(initialHasOverEnd);

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

      setHasOverEnd(pageInfo.hasOverEnd);
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

      setHasOverStart(pageInfo.hasOverStart);
      if (pageInfo.startCursor && pageInfo.startCursor !== currentStartCursor) {
        setCurrentStartCursor(pageInfo.startCursor);
      }

      if (newPosts.length > 0) {
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

  const scrollContainerRef = useRef<VListHandle>(null);
  const [shift, setShift] = useState(false);

  const onScroll = () => {
    if (!scrollContainerRef.current) return;
    if (hasOverStart && scrollContainerRef.current.findStartIndex() < 2) {
      setShift(true);
    }
    if (
      hasOverEnd &&
      scrollContainerRef.current.findEndIndex() >= posts.length - 2
    ) {
      fetchOlderPosts();
      setShift(false);
    }
  };

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      className="flex-1 ptr-posts"
      getScrollOffset={() =>
        scrollContainerRef.current ? scrollContainerRef.current.scrollOffset : 0
      }
    >
      <VList
        ref={scrollContainerRef}
        onScroll={onScroll}
        shift={shift}
        style={{ height: "calc(100vh - 152px)" }}
        className="relative h-full"
      >
        {posts.map((post, i) => (
          <PostPreview
            key={post._id + post.nadoer?._id}
            isUserPost={post.author.account_id === userAccountId}
            className={
              i ? "border-t border-neutral-200 dark:border-neutral-800" : ""
            }
            {...post}
          />
        ))}
        {isLoadingOlder && <Spinner className="mx-auto my-6" />}
        {posts.length === 0 && <EmptyState text="조금 허전한데요" />}
      </VList>
    </PullToRefresh>
  );
}
