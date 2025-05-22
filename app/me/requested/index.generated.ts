import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetReceiveFriendRequestsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetReceiveFriendRequestsQuery = { __typename?: 'Query', getReceiveFriendRequests: { __typename?: 'FriendRequestArray', friendRequests: Array<{ __typename?: 'FriendRequest', _id: string, requestMessage: string, createdAt: string, requestUser: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string }, receiveUser: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } }> } };

export type AcceptFriendRequestMutationVariables = Types.Exact<{
  friendRequestId: Types.Scalars['String']['input'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'AcceptFriendRequestResult', success: string } };

export type DeleteFriendRequestMutationVariables = Types.Exact<{
  friendRequestId: Types.Scalars['String']['input'];
}>;


export type DeleteFriendRequestMutation = { __typename?: 'Mutation', deleteFriendRequest: { __typename?: 'DeleteFriendRequestResult', success: boolean } };


export const GetReceiveFriendRequestsDocument = gql`
    query GetReceiveFriendRequests {
  getReceiveFriendRequests {
    friendRequests {
      _id
      requestMessage
      createdAt
      requestUser {
        _id
        name
        email
        account_id
        about_me
      }
      receiveUser {
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
 * __useGetReceiveFriendRequestsQuery__
 *
 * To run a query within a React component, call `useGetReceiveFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReceiveFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReceiveFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReceiveFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetReceiveFriendRequestsQuery, GetReceiveFriendRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReceiveFriendRequestsQuery, GetReceiveFriendRequestsQueryVariables>(GetReceiveFriendRequestsDocument, options);
      }
export function useGetReceiveFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReceiveFriendRequestsQuery, GetReceiveFriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReceiveFriendRequestsQuery, GetReceiveFriendRequestsQueryVariables>(GetReceiveFriendRequestsDocument, options);
        }
export function useGetReceiveFriendRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReceiveFriendRequestsQuery, GetReceiveFriendRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReceiveFriendRequestsQuery, GetReceiveFriendRequestsQueryVariables>(GetReceiveFriendRequestsDocument, options);
        }
export type GetReceiveFriendRequestsQueryHookResult = ReturnType<typeof useGetReceiveFriendRequestsQuery>;
export type GetReceiveFriendRequestsLazyQueryHookResult = ReturnType<typeof useGetReceiveFriendRequestsLazyQuery>;
export type GetReceiveFriendRequestsSuspenseQueryHookResult = ReturnType<typeof useGetReceiveFriendRequestsSuspenseQuery>;
export type GetReceiveFriendRequestsQueryResult = Apollo.QueryResult<GetReceiveFriendRequestsQuery, GetReceiveFriendRequestsQueryVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($friendRequestId: String!) {
  acceptFriendRequest(
    acceptFriendRequestData: {friendRequestId: $friendRequestId}
  ) {
    success
  }
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      friendRequestId: // value for 'friendRequestId'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const DeleteFriendRequestDocument = gql`
    mutation DeleteFriendRequest($friendRequestId: String!) {
  deleteFriendRequest(
    deleteFriendRequestData: {friendRequestId: $friendRequestId}
  ) {
    success
  }
}
    `;
export type DeleteFriendRequestMutationFn = Apollo.MutationFunction<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>;

/**
 * __useDeleteFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeleteFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFriendRequestMutation, { data, loading, error }] = useDeleteFriendRequestMutation({
 *   variables: {
 *      friendRequestId: // value for 'friendRequestId'
 *   },
 * });
 */
export function useDeleteFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>(DeleteFriendRequestDocument, options);
      }
export type DeleteFriendRequestMutationHookResult = ReturnType<typeof useDeleteFriendRequestMutation>;
export type DeleteFriendRequestMutationResult = Apollo.MutationResult<DeleteFriendRequestMutation>;
export type DeleteFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeleteFriendRequestMutation, DeleteFriendRequestMutationVariables>;