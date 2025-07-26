import Layout from "@/components/shared/layouts/layout";
import UploadPostForm from "@/components/domains/post/upload-post-form";
import { getRequestImageUploadUrl } from "../[postId]/data";

export default async function UploadPost() {
  const { requestImageUploadUrl } = await getRequestImageUploadUrl();
  return (
    <Layout canGoBack title="새 글 업로드">
      <section className="p-4">
        <UploadPostForm
          uploadUrl={requestImageUploadUrl.uploadUrl}
          publicUrl={requestImageUploadUrl.publicUrl}
        />
      </section>
    </Layout>
  );
}
