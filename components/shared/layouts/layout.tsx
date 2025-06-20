"use client";

import { NextPage } from "next";
import { JSX, ReactNode } from "react";
import FooterItem from "@/components/shared/layouts/footer-item";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  profile?: { name: string; account_id: string };
  children: ReactNode | ReactNode[];
  showNewPostBtn?: boolean;
  showNewChatBtn?: boolean;
}

const Layout: NextPage<LayoutProps> = ({
  title,
  canGoBack,
  profile,
  children,
  showNewPostBtn,
  showNewChatBtn,
}) => {
  const router = useRouter();
  return (
    <main className="max-w-2xl mx-auto">
      <header className="px-4 h-14 border-b-2 border-violet-600 dark:border-violet-400 text-center fixed flex justify-between top-0 max-w-2xl w-full bg-white dark:bg-neutral-800 z-20 shadow-md">
        <section className="flex items-center gap-4">
          {canGoBack ? (
            <button>
              <ChevronLeftIcon onClick={router.back} className="size-6" />
            </button>
          ) : null}
          {!profile && title ? (
            <h1 className="text-lg font-bold text-violet-600 dark:text-violet-400">
              {title}
            </h1>
          ) : null}
          {profile ? (
            <Link
              href={`/users/${profile.account_id}`}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-neutral-300 rounded-md" />
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-sm">{profile.name}</h3>
                <p className="text-gray-400 text-xs">@{profile.account_id}</p>
              </div>
            </Link>
          ) : null}
        </section>
        <section className="flex items-center gap-5">
          {showNewChatBtn ? (
            <Link
              href="/chat/new"
              className="text-violet-600 dark:text-violet-400"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
            </Link>
          ) : null}
          {showNewPostBtn ? (
            <Link
              href="/posts/upload"
              className="text-violet-600 dark:text-violet-400"
            >
              <PencilSquareIcon className="size-6" />
            </Link>
          ) : null}
        </section>
      </header>
      <section className="mt-14 mb-20">{children}</section>
      {canGoBack ? null : (
        <footer className="max-w-2xl w-full grid grid-cols-4 mx-auto h-20 bg-violet-600 dark:bg-neutral-800 fixed bottom-0 border-t-2 border-violet-800 dark:border-violet-400 z-20">
          <FooterItem title="모아보는" link="/posts" />
          <FooterItem title="알림" link="/notifications" />
          <FooterItem title="메시지" link="/chat" />
          <FooterItem title="나는" link="/me" />
        </footer>
      )}
    </main>
  );
};

export default Layout;
