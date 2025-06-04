"use server";

import { getClient } from "@/libs/apollo-client";
import {
  PostDocument,
  PostQuery,
  PostUserQuery,
  PostUserDocument,
  CommentsQuery,
  CommentsDocument,
} from "./index.generated";

export async function getPostDetail(postId: string) {
  const client = await getClient();
  const { data } = await client.query<PostQuery>({
    query: PostDocument,
    variables: { postId },
  });

  return data.post;
}

export async function getComments(postId: string) {
  const client = await getClient();
  const { data } = await client.query<CommentsQuery>({
    query: CommentsDocument,
    variables: { postId, filter: { skip: 0, limit: 10 } },
  });

  return data.comments;
}

export async function getPostUser(postId: string) {
  const client = await getClient();
  const { data } = await client.query<PostUserQuery>({
    query: PostUserDocument,
    variables: { postId },
  });

  return data.post;
}
