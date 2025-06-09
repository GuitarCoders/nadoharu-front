import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserIdQueryVariables = Types.Exact<{
  accountId: Types.Scalars['String']['input'];
}>;


export type GetUserIdQuery = { __typename?: 'Query', userByAccountId: { __typename?: 'User', _id: string } };

export type FriendsQueryVariables = Types.Exact<{
  pagination: Types.PaginationInput;
  targetUserId: Types.Scalars['String']['input'];
}>;


export type FriendsQuery = { __typename?: 'Query', friends: { __typename?: 'FriendsQueryResult', friends: Array<{ __typename?: 'Friend', _id: string, createdAt: string, user: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } }>, pageInfo: { __typename?: 'PageInfo', hasNext: boolean, cursor?: string | null } } };


export const GetUserIdDocument = gql`
    query getUserId($accountId: String!) {
  userByAccountId(account_id: $accountId) {
    _id
  }
}
    `;

/**
 * __useGetUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIdQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserIdQuery, GetUserIdQueryVariables> & ({ variables: GetUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
      }
export function useGetUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserIdQuery, GetUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
        }
export function useGetUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserIdQuery, GetUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
        }
export type GetUserIdQueryHookResult = ReturnType<typeof useGetUserIdQuery>;
export type GetUserIdLazyQueryHookResult = ReturnType<typeof useGetUserIdLazyQuery>;
export type GetUserIdSuspenseQueryHookResult = ReturnType<typeof useGetUserIdSuspenseQuery>;
export type GetUserIdQueryResult = Apollo.QueryResult<GetUserIdQuery, GetUserIdQueryVariables>;
export const FriendsDocument = gql`
    query Friends($pagination: PaginationInput!, $targetUserId: String!) {
  friends(pagination: $pagination, targetUserId: $targetUserId) {
    friends {
      _id
      createdAt
      user {
        _id
        name
        email
        account_id
        about_me
      }
    }
    pageInfo {
      hasNext
      cursor
    }
  }
}
    `;

/**
 * __useFriendsQuery__
 *
 * To run a query within a React component, call `useFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      targetUserId: // value for 'targetUserId'
 *   },
 * });
 */
export function useFriendsQuery(baseOptions: Apollo.QueryHookOptions<FriendsQuery, FriendsQueryVariables> & ({ variables: FriendsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, options);
      }
export function useFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, options);
        }
export function useFriendsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, options);
        }
export type FriendsQueryHookResult = ReturnType<typeof useFriendsQuery>;
export type FriendsLazyQueryHookResult = ReturnType<typeof useFriendsLazyQuery>;
export type FriendsSuspenseQueryHookResult = ReturnType<typeof useFriendsSuspenseQuery>;
export type FriendsQueryResult = Apollo.QueryResult<FriendsQuery, FriendsQueryVariables>;