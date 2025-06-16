import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReceivedFriendRequestsQueryVariables = Types.Exact<{
  pagination: Types.PaginationInput;
}>;


export type ReceivedFriendRequestsQuery = { __typename?: 'Query', receivedFriendRequests: { __typename?: 'FriendRequestsQueryResult', friendRequests: Array<{ __typename?: 'FriendRequest', _id: string, requestMessage: string, createdAt: string, requester: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string }, receiver: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } }> } };


export const ReceivedFriendRequestsDocument = gql`
    query ReceivedFriendRequests($pagination: PaginationInput!) {
  receivedFriendRequests(pagination: $pagination) {
    friendRequests {
      _id
      requestMessage
      createdAt
      requester {
        _id
        name
        email
        account_id
        about_me
      }
      receiver {
        _id
        name
        email
        account_id
        about_me
      }
    }
  }
}
    `;

/**
 * __useReceivedFriendRequestsQuery__
 *
 * To run a query within a React component, call `useReceivedFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceivedFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceivedFriendRequestsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useReceivedFriendRequestsQuery(baseOptions: Apollo.QueryHookOptions<ReceivedFriendRequestsQuery, ReceivedFriendRequestsQueryVariables> & ({ variables: ReceivedFriendRequestsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReceivedFriendRequestsQuery, ReceivedFriendRequestsQueryVariables>(ReceivedFriendRequestsDocument, options);
      }
export function useReceivedFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceivedFriendRequestsQuery, ReceivedFriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReceivedFriendRequestsQuery, ReceivedFriendRequestsQueryVariables>(ReceivedFriendRequestsDocument, options);
        }
export function useReceivedFriendRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReceivedFriendRequestsQuery, ReceivedFriendRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReceivedFriendRequestsQuery, ReceivedFriendRequestsQueryVariables>(ReceivedFriendRequestsDocument, options);
        }
export type ReceivedFriendRequestsQueryHookResult = ReturnType<typeof useReceivedFriendRequestsQuery>;
export type ReceivedFriendRequestsLazyQueryHookResult = ReturnType<typeof useReceivedFriendRequestsLazyQuery>;
export type ReceivedFriendRequestsSuspenseQueryHookResult = ReturnType<typeof useReceivedFriendRequestsSuspenseQuery>;
export type ReceivedFriendRequestsQueryResult = Apollo.QueryResult<ReceivedFriendRequestsQuery, ReceivedFriendRequestsQueryVariables>;