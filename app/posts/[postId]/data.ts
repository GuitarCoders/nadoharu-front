"use server";

import { getClient } from "@/libs/apollo-client";
import {
  PaginationFrom,
  PaginationSort,
  RequestImageUploadUrlQuery,
  RequestImageUploadUrlDocument,
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
  NadoUsersQuery,
  NadoUsersDocument,
  NadoUsersQueryVariables,
  RequestImageUploadUrlQueryVariables,
} from "./_graphql";

export async function getPostDetail(variables: {
  postId: string;
}): Promise<PostQuery> {
  const client = await getClient();
  const { data } = await client.query<PostQuery, PostQueryVariables>({
    query: PostDocument,
    variables: {
      ...variables,
      nadoUsersPagination: {
        limit: 10,
        cursor: undefined,
        from: PaginationFrom.End,
        sort: PaginationSort.Desc,
      },
    },
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

export async function getNadoUsers({
  postId,
  limit,
  cursor,
}: {
  postId: string;
  limit: number;
  cursor?: string;
}): Promise<NadoUsersQuery> {
  const client = await getClient();
  const { data } = await client.query<NadoUsersQuery, NadoUsersQueryVariables>({
    query: NadoUsersDocument,
    variables: {
      postId,
      pagination: {
        limit,
        cursor,
        from: PaginationFrom.End,
        sort: PaginationSort.Desc,
      },
    },
  });

  return data;
}

export async function getRequestImageUploadUrl(): Promise<RequestImageUploadUrlQuery> {
  const client = await getClient();
  const { data } = await client.query<
    RequestImageUploadUrlQuery,
    RequestImageUploadUrlQueryVariables
  >({
    query: RequestImageUploadUrlDocument,
  });

  return data;
}
