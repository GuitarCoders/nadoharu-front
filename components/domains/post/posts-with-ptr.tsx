"use client";

import { getNewerPosts } from "@/app/(tabs)/posts/data";
import PostPreview from "@/components/domains/post/preview";
import EmptyState from "@/components/layouts/empty-state";
import PullToRefresh from "@/components/layouts/pull-to-refresh";
import { PaginationFrom, Post } from "@/graphql/generated/graphql";
import { toastAtom } from "@/libs/atoms";
import { useSetAtom } from "jotai";
import { useState } from "react";

interface PostsWithRefreshProps {
  initialPosts: Post[];
  initialStartCursor?: string | null;
  initialEndCursor?: string | null;
  userAccountId: string | undefined;
}

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

  const setToast = useSetAtom(toastAtom);

  const handleRefresh = async () => {
    try {
      const data = await getNewerPosts({
        limit: 20,
        cursor: currentStartCursor,
      });
      const {
        postsForTimeline: { posts, pageInfo },
      } = data;

      if (pageInfo.startCursor && pageInfo.startCursor !== currentStartCursor) {
        setCurrentStartCursor(pageInfo.startCursor);
      }
      setPosts((prev) => [...posts, ...prev]);
    } catch {
      setToast({
        visible: true,
        title: "데이터를 불러오는데 실패했습니다.",
        isError: true,
      });
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="flex flex-col">
      {posts.length ? (
        posts.map((post) => (
          <PostPreview
            key={post._id}
            isUserPost={post.author.account_id === userAccountId}
            commentsCount={0}
            {...post}
          />
        ))
      ) : (
        <EmptyState text="조금 허전한데요" />
      )}
    </PullToRefresh>
  );
}
