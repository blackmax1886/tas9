import { QueryResult, gql, useMutation } from '@apollo/client'
import { css } from '@emotion/react'
import { KeyboardEvent } from 'react'

import {
  CreateTaskDocument,
  CreateTaskMutation,
  GetTasksQuery,
} from '@/graphql/types/client'

const addTask = css`
  color: inherit;
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: 12px 16px;
  border-color: transparent;
  border-radius: 4px;
  background-color: #424242;
  width: 100%;
  font-size: inherit;
`
type quickAddProps = {
  newTaskTitle: string
  setNewTaskTitle: (newTaskTitle: string) => void
  userId: string
  refetch: QueryResult<GetTasksQuery>['refetch']
}

const QuickAdd = (props: quickAddProps) => {
  const [createTask] = useMutation<CreateTaskMutation>(CreateTaskDocument, {
    update: (cache, { data }) => {
      const createdTask = data?.createTask
      if (createdTask) {
        cache.modify({
          fields: {
            tasks(existingTasks = []) {
              const newTaskRef = cache.writeFragment({
                data: createdTask,
                fragment: gql`
                  fragment NewTask on Task {
                    id
                    userId
                    title
                  }
                `,
              })
              return [...existingTasks, newTaskRef]
            },
          },
        })
      }
    },
  })
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && props.newTaskTitle) {
      createTask({
        variables: {
          task: {
            title: props.newTaskTitle,
            userId: props.userId,
          },
        },
        optimisticResponse: {
          createTask: {
            id: 'temp-id',
            userId: props.userId,
            title: props.newTaskTitle,
            done: false,
            archived: false,
            __typename: 'Task',
          },
        },
      })
      props.setNewTaskTitle('')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={props.newTaskTitle}
        placeholder="+ add new task"
        onChange={(e) => props.setNewTaskTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        css={addTask}
        data-cy="quickAdd"
      ></input>
    </div>
  )
}

export default QuickAdd
