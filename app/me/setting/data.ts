"use server";

import { getClient } from "@/libs/apollo-client";
import {
  UserByAccountIdDocument,
  UserByAccountIdQuery,
  UserByAccountIdQueryVariables,
} from "./_graphql";
import {
  RequestImageUploadUrlDocument,
  RequestImageUploadUrlQuery,
  RequestImageUploadUrlQueryVariables,
} from "@/graphql/generated/graphql";

export async function getUserByAccountId(
  variables: UserByAccountIdQueryVariables
): Promise<UserByAccountIdQuery> {
  const client = await getClient();
  const { data } = await client.query<
    UserByAccountIdQuery,
    UserByAccountIdQueryVariables
  >({
    query: UserByAccountIdDocument,
    variables,
  });

  return data;
}

export async function getImageUploadUrl(): Promise<RequestImageUploadUrlQuery> {
  const client = await getClient();
  const { data } = await client.query<
    RequestImageUploadUrlQuery,
    RequestImageUploadUrlQueryVariables
  >({
    query: RequestImageUploadUrlDocument,
  });

  return data;
}
