import type * as Types from '@/graphql/generated/graphql';

import { gql } from '@apollo/client';
import { PostFragmentDoc, UserFragmentDoc, NadoUsersFragmentDoc, PageInfoFragmentDoc } from '../../../../graphql/fragments/global.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PostsForTimelineQueryVariables = Types.Exact<{
  pagination: Types.PaginationInput;
}>;


export type PostsForTimelineQuery = { __typename?: 'Query', postsForTimeline: { __typename?: 'PostsQueryResult', posts: Array<{ __typename?: 'Post', _id: string, content: string, tags?: string | null, category?: string | null, commentCount: number, nadoCount: number, isNadoed: boolean, isNadoPost: boolean, createdAt: string, nadoer?: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string } | null, author: { __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string }, nadoUsers?: { __typename?: 'NadoUsers', users: Array<{ __typename?: 'User', _id: string, name: string, email: string, account_id: string, about_me: string }>, pageInfo: { __typename?: 'PageInfo', hasOverStart: boolean, hasOverEnd: boolean, hasNext: boolean, startCursor?: string | null, endCursor?: string | null } } | null }>, pageInfo: { __typename?: 'PageInfo', hasOverStart: boolean, hasOverEnd: boolean, hasNext: boolean, startCursor?: string | null, endCursor?: string | null } } };


export const PostsForTimelineDocument = gql`
    query PostsForTimeline($pagination: PaginationInput!) {
  postsForTimeline(pagination: $pagination) {
    posts {
      ...Post
      nadoer {
        ...User
      }
      author {
        ...User
      }
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
 * __usePostsForTimelineQuery__
 *
 * To run a query within a React component, call `usePostsForTimelineQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsForTimelineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsForTimelineQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function usePostsForTimelineQuery(baseOptions: Apollo.QueryHookOptions<PostsForTimelineQuery, PostsForTimelineQueryVariables> & ({ variables: PostsForTimelineQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsForTimelineQuery, PostsForTimelineQueryVariables>(PostsForTimelineDocument, options);
      }
export function usePostsForTimelineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsForTimelineQuery, PostsForTimelineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsForTimelineQuery, PostsForTimelineQueryVariables>(PostsForTimelineDocument, options);
        }
export function usePostsForTimelineSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostsForTimelineQuery, PostsForTimelineQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsForTimelineQuery, PostsForTimelineQueryVariables>(PostsForTimelineDocument, options);
        }
export type PostsForTimelineQueryHookResult = ReturnType<typeof usePostsForTimelineQuery>;
export type PostsForTimelineLazyQueryHookResult = ReturnType<typeof usePostsForTimelineLazyQuery>;
export type PostsForTimelineSuspenseQueryHookResult = ReturnType<typeof usePostsForTimelineSuspenseQuery>;
export type PostsForTimelineQueryResult = Apollo.QueryResult<PostsForTimelineQuery, PostsForTimelineQueryVariables>;