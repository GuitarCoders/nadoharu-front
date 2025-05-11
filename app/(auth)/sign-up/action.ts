"use server";

import { getClient } from "@/libs/apollo-client";
import { ActionResponse } from "@/app/types/action";
import { SignUpDocument } from "./index.generated";

export interface SignUpFormData {
  name: string;
  account_id: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  createUser: {
    _id: string;
    name: string;
    email: string;
    account_id: string;
    about_me: string;
    friends: string[];
  };
}

export async function signUp(
  variables: SignUpFormData,
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<SignUpResponse>({
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
