"use server";

import { getClient } from "@/libs/apollo-client";
import {
  PaginationFrom,
  PaginationInput,
  PaginationSort,
} from "@/graphql/generated/graphql";
import {
  PostDocument,
  PostQuery,
  PostUserQuery,
  PostUserDocument,
  CommentsQuery,
  CommentsDocument,
  PostQueryVariables,
  PostUserQueryVariables,
  CommentsQueryVariables,
} from "./(graphql)";

export async function getPostDetail(
  variables: PostQueryVariables
): Promise<PostQuery> {
  const client = await getClient();
  const { data } = await client.query<PostQuery, PostQueryVariables>({
    query: PostDocument,
    variables,
  });

  return data;
}

export async function getComments({
  postId,
  limit,
  cursor,
}: {
  postId: string;
  limit: number;
  cursor?: string;
}): Promise<CommentsQuery> {
  const client = await getClient();
  const { data } = await client.query<CommentsQuery, CommentsQueryVariables>({
    query: CommentsDocument,
    variables: {
      postId,
      pagination: {
        limit,
        cursor,
        from: PaginationFrom.End,
        sort: PaginationSort.Asc,
      },
    },
  });

  return data;
}

export async function getPostUser(variables: PostUserQueryVariables) {
  const client = await getClient();
  const { data } = await client.query<PostUserQuery, PostUserQueryVariables>({
    query: PostUserDocument,
    variables,
  });

  return data.post;
}
