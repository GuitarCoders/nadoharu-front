"use server";

import { getClient } from "@/libs/apollo-client";
import getSession from "@/libs/session";
import { ActionResponse } from "@/app/types/action";
import { LoginDocument, LoginQuery, LoginQueryVariables } from "./(graphql)";

export async function login(
  variables: LoginQueryVariables
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.query<LoginQuery, LoginQueryVariables>({
      query: LoginDocument,
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
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error ? error.message : "로그인에 실패했습니다.",
    };
  }
}
