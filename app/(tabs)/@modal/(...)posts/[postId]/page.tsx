import PostDetail from "@/app/posts/[postId]/page";
import PostLayout from "@/app/posts/[postId]/layout";
import ModalWrapper from "@/components/shared/layouts/modal-wrapper";

export default async function PostDetailModal({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const resolvedParams = await params;
  return (
    <ModalWrapper>
      <PostLayout params={params}>
        <PostDetail params={resolvedParams} />
      </PostLayout>
    </ModalWrapper>
  );
}
