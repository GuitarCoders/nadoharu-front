"use server";

import { getClient } from "@/libs/apollo-client";
import { UpdateUserDocument } from "./index.generated";
import { ActionResponse } from "@/app/types/action";

export async function updateUser(variables: {
  name: string;
  about_me: string;
  password: string;
}): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: UpdateUserDocument,
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
    };
  }
}
