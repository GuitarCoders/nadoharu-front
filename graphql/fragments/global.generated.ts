import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
export type UserFragment = { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string, profile_image_url?: string | null };

export type PageInfoFragment = { __typename?: 'PageInfo', hasOverStart: boolean, hasOverEnd: boolean, hasNext: boolean, startCursor?: string | null, endCursor?: string | null };

export type NadoUsersFragment = { __typename?: 'NadoUsers', users: Array<{ __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string, profile_image_url?: string | null }>, pageInfo: { __typename?: 'PageInfo', hasOverStart: boolean, hasOverEnd: boolean, hasNext: boolean, startCursor?: string | null, endCursor?: string | null } };

export type PostFragment = { __typename?: 'Post', _id: string, content: string, tags?: string | null, category?: string | null, imageUrls?: Array<string> | null, commentCount: number, nadoCount: number, isNadoed: boolean, isNadoPost: boolean, createdAt: string, author: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string, profile_image_url?: string | null }, nadoer?: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string, profile_image_url?: string | null } | null, nadoUsers?: { __typename?: 'NadoUsers', users: Array<{ __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string, profile_image_url?: string | null }>, pageInfo: { __typename?: 'PageInfo', hasOverStart: boolean, hasOverEnd: boolean, hasNext: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type CommentFragment = { __typename?: 'Comment', _id: string, content: string, postId: string, createdAt: string, commenter: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string, profile_image_url?: string | null } };

export const UserFragmentDoc = gql`
    fragment User on User {
  _id
  name
  email
  account_id
  about_me
  profile_image_url
}
    `;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  hasOverStart
  hasOverEnd
  hasNext
  startCursor
  endCursor
}
    `;
export const NadoUsersFragmentDoc = gql`
    fragment NadoUsers on NadoUsers {
  users {
    ...User
  }
  pageInfo {
    ...PageInfo
  }
}
    `;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  _id
  content
  tags
  category
  imageUrls
  commentCount
  nadoCount
  isNadoed
  isNadoPost
  createdAt
  author {
    ...User
  }
  nadoer {
    ...User
  }
  nadoUsers {
    ...NadoUsers
  }
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  _id
  content
  postId
  createdAt
  commenter {
    ...User
  }
}
    `;