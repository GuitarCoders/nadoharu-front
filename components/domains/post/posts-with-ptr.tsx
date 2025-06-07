"use client";

import { getPosts } from "@/app/(tabs)/posts/data";
import PostPreview from "@/components/domains/post/preview";
import EmptyState from "@/components/layouts/empty-state";
import PullToRefresh from "@/components/layouts/pull-to-refresh";
import { Post } from "@/graphql/generated/graphql";
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
  const [cursor, setCursor] = useState(initialCursor);

  const handleRefresh = async () => {
    const data = await getPosts({ pagination: { limit: 20, cursor } });
    if (!data) {
      return;
    }
    const {
      postsForTimeline: { posts, pageInfo },
    } = data;

    if (pageInfo.hasNext) {
      setCursor(pageInfo.cursor);
    }
    setPosts((prev) => [...posts, ...prev]);
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
