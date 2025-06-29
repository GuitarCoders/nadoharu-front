"use server";

import { getClient } from "@/libs/apollo-client";
import { UpdateUserDocument } from "./index.generated";
import { ActionResponse } from "@/app/types/action";

export async function updateUser(variables: {
  name: string;
  about_me: string;
}): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: UpdateUserDocument,
      variables,
    });

    if (data) {
      return {
        success: true,
      };
    } else {
      throw new Error("유저 정보를 업데이트하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "유저 정보를 업데이트하는데 실패했습니다.",
    };
  }
}
