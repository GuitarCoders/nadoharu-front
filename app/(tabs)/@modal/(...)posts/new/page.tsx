import ModalWrapper from "@/components/shared/layouts/modal-wrapper";
import Header from "@/components/shared/layouts/header";
import UploadPostForm from "@/components/domains/post/upload-post-form";
import { getRequestImageUploadUrl } from "@/app/posts/[postId]/data";

export default async function UploadPostModal() {
  const { requestImageUploadUrl } = await getRequestImageUploadUrl();
  return (
    <ModalWrapper>
      <main className="max-w-2xl mx-auto">
        <Header canGoBack title="새 글 업로드" author={null} />
        <section className="mt-14 mb-20 p-4">
          <UploadPostForm
            uploadUrl={requestImageUploadUrl.uploadUrl}
            publicUrl={requestImageUploadUrl.publicUrl}
          />
        </section>
      </main>
    </ModalWrapper>
  );
}
