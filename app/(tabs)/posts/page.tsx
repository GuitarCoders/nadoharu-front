import getSession from "@/libs/session";
import { notFound } from "next/navigation";
import getPosts from "./data";
import PostPreview from "@/components/domains/post/preview";
import EmptyState from "@/components/layouts/empty-state";

export const metadata = {
  title: "모아보는",
};

export default async function Posts() {
  const session = await getSession();
  const userAccountId = session.accountId;

  const data = await getPosts();
  if (!data) {
    return notFound();
  }
  const {
    getPosts: { posts },
  } = data;

  return (
    <section className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-600">
      {posts.length ? (
        posts.map((post) => (
          <PostPreview
            key={post._id}
            isUserPost={post.author.account_id === userAccountId}
            {...post}
          />
        ))
      ) : (
        <EmptyState text="조금 허전한데요" />
      )}
    </section>
  );
}
