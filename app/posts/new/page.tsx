import Layout from "@/components/layouts/layout";
import NewPostForm from "@/components/domains/post/new-post-form";

export default async function UploadPost() {
  return (
    <Layout canGoBack title="새 글 업로드">
      <section className="p-4">
        <NewPostForm />
      </section>
    </Layout>
  );
}
