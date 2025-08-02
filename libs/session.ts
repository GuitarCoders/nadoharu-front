import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionContent {
  _id?: string;
  accountId?: string;
  jwt?: string;
}

export default async function getSession() {
  const nextCookies = await cookies();
  return getIronSession<SessionContent>(nextCookies, {
    cookieName: "nadoharu",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
