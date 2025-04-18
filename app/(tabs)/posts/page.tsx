import getSession from "@/libs/session";
import { FRIEND_ACCEPTED } from "@/libs/constants";
import { notFound } from "next/navigation";
import Timeline from "@/components/domains/post/timeline";

export const metadata = {
  title: "모아보는",
};

export default async function Posts() {
  const session = await getSession();
  const userAccountId = session.accountId;

  return <Timeline userAccountId={userAccountId} />;
}
