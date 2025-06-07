"use server";

import { getClient } from "@/libs/apollo-client";
import { PaginationInput } from "@/graphql/generated/graphql";
import {
  PostDocument,
  PostQuery,
  PostUserQuery,
  PostUserDocument,
  CommentsQuery,
  CommentsDocument,
} from "./(graphql)";

export async function getPostDetail(variables: {
  postId: string;
}): Promise<PostQuery> {
  const client = await getClient();
  const { data } = await client.query<PostQuery>({
    query: PostDocument,
    variables,
  });

  return data;
}

export async function getComments(variables: {
  postId: string;
  pagination: PaginationInput;
}): Promise<CommentsQuery> {
  const client = await getClient();
  const { data } = await client.query<CommentsQuery>({
    query: CommentsDocument,
    variables,
  });

  return data;
}

export async function getPostUser(variables: { postId: string }) {
  const client = await getClient();
  const { data } = await client.query<PostUserQuery>({
    query: PostUserDocument,
    variables,
  });

  return data.post;
}
