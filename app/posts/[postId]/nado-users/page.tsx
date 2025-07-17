import ProfileImage from "@/components/domains/profile/image";
import { getNadoUsers } from "../data";
import Link from "next/link";

export default async function NadoUsersListPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const {
    post: { nadoUsers },
  } = await getNadoUsers({ postId, limit: 10 });

  return (
    <section className="flex flex-col divide-y divide-neutral-400 dark:divide-neutral-800">
      {nadoUsers?.users.map((user) => (
        <Link
          href={`/users/${user.account_id}`}
          key={user._id}
          className="flex gap-3 items-center px-4 py-3"
        >
          <ProfileImage key={user._id} avatar={null} name={user.name} />
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-neutral-400 text-xs">@{user.account_id}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
