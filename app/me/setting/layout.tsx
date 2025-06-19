import Header from "@/components/shared/layouts/header";

export default async function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-2xl mx-auto">
      <Header title="프로필 수정" canGoBack author={null} />
      <section className={"mt-14 mb-20"}>{children}</section>
    </main>
  );
}
