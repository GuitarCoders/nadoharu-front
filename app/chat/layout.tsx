import Header from "@/components/shared/layouts/header";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function ChatLayout({ children }: LayoutProps) {
  return (
    <main className="max-w-2xl mx-auto">
      <Header canGoBack author={null} />
      <section className="mt-14 mb-20">{children}</section>
    </main>
  );
}
