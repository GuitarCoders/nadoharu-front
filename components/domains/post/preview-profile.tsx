"use client";

import Image from "next/image";
import Link from "next/link";

interface PostPreviewProfileProps {
  profile_image_url?: string | null;
  username: string;
  loginId: string;
}

export default function PostPreviewProfile({
  profile_image_url,
  username,
  loginId,
}: PostPreviewProfileProps) {
  return (
    <Link
      prefetch={false}
      href={`/users/${loginId}`}
      className="flex items-center gap-3"
    >
      {profile_image_url ? (
        <Image
          src={profile_image_url}
          alt={username}
          width={40}
          height={40}
          className="size-10 rounded-md bg-neutral-200 dark:bg-neutral-600 object-cover shadow-sm"
        />
      ) : (
        <div className="size-10 bg-neutral-200 dark:bg-neutral-600 rounded-md shadow-sm" />
      )}
      <div className="flex flex-col">
        <h2 className="font-semibold text-sm">{username}</h2>
      </div>
    </Link>
  );
}
