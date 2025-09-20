"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import Footer from "@/components/shared/layouts/footer";
import Header from "@/components/shared/layouts/header";
import { TABS } from "@/libs/constants";

export default function TabsLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <main className="max-w-2xl mx-auto">
        <Header
          title={TABS.find((tab) => tab.link === pathname)?.name}
          author={null}
        >
          {pathname === "/chat" ? (
            <Link
              href="/chat/new"
              className="text-violet-600 dark:text-violet-400"
            >
              <PlusIcon className="size-6" />
            </Link>
          ) : (
            <Link
              href="/posts/new"
              className="text-violet-600 dark:text-violet-400"
            >
              <PencilSquareIcon className="size-6" />
            </Link>
          )}
        </Header>
        <section className="mt-14 mb-24">{children}</section>
        <Footer />
      </main>
      {modal}
    </>
  );
}
