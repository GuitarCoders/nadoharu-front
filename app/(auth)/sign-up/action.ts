"use server";

import { getClient } from "@/libs/apollo-client";
import { ActionResponse } from "@/app/types/action";
import { SignUpDocument, SignUpMutation } from "./index.generated";

export interface SignUpFormData {
  name: string;
  account_id: string;
  email: string;
  password: string;
}

export async function signUp(
  variables: SignUpFormData
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<SignUpMutation>({
      mutation: SignUpDocument,
      variables,
    });

    if (data) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
      };
    }
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      errors: error,
    };
  }
}
