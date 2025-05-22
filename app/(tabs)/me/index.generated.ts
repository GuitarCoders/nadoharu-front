import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyPostsQueryVariables = Types.Exact<{
  count: Types.Scalars['Int']['input'];
  filter?: Types.InputMaybe<Types.GetPostFilter>;
  accountId: Types.Scalars['String']['input'];
}>;


export type GetMyPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'GetPostsResult', lastDateTime?: string | null, posts: Array<{ __typename?: 'Post', _id: string, content: string, tags?: string | null, category: string, commentsCount: number, createdAt: string, author: { __typename?: 'User', _id: string, name: string, account_id: string } }> } };

export type UserWhoAmIQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserWhoAmIQuery = { __typename?: 'Query', userWhoAmI: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } };


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
export const UserWhoAmIDocument = gql`
    query UserWhoAmI {
  userWhoAmI {
    _id
    name
    email
    account_id
    about_me
  }
}
    `;

/**
 * __useUserWhoAmIQuery__
 *
 * To run a query within a React component, call `useUserWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserWhoAmIQuery(baseOptions?: Apollo.QueryHookOptions<UserWhoAmIQuery, UserWhoAmIQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserWhoAmIQuery, UserWhoAmIQueryVariables>(UserWhoAmIDocument, options);
      }
export function useUserWhoAmILazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserWhoAmIQuery, UserWhoAmIQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserWhoAmIQuery, UserWhoAmIQueryVariables>(UserWhoAmIDocument, options);
        }
export function useUserWhoAmISuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserWhoAmIQuery, UserWhoAmIQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserWhoAmIQuery, UserWhoAmIQueryVariables>(UserWhoAmIDocument, options);
        }
export type UserWhoAmIQueryHookResult = ReturnType<typeof useUserWhoAmIQuery>;
export type UserWhoAmILazyQueryHookResult = ReturnType<typeof useUserWhoAmILazyQuery>;
export type UserWhoAmISuspenseQueryHookResult = ReturnType<typeof useUserWhoAmISuspenseQuery>;
export type UserWhoAmIQueryResult = Apollo.QueryResult<UserWhoAmIQuery, UserWhoAmIQueryVariables>;