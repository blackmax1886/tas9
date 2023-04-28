import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  createUser: PrismaUser;
  deleteTask?: Maybe<Task>;
  deleteUser?: Maybe<PrismaUser>;
  updateTaskContent: Task;
  updateTaskIsDone: Task;
  updateTaskStartEnd: Task;
};


export type MutationCreateTaskArgs = {
  input: NewTask;
};


export type MutationCreateUserArgs = {
  input: NewUser;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTaskContentArgs = {
  content: Scalars['String'];
  id: Scalars['String'];
};


export type MutationUpdateTaskIsDoneArgs = {
  id: Scalars['String'];
  isDone: Scalars['Boolean'];
};


export type MutationUpdateTaskStartEndArgs = {
  end: Scalars['Date'];
  id: Scalars['String'];
  start: Scalars['Date'];
};

export type NewTask = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  userId: Scalars['String'];
};

export type NewUser = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type PrismaUser = {
  __typename?: 'PrismaUser';
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  task?: Maybe<Task>;
  tasks: Array<Task>;
  user?: Maybe<PrismaUser>;
};


export type QueryTaskArgs = {
  id: Scalars['String'];
};


export type QueryTasksArgs = {
  userId: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  archived: Scalars['Boolean'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  done: Scalars['Boolean'];
  due?: Maybe<Scalars['Date']>;
  end?: Maybe<Scalars['Date']>;
  group?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  priority?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Date']>;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type CreateTaskMutationVariables = Exact<{
  task: NewTask;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title: string, done: boolean, archived: boolean } };

export type GetTaskQueryVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type GetTaskQuery = { __typename?: 'Query', task?: { __typename?: 'Task', id: string, userId: string, title: string, content?: string | null, done: boolean, due?: number | null, start?: number | null, end?: number | null, group?: string | null, type?: string | null, priority?: number | null, archived: boolean, createdAt: number } | null };

export type GetTasksQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, title: string, done: boolean, start?: number | null, end?: number | null, group?: string | null, type?: string | null, priority?: number | null, archived: boolean }> };

export type UpdateTaskIsDoneMutationVariables = Exact<{
  taskId: Scalars['String'];
  isDone: Scalars['Boolean'];
}>;


export type UpdateTaskIsDoneMutation = { __typename?: 'Mutation', updateTaskIsDone: { __typename?: 'Task', title: string, done: boolean } };

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'Task', title: string } | null };

export type UpdateTaskContentMutationVariables = Exact<{
  taskId: Scalars['String'];
  content: Scalars['String'];
}>;


export type UpdateTaskContentMutation = { __typename?: 'Mutation', updateTaskContent: { __typename?: 'Task', id: string, content?: string | null } };

export type UpdateTaskStartEndMutationVariables = Exact<{
  taskId: Scalars['String'];
  start: Scalars['Date'];
  end: Scalars['Date'];
}>;


export type UpdateTaskStartEndMutation = { __typename?: 'Mutation', updateTaskStartEnd: { __typename?: 'Task', id: string, start?: number | null, end?: number | null } };


export const CreateTaskDocument = gql`
    mutation createTask($task: NewTask!) {
  createTask(input: $task) {
    id
    title
    done
    archived
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      task: // value for 'task'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const GetTaskDocument = gql`
    query getTask($taskId: String!) {
  task(id: $taskId) {
    id
    userId
    title
    content
    done
    due
    start
    end
    group
    type
    priority
    archived
    createdAt
  }
}
    `;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export const GetTasksDocument = gql`
    query getTasks($userId: String!) {
  tasks(userId: $userId) {
    id
    title
    done
    start
    end
    group
    type
    priority
    archived
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const UpdateTaskIsDoneDocument = gql`
    mutation UpdateTaskIsDone($taskId: String!, $isDone: Boolean!) {
  updateTaskIsDone(id: $taskId, isDone: $isDone) {
    title
    done
  }
}
    `;
export type UpdateTaskIsDoneMutationFn = Apollo.MutationFunction<UpdateTaskIsDoneMutation, UpdateTaskIsDoneMutationVariables>;

/**
 * __useUpdateTaskIsDoneMutation__
 *
 * To run a mutation, you first call `useUpdateTaskIsDoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskIsDoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskIsDoneMutation, { data, loading, error }] = useUpdateTaskIsDoneMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      isDone: // value for 'isDone'
 *   },
 * });
 */
export function useUpdateTaskIsDoneMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskIsDoneMutation, UpdateTaskIsDoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskIsDoneMutation, UpdateTaskIsDoneMutationVariables>(UpdateTaskIsDoneDocument, options);
      }
export type UpdateTaskIsDoneMutationHookResult = ReturnType<typeof useUpdateTaskIsDoneMutation>;
export type UpdateTaskIsDoneMutationResult = Apollo.MutationResult<UpdateTaskIsDoneMutation>;
export type UpdateTaskIsDoneMutationOptions = Apollo.BaseMutationOptions<UpdateTaskIsDoneMutation, UpdateTaskIsDoneMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: String!) {
  deleteTask(id: $taskId) {
    title
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const UpdateTaskContentDocument = gql`
    mutation UpdateTaskContent($taskId: String!, $content: String!) {
  updateTaskContent(id: $taskId, content: $content) {
    id
    content
  }
}
    `;
export type UpdateTaskContentMutationFn = Apollo.MutationFunction<UpdateTaskContentMutation, UpdateTaskContentMutationVariables>;

/**
 * __useUpdateTaskContentMutation__
 *
 * To run a mutation, you first call `useUpdateTaskContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskContentMutation, { data, loading, error }] = useUpdateTaskContentMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateTaskContentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskContentMutation, UpdateTaskContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskContentMutation, UpdateTaskContentMutationVariables>(UpdateTaskContentDocument, options);
      }
export type UpdateTaskContentMutationHookResult = ReturnType<typeof useUpdateTaskContentMutation>;
export type UpdateTaskContentMutationResult = Apollo.MutationResult<UpdateTaskContentMutation>;
export type UpdateTaskContentMutationOptions = Apollo.BaseMutationOptions<UpdateTaskContentMutation, UpdateTaskContentMutationVariables>;
export const UpdateTaskStartEndDocument = gql`
    mutation UpdateTaskStartEnd($taskId: String!, $start: Date!, $end: Date!) {
  updateTaskStartEnd(id: $taskId, start: $start, end: $end) {
    id
    start
    end
  }
}
    `;
export type UpdateTaskStartEndMutationFn = Apollo.MutationFunction<UpdateTaskStartEndMutation, UpdateTaskStartEndMutationVariables>;

/**
 * __useUpdateTaskStartEndMutation__
 *
 * To run a mutation, you first call `useUpdateTaskStartEndMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskStartEndMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskStartEndMutation, { data, loading, error }] = useUpdateTaskStartEndMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useUpdateTaskStartEndMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskStartEndMutation, UpdateTaskStartEndMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskStartEndMutation, UpdateTaskStartEndMutationVariables>(UpdateTaskStartEndDocument, options);
      }
export type UpdateTaskStartEndMutationHookResult = ReturnType<typeof useUpdateTaskStartEndMutation>;
export type UpdateTaskStartEndMutationResult = Apollo.MutationResult<UpdateTaskStartEndMutation>;
export type UpdateTaskStartEndMutationOptions = Apollo.BaseMutationOptions<UpdateTaskStartEndMutation, UpdateTaskStartEndMutationVariables>;