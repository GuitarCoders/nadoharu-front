"use server";

import { getClient } from "@/libs/apollo-client";
import getSession from "@/libs/session";
import { gql } from "@apollo/client";

export interface TimelineResponse {
  getPosts: {
    posts: {
      _id: string;
      author: {
        _id: string;
        name: string;
        account_id: string;
      };
      content: string;
      tags: string;
      category: string;
      commentsCount: number;
      createdAt: string;
    }[];
    lastDateTime: string;
    hasNext: boolean;
  };
}

const query = gql`
  query GetPosts($count: Int!, $filter: getPostFilter) {
    getPosts(getPostsData: { count: $count, filter: $filter }) {
      posts {
        _id
        author {
          _id
          name
          account_id
        }
        content
        tags
        category
        commentsCount
        createdAt
      }
      lastDateTime
      hasNext
    }
  }
`;

export default async function getPosts(): Promise<TimelineResponse> {
  const session = await getSession();
  const client = getClient(session.jwt);
  const { data } = await client.query<TimelineResponse>({
    query,
    variables: { count: 5, filter: undefined },
  });

  return data;
}
