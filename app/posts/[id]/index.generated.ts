import * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPostQueryVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost: { __typename?: 'Post', _id: string, content: string, tags?: string | null, category: string, commentsCount: number, createdAt: string, author: { __typename?: 'User', _id: string, name: string, account_id: string } } };

export type GetPostUserQueryVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
}>;


export type GetPostUserQuery = { __typename?: 'Query', getPost: { __typename?: 'Post', author: { __typename?: 'User', _id: string, name: string, account_id: string } } };

export type GetCommentsQueryVariables = Types.Exact<{
  postId: Types.Scalars['String']['input'];
  filter: Types.CommentFilter;
}>;


export type GetCommentsQuery = { __typename?: 'Query', getCommentByPostId: { __typename?: 'Comments', hasNext: boolean, comments: Array<{ __typename?: 'Comment', _id: string, content: string, postId: string, createdAt: string, Commenter: { __typename?: 'User', _id: string, name: string, account_id: string } }> } };

export type AddCommentToPostMutationVariables = Types.Exact<{
  targetPostId: Types.Scalars['String']['input'];
  content: Types.Scalars['String']['input'];
}>;


export type AddCommentToPostMutation = { __typename?: 'Mutation', addCommentToPost: { __typename?: 'Comment', _id: string, content: string, postId: string, createdAt: string, Commenter: { __typename?: 'User', _id: string, name: string } } };

export type DeleteCommentByIdMutationVariables = Types.Exact<{
  targetCommentId: Types.Scalars['String']['input'];
}>;


export type DeleteCommentByIdMutation = { __typename?: 'Mutation', deleteCommentById: { __typename?: 'deleteCommentResult', success: boolean } };


export const GetPostDocument = gql`
    query GetPost($postId: String!) {
  getPost(postId: $postId) {
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
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables> & ({ variables: GetPostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export function useGetPostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostSuspenseQueryHookResult = ReturnType<typeof useGetPostSuspenseQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostUserDocument = gql`
    query GetPostUser($postId: String!) {
  getPost(postId: $postId) {
    author {
      _id
      name
      account_id
    }
  }
}
    `;

/**
 * __useGetPostUserQuery__
 *
 * To run a query within a React component, call `useGetPostUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostUserQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostUserQuery(baseOptions: Apollo.QueryHookOptions<GetPostUserQuery, GetPostUserQueryVariables> & ({ variables: GetPostUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostUserQuery, GetPostUserQueryVariables>(GetPostUserDocument, options);
      }
export function useGetPostUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostUserQuery, GetPostUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostUserQuery, GetPostUserQueryVariables>(GetPostUserDocument, options);
        }
export function useGetPostUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostUserQuery, GetPostUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostUserQuery, GetPostUserQueryVariables>(GetPostUserDocument, options);
        }
export type GetPostUserQueryHookResult = ReturnType<typeof useGetPostUserQuery>;
export type GetPostUserLazyQueryHookResult = ReturnType<typeof useGetPostUserLazyQuery>;
export type GetPostUserSuspenseQueryHookResult = ReturnType<typeof useGetPostUserSuspenseQuery>;
export type GetPostUserQueryResult = Apollo.QueryResult<GetPostUserQuery, GetPostUserQueryVariables>;
export const GetCommentsDocument = gql`
    query GetComments($postId: String!, $filter: commentFilter!) {
  getCommentByPostId(postId: $postId, filter: $filter) {
    comments {
      _id
      content
      postId
      Commenter {
        _id
        name
        account_id
      }
      createdAt
    }
    hasNext
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables> & ({ variables: GetCommentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export function useGetCommentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsSuspenseQueryHookResult = ReturnType<typeof useGetCommentsSuspenseQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const AddCommentToPostDocument = gql`
    mutation AddCommentToPost($targetPostId: String!, $content: String!) {
  addCommentToPost(targetPostId: $targetPostId, content: $content) {
    _id
    content
    postId
    Commenter {
      _id
      name
    }
    createdAt
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
    mutation deleteCommentById($targetCommentId: String!) {
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