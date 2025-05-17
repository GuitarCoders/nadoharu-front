import EditProfileForm from "@/components/domains/profile/edit-profile-form";
import { getUserByAccountId } from "@/graphql/query/user";
import getSession from "@/libs/session";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { notFound, redirect } from "next/navigation";

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
  const user = await getUserByAccountId(session.accountId);
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
      <form action={logout} className="p-4">
        <button className="flex items-center justify-center gap-2 border-2 border-violet-400 dark:border-violet-600 focus:ring-violet-600 w-full py-2 rounded-md outline-none focus:ring-2">
          다른 계정으로 로그인
          <ArrowLeftStartOnRectangleIcon className="size-5" />
        </button>
      </form>
    </div>
  );
}
