import * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyPostsQueryVariables = Types.Exact<{
  count: Types.Scalars['Int']['input'];
  filter?: Types.InputMaybe<Types.GetPostFilter>;
  accountId: Types.Scalars['String']['input'];
}>;


export type GetMyPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'GetPostsResult', lastDateTime?: string | null, posts: Array<{ __typename?: 'Post', _id: string, content: string, tags?: string | null, category: string, commentsCount: number, createdAt: string, author: { __typename?: 'User', _id: string, name: string, account_id: string } }> } };

export type UserByAccountIdQueryVariables = Types.Exact<{
  account_id: Types.Scalars['String']['input'];
}>;


export type UserByAccountIdQuery = { __typename?: 'Query', userByAccountId: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } };


export const GetMyPostsDocument = gql`
    query GetMyPosts($count: Int!, $filter: getPostFilter, $accountId: String!) {
  getPosts(
    getPostsData: {count: $count, filter: $filter}
    targetUserId: $accountId
  ) {
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
  }
}
    `;

/**
 * __useGetMyPostsQuery__
 *
 * To run a query within a React component, call `useGetMyPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyPostsQuery({
 *   variables: {
 *      count: // value for 'count'
 *      filter: // value for 'filter'
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetMyPostsQuery(baseOptions: Apollo.QueryHookOptions<GetMyPostsQuery, GetMyPostsQueryVariables> & ({ variables: GetMyPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(GetMyPostsDocument, options);
      }
export function useGetMyPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyPostsQuery, GetMyPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(GetMyPostsDocument, options);
        }
export function useGetMyPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyPostsQuery, GetMyPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(GetMyPostsDocument, options);
        }
export type GetMyPostsQueryHookResult = ReturnType<typeof useGetMyPostsQuery>;
export type GetMyPostsLazyQueryHookResult = ReturnType<typeof useGetMyPostsLazyQuery>;
export type GetMyPostsSuspenseQueryHookResult = ReturnType<typeof useGetMyPostsSuspenseQuery>;
export type GetMyPostsQueryResult = Apollo.QueryResult<GetMyPostsQuery, GetMyPostsQueryVariables>;
export const UserByAccountIdDocument = gql`
    query UserByAccountId($account_id: String!) {
  userByAccountId(account_id: $account_id) {
    _id
    name
    email
    account_id
    about_me
  }
}
    `;

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