"use client";

import { useState } from "react";
import EmptyState from "@/components/shared/layouts/empty-state";
import PostPreview from "@/components/domains/post/preview";
import { Post } from "@/graphql/generated/graphql";

interface UserTimelineProps {
  posts: Post[];
  reposts: [];
  accountId: string;
}

type Tab = "posts" | "media" | "reposts";

const tabs: { name: Tab; label: string }[] = [
  {
    name: "posts",
    label: "이야기",
  },
  {
    name: "media",
    label: "미디어",
  },
  {
    name: "reposts",
    label: "나도",
  },
];

export default function UserTimeline({
  posts,
  reposts,
  accountId,
}: UserTimelineProps) {
  const [currentTab, setCurrentTab] = useState<Tab>("posts");

  // // 원본 포스트의 ID 목록
  // const originalPostIds = new Set(posts.map((post) => post.id));

  // // reposts에서 원본 포스트와 중복되는 것 제외
  // const filteredReposts = reposts.filter(
  //   (repost) => !originalPostIds.has(repost.post.id)
  // );

  // const allMediaPosts = posts.filter((post) => post.photos.length > 0);

  // const allPosts = [...posts, ...filteredReposts].sort(
  //   (prev, curr) =>
  //     new Date(curr.createdAt).getTime() - new Date(prev.createdAt).getTime()
  // );

  return (
    <>
      <div className="grid grid-cols-3 h-12 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`cursor-pointer ${
              tab.name === currentTab ? "text-violet-400 font-bold" : ""
            }`}
            onClick={() => setCurrentTab(tab.name)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {currentTab === "posts" ? (
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-600">
          {posts.length ? (
            posts.map((post) => (
              <PostPreview key={post._id} isUserPost {...post} />
            ))
          ) : (
            <EmptyState text="아직 글을 작성하지 않았나보네요!" userInfo />
          )}
        </div>
      ) : null}
      {/* {currentTab === "media" ? (
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-600">
          {allMediaPosts.length ? (
            allMediaPosts.map((post) => (
              <PostPreview key={post.id} post={post} userId={userId} />
            ))
          ) : (
            <EmptyState text="아직 미디어가 없어요!" userInfo />
          )}
        </div>
      ) : null}
      {currentTab === "reposts" ? (
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-600">
          {reposts.length ? (
            reposts.map((post) => (
              <PostPreview
                key={post.post.id}
                post={post.post}
                userId={userId}
                repostUser={post.user}
              />
            ))
          ) : (
            <EmptyState text="아직 공감한 글이 없어요!" userInfo />
          )}
        </div>
      ) : null} */}
    </>
  );
}
