import getSession from "@/libs/session";
import TimelineWithQuery from "@/components/domains/post/timeline-with-query";

export const metadata = {
  title: "모아보는",
};

export default async function Posts() {
  const session = await getSession();
  const userAccountId = session.accountId;

  return <TimelineWithQuery userAccountId={userAccountId} />;
}
