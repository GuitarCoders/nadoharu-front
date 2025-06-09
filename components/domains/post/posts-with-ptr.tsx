"use client";

import { getPosts } from "@/app/(tabs)/posts/data";
import PostPreview from "@/components/domains/post/preview";
import EmptyState from "@/components/layouts/empty-state";
import PullToRefresh from "@/components/layouts/pull-to-refresh";
import { Post } from "@/graphql/generated/graphql";
import { toastAtom } from "@/libs/atoms";
import { useSetAtom } from "jotai";
import { useState } from "react";

interface PostsWithRefreshProps {
  initialPosts: Post[];
  initialCursor?: string | null;
  userAccountId: string | undefined;
}

export default function PostsWithPtr({
  initialPosts,
  initialCursor,
  userAccountId,
}: PostsWithRefreshProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentCursor, setCurrentCursor] = useState(initialCursor);

  const setToast = useSetAtom(toastAtom);

  const handleRefresh = async () => {
    try {
      const data = await getPosts({
        pagination: { limit: 20, until: currentCursor },
      });
      const {
        postsForTimeline: { posts, pageInfo },
      } = data;

      if (pageInfo.cursor !== currentCursor) {
        setCurrentCursor(pageInfo.cursor);
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
