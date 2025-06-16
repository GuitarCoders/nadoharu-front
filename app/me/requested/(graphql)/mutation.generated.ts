import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcceptFriendRequestMutationVariables = Types.Exact<{
  acceptFriendRequestData: Types.Scalars['String']['input'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'AcceptFriendRequestResult', success: string } };

export type DeleteFriendRequestMutationVariables = Types.Exact<{
  friendRequestId: Types.Scalars['String']['input'];
}>;


export type DeleteFriendRequestMutation = { __typename?: 'Mutation', deleteFriendRequest: { __typename?: 'DeleteFriendRequestResult', success: boolean } };


export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($acceptFriendRequestData: String!) {
  acceptFriendRequest(acceptFriendRequestData: $acceptFriendRequestData) {
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
 *      acceptFriendRequestData: // value for 'acceptFriendRequestData'
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
  deleteFriendRequest(friendRequestId: $friendRequestId) {
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