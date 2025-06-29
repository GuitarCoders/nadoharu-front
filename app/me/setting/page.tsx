import EditProfileForm from "@/components/domains/profile/edit-profile-form";
import { getUserByAccountId } from "./data";
import getSession from "@/libs/session";
import {
  ArrowLeftStartOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function EditProfile() {
  async function logout() {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/login");
  }

  const session = await getSession();
  if (!session.accountId) {
    return notFound();
  }
  const user = await getUserByAccountId({
    account_id: session.accountId,
  });
  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col">
      <EditProfileForm
        name={user.userByAccountId.name}
        aboutMe={user.userByAccountId.about_me}
        accountId={user.userByAccountId.account_id}
      />
      <form action={logout} className="flex flex-col gap-4 p-4">
        <Link
          href="/me/setting/password"
          className="flex gap-2 justify-center items-center py-2 w-full rounded-md border-2 border-violet-400 outline-none dark:border-violet-600 focus:ring-violet-600 focus:ring-2"
        >
          <LockClosedIcon className="size-5" />
          비밀번호 변경
        </Link>
        <button className="flex gap-2 justify-center items-center py-2 w-full rounded-md border-2 border-violet-400 outline-none dark:border-violet-600 focus:ring-violet-600 focus:ring-2">
          <ArrowLeftStartOnRectangleIcon className="size-5" />
          로그아웃
        </button>
      </form>
    </div>
  );
}
