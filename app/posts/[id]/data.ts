"use server";

import { getClient } from "@/libs/apollo-client";
import {
  GetPostDocument,
  GetPostQuery,
  GetPostUserQuery,
  GetPostUserDocument,
  GetCommentsQuery,
  GetCommentsDocument,
} from "./index.generated";

export async function getPostDetail(postId: string) {
  const client = await getClient();
  const { data } = await client.query<GetPostQuery>({
    query: GetPostDocument,
    variables: { postId },
  });

  return data.getPost;
}

export async function getComments(postId: string) {
  const client = await getClient();
  const { data } = await client.query<GetCommentsQuery>({
    query: GetCommentsDocument,
    variables: { postId, filter: { skip: 0, limit: 10 } },
  });

  return data.getCommentByPostId;
}

export async function getPostUser(postId: string) {
  const client = await getClient();
  const { data } = await client.query<GetPostUserQuery>({
    query: GetPostUserDocument,
    variables: { postId },
  });

  return data.getPost;
}
