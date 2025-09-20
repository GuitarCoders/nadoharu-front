import PostDetail from "@/app/posts/[postId]/page";
import PostLayout from "@/app/posts/[postId]/layout";
import ModalWrapper from "@/components/shared/layouts/modal-wrapper";

export default function PostDetailModal({
  params,
}: {
  params: { postId: string };
}) {
  return (
    <ModalWrapper>
      <PostLayout params={params}>
        <PostDetail params={params} />
      </PostLayout>
    </ModalWrapper>
  );
}
