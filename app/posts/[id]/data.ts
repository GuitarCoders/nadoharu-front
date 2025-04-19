import { getClient } from "@/libs/apollo-client";
import getSession from "@/libs/session";
import { gql } from "@apollo/client";

interface PostDetailResponse {
  getPost: {
    _id: string;
    content: string;
    tags: string;
    category: string;
    commentsCount: number;
    createdAt: string;
    author: {
      _id: string;
      name: string;
      account_id: string;
    };
  };
}

export const postDetailQuery = gql`
  query GetPost($postId: String!) {
    getPost(postId: $postId) {
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
  }
`;

interface CommentsResponse {
  getCommentByPostId: {
    comments: {
      _id: string;
      content: string;
      postId: string;
      Commenter: {
        _id: string;
        name: string;
      };
      createdAt: string;
    }[];
    hasNext: boolean;
  };
}

const commentsQuery = gql`
  query GetComments($postId: String!, $filter: commentFilter!) {
    getCommentByPostId(postId: $postId, filter: $filter) {
      comments {
        _id
        content
        postId
        Commenter {
          _id
          name
        }
        createdAt
      }
      hasNext
    }
  }
`;

interface PostUserResponse {
  getPost: {
    author: {
      _id: string;
      name: string;
      account_id: string;
    };
  };
}

export const postUserQuery = gql`
  query GetPost($postId: String!) {
    getPost(postId: $postId) {
      author {
        _id
        name
        account_id
      }
    }
  }
`;

const session = await getSession();
const client = getClient(session.jwt);

export async function getPostDetail(postId: string) {
  const { data } = await client.query<PostDetailResponse>({
    query: postDetailQuery,
    variables: { postId },
  });

  return data.getPost;
}

export async function getComments(postId: string) {
  const { data } = await client.query<CommentsResponse>({
    query: commentsQuery,
    variables: { postId, filter: { skip: 0, limit: 10 } },
  });

  return data.getCommentByPostId;
}

export async function getPostUser(postId: string) {
  const { data } = await client.query<PostUserResponse>({
    query: postUserQuery,
    variables: { postId },
  });

  return data.getPost;
}
