import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import { PostFragmentDoc, UserFragmentDoc, CommentFragmentDoc, PageInfoFragmentDoc } from '../../../../graphql/fragments/global.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PostQueryVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', _id: string, content: string, tags?: string | null, category?: string | null, commentCount: number, nadoCount: number, isNadoed: boolean, isNadoPost: boolean, createdAt: string, author: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string }, nadoer?: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } | null } };

export type PostUserQueryVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
}>;


export type PostUserQuery = { __typename?: 'Query', post: { __typename?: 'Post', author: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } } };

export type CommentsQueryVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
  pagination: Types.PaginationInput;
}>;


export type CommentsQuery = { __typename?: 'Query', comments: { __typename?: 'CommentsQueryResult', comments: Array<{ __typename?: 'Comment', _id: string, content: string, postId: string, createdAt: string, commenter: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } }>, pageInfo: { __typename?: 'PageInfo', hasOverStart: boolean, hasOverEnd: boolean, hasNext: boolean, startCursor?: string | null, endCursor?: string | null } } };


export const PostDocument = gql`
    query Post($postId: String!) {
  post(postId: $postId) {
    ...Post
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables> & ({ variables: PostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export function usePostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostSuspenseQueryHookResult = ReturnType<typeof usePostSuspenseQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostUserDocument = gql`
    query PostUser($postId: String!) {
  post(postId: $postId) {
    author {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __usePostUserQuery__
 *
 * To run a query within a React component, call `usePostUserQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostUserQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostUserQuery(baseOptions: Apollo.QueryHookOptions<PostUserQuery, PostUserQueryVariables> & ({ variables: PostUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostUserQuery, PostUserQueryVariables>(PostUserDocument, options);
      }
export function usePostUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostUserQuery, PostUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostUserQuery, PostUserQueryVariables>(PostUserDocument, options);
        }
export function usePostUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostUserQuery, PostUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostUserQuery, PostUserQueryVariables>(PostUserDocument, options);
        }
export type PostUserQueryHookResult = ReturnType<typeof usePostUserQuery>;
export type PostUserLazyQueryHookResult = ReturnType<typeof usePostUserLazyQuery>;
export type PostUserSuspenseQueryHookResult = ReturnType<typeof usePostUserSuspenseQuery>;
export type PostUserQueryResult = Apollo.QueryResult<PostUserQuery, PostUserQueryVariables>;
export const CommentsDocument = gql`
    query Comments($postId: String!, $pagination: PaginationInput!) {
  comments(postId: $postId, pagination: $pagination) {
    comments {
      ...Comment
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables> & ({ variables: CommentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export function useCommentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsSuspenseQueryHookResult = ReturnType<typeof useCommentsSuspenseQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;