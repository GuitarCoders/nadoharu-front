"use server";

import { getClient } from "@/libs/apollo-client";
import {
  UserByAccountIdDocument,
  UserByAccountIdQuery,
  UserByAccountIdQueryVariables,
} from "./index.generated";

export async function getUserByAccountId(
  variables: UserByAccountIdQueryVariables
) {
  try {
    const client = await getClient();
    const { data } = await client.query<
      UserByAccountIdQuery,
      UserByAccountIdQueryVariables
    >({
      query: UserByAccountIdDocument,
      variables,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
