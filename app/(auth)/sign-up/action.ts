"use server";

import { getClient } from "@/libs/apollo-client";
import { ActionResponse } from "@/app/types/action";
import {
  SignUpDocument,
  SignUpMutation,
  SignUpMutationVariables,
} from "./(graphql)";

export async function signUp(
  variables: SignUpMutationVariables
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<
      SignUpMutation,
      SignUpMutationVariables
    >({
      mutation: SignUpDocument,
      variables,
    });

    if (data) {
      return {
        success: true,
      };
    } else {
      throw new Error("회원가입에 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error ? error.message : "회원가입에 실패했습니다.",
    };
  }
}
