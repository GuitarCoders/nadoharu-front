import * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePostMutationVariables = Types.Exact<{
  content: Types.Scalars['String']['input'];
  tags: Types.Scalars['String']['input'];
  category: Types.Scalars['String']['input'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostResult', success: boolean, _id: string, content: string, tags?: string | null, category: string, commentsCount: number, createdAt: string, author: { __typename?: 'User', _id: string, name: string, account_id: string } } };


export const CreatePostDocument = gql`
    mutation createPost($content: String!, $tags: String!, $category: String!) {
  createPost(
    createPostData: {content: $content, tags: $tags, category: $category}
  ) {
    success
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
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;