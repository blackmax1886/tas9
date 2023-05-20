import { QueryResult, useMutation } from '@apollo/client'
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
  userId: string | undefined
  refetch: QueryResult<GetTasksQuery>['refetch']
}

const QuickAdd = (props: quickAddProps) => {
  const [createTask] = useMutation<CreateTaskMutation>(CreateTaskDocument, {
    onCompleted() {
      props.refetch()
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
