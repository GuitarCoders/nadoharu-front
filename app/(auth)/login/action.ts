"use server";

import { getClient } from "@/libs/apollo-client";
import getSession from "@/libs/session";
import { ActionResponse } from "@/app/types/action";
import { GetLoginDocument } from "./index.generated";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  login: {
    _id: string;
    name: string;
    email: string;
    account_id: string;
    about_me: string;
    friends: string[];
    status: string;
    jwt_token: string;
  };
}

export async function login(variables: LoginFormData): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.query<LoginResponse>({
      query: GetLoginDocument,
      variables,
    });

    if (data) {
      const session = await getSession();
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
