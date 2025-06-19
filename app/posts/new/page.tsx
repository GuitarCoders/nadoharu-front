import Layout from "@/components/shared/layouts/layout";
import UploadPostForm from "@/components/domains/post/upload-post-form";

export default async function UploadPost() {
  return (
    <Layout canGoBack title="새 글 업로드">
      <section className="p-4">
        <UploadPostForm />
      </section>
    </Layout>
  );
}
