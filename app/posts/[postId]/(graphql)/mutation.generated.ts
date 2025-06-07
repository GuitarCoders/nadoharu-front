import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddCommentToPostMutationVariables = Types.Exact<{
  targetPostId: Types.Scalars['String']['input'];
  content: Types.Scalars['String']['input'];
}>;


export type AddCommentToPostMutation = { __typename?: 'Mutation', addCommentToPost: { __typename?: 'Comment', _id: string, content: string, postId: string, createdAt: string, commenter: { __typename?: 'User', _id: string, name: string, account_id: string } } };

export type DeleteCommentByIdMutationVariables = Types.Exact<{
  targetCommentId: Types.Scalars['String']['input'];
}>;


export type DeleteCommentByIdMutation = { __typename?: 'Mutation', deleteCommentById: { __typename?: 'deleteCommentResult', success: boolean } };

export type DeletePostMutationVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostResult', success: boolean } };


export const AddCommentToPostDocument = gql`
    mutation AddCommentToPost($targetPostId: String!, $content: String!) {
  addCommentToPost(targetPostId: $targetPostId, content: $content) {
    _id
    content
    postId
    createdAt
    commenter {
      _id
      name
      account_id
    }
  }
}
    `;
export type AddCommentToPostMutationFn = Apollo.MutationFunction<AddCommentToPostMutation, AddCommentToPostMutationVariables>;

/**
 * __useAddCommentToPostMutation__
 *
 * To run a mutation, you first call `useAddCommentToPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentToPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentToPostMutation, { data, loading, error }] = useAddCommentToPostMutation({
 *   variables: {
 *      targetPostId: // value for 'targetPostId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddCommentToPostMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentToPostMutation, AddCommentToPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentToPostMutation, AddCommentToPostMutationVariables>(AddCommentToPostDocument, options);
      }
export type AddCommentToPostMutationHookResult = ReturnType<typeof useAddCommentToPostMutation>;
export type AddCommentToPostMutationResult = Apollo.MutationResult<AddCommentToPostMutation>;
export type AddCommentToPostMutationOptions = Apollo.BaseMutationOptions<AddCommentToPostMutation, AddCommentToPostMutationVariables>;
export const DeleteCommentByIdDocument = gql`
    mutation DeleteCommentById($targetCommentId: String!) {
  deleteCommentById(targetCommentId: $targetCommentId) {
    success
  }
}
    `;
export type DeleteCommentByIdMutationFn = Apollo.MutationFunction<DeleteCommentByIdMutation, DeleteCommentByIdMutationVariables>;

/**
 * __useDeleteCommentByIdMutation__
 *
 * To run a mutation, you first call `useDeleteCommentByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentByIdMutation, { data, loading, error }] = useDeleteCommentByIdMutation({
 *   variables: {
 *      targetCommentId: // value for 'targetCommentId'
 *   },
 * });
 */
export function useDeleteCommentByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentByIdMutation, DeleteCommentByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentByIdMutation, DeleteCommentByIdMutationVariables>(DeleteCommentByIdDocument, options);
      }
export type DeleteCommentByIdMutationHookResult = ReturnType<typeof useDeleteCommentByIdMutation>;
export type DeleteCommentByIdMutationResult = Apollo.MutationResult<DeleteCommentByIdMutation>;
export type DeleteCommentByIdMutationOptions = Apollo.BaseMutationOptions<DeleteCommentByIdMutation, DeleteCommentByIdMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId) {
    success
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;