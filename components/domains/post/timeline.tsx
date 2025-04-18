import getPosts from "@/app/(tabs)/posts/data";
import PostPreview from "@/components/domains/post/preview";
import EmptyState from "@/components/layouts/empty-state";
import { notFound } from "next/navigation";

export default async function Timeline(userAccountId?: string) {
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
          <PostPreview key={post._id} userAccountId={userAccountId} {...post} />
        ))
      ) : (
        <EmptyState text="조금 허전한데요" />
      )}
    </section>
  );
}
