"use server";

import { getClient } from "@/libs/apollo-client";
import getSession from "@/libs/session";
import { ActionResponse } from "@/app/types/action";
import { GetLoginDocument, GetLoginQuery } from "./index.generated";

export interface LoginFormData {
  username: string;
  password: string;
}

export async function login(variables: LoginFormData): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.query<GetLoginQuery>({
      query: GetLoginDocument,
      variables,
    });

    if (data) {
      const session = await getSession();

      session._id = data.login._id;
      session.accountId = data.login.account_id;
      session.jwt = data.login.jwt_token;

      await session.save();
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      ok: false,
    };
  }
}
