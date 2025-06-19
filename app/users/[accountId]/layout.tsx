import Header from "@/components/shared/layouts/header";
import { notFound } from "next/navigation";
import { getUserByAccountId } from "./data";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;
  const user = await getUserByAccountId(accountId);
  if (!user) {
    return notFound();
  }

  return (
    <main className="max-w-2xl mx-auto">
      <Header author={user.userByAccountId} canGoBack />
      <section className={"mt-14 mb-20"}>{children}</section>
    </main>
  );
}
