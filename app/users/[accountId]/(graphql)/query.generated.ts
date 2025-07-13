import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import { UserFragmentDoc, PostFragmentDoc, NadoUsersFragmentDoc, PageInfoFragmentDoc } from '../../../../graphql/fragments/global.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserByAccountIdQueryVariables = Types.Exact<{
  account_id: Types.Scalars['String']['input'];
}>;


export type UserByAccountIdQuery = { __typename?: 'Query', userByAccountId: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } };

export type PostsByUserIdQueryVariables = Types.Exact<{
  targetUserId: Types.Scalars['String']['input'];
  filter: Types.PostFilter;
  pagination: Types.PaginationInput;
}>;


export type PostsByUserIdQuery = { __typename?: 'Query', postsByUserId: { __typename?: 'PostsQueryResult', posts: Array<{ __typename?: 'Post', _id: string, content: string, tags?: string | null, category?: string | null, commentCount: number, nadoCount: number, isNadoed: boolean, isNadoPost: boolean, createdAt: string, author: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string }, nadoer?: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } | null, nadoUsers?: { __typename?: 'NadoUsers', users: Array<{ __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string }>, pageInfo: { __typename?: 'PageInfo', hasOverStart: boolean, hasOverEnd: boolean, hasNext: boolean, startCursor?: string | null, endCursor?: string | null } } | null }>, pageInfo: { __typename?: 'PageInfo', hasOverStart: boolean, hasOverEnd: boolean, hasNext: boolean, startCursor?: string | null, endCursor?: string | null } } };


export const UserByAccountIdDocument = gql`
    query UserByAccountId($account_id: String!) {
  userByAccountId(account_id: $account_id) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserByAccountIdQuery__
 *
 * To run a query within a React component, call `useUserByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByAccountIdQuery({
 *   variables: {
 *      account_id: // value for 'account_id'
 *   },
 * });
 */
export function useUserByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<UserByAccountIdQuery, UserByAccountIdQueryVariables> & ({ variables: UserByAccountIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByAccountIdQuery, UserByAccountIdQueryVariables>(UserByAccountIdDocument, options);
      }
export function useUserByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByAccountIdQuery, UserByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByAccountIdQuery, UserByAccountIdQueryVariables>(UserByAccountIdDocument, options);
        }
export function useUserByAccountIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserByAccountIdQuery, UserByAccountIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserByAccountIdQuery, UserByAccountIdQueryVariables>(UserByAccountIdDocument, options);
        }
export type UserByAccountIdQueryHookResult = ReturnType<typeof useUserByAccountIdQuery>;
export type UserByAccountIdLazyQueryHookResult = ReturnType<typeof useUserByAccountIdLazyQuery>;
export type UserByAccountIdSuspenseQueryHookResult = ReturnType<typeof useUserByAccountIdSuspenseQuery>;
export type UserByAccountIdQueryResult = Apollo.QueryResult<UserByAccountIdQuery, UserByAccountIdQueryVariables>;
export const PostsByUserIdDocument = gql`
    query PostsByUserId($targetUserId: String!, $filter: PostFilter!, $pagination: PaginationInput!) {
  postsByUserId(
    targetUserId: $targetUserId
    filter: $filter
    pagination: $pagination
  ) {
    posts {
      ...Post
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}
${NadoUsersFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __usePostsByUserIdQuery__
 *
 * To run a query within a React component, call `usePostsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByUserIdQuery({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function usePostsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<PostsByUserIdQuery, PostsByUserIdQueryVariables> & ({ variables: PostsByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByUserIdQuery, PostsByUserIdQueryVariables>(PostsByUserIdDocument, options);
      }
export function usePostsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByUserIdQuery, PostsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByUserIdQuery, PostsByUserIdQueryVariables>(PostsByUserIdDocument, options);
        }
export function usePostsByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostsByUserIdQuery, PostsByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsByUserIdQuery, PostsByUserIdQueryVariables>(PostsByUserIdDocument, options);
        }
export type PostsByUserIdQueryHookResult = ReturnType<typeof usePostsByUserIdQuery>;
export type PostsByUserIdLazyQueryHookResult = ReturnType<typeof usePostsByUserIdLazyQuery>;
export type PostsByUserIdSuspenseQueryHookResult = ReturnType<typeof usePostsByUserIdSuspenseQuery>;
export type PostsByUserIdQueryResult = Apollo.QueryResult<PostsByUserIdQuery, PostsByUserIdQueryVariables>;