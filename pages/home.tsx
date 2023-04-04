import type { NextPage } from 'next'
import { KeyboardEvent, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  CreateTaskMutation,
  CreateTaskDocument,
  GetTasksQuery,
  GetTasksDocument,
} from '@/graphql/types/client'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'
import Board from '@/components/board'
import { TaskCards } from '@/components/task_card'
import { css } from '@emotion/react'

const boards = css`
  display: flex;
  min-height: 50rem;
`

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

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data, refetch } = useQuery<GetTasksQuery>(GetTasksDocument, {
    variables: { userId: session?.user?.id },
    skip: status === 'loading',
  })
  //TODO: rename inputValue
  const [inputValue, setInputValue] = useState('')
  const [createTask] = useMutation<CreateTaskMutation>(CreateTaskDocument, {
    onCompleted() {
      refetch()
      setInputValue('')
    },
  })
  const [selectedTaskId, setSelectedTaskId] = useState('')

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      createTask({
        variables: {
          task: {
            title: inputValue,
            userId: session?.user?.id,
          },
        },
      })
    }
  }

  const openTaskDetail = (taskId: string | undefined) => {
    if (taskId) {
      setSelectedTaskId(taskId)
    }
  }

  return (
    <div>
      <Header />
      <div css={boards}>
        <Board>
          <div>
            <input
              type="text"
              value={inputValue}
              placeholder="+ add new task"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              css={addTask}
            ></input>
          </div>
          <TaskCards
            data={data}
            refetch={refetch}
            openTaskDetail={openTaskDetail}
            selectedTaskId={selectedTaskId}
            setSelectedTaskId={setSelectedTaskId}
          ></TaskCards>
        </Board>
        <Board>
          <h1>task detail</h1>
        </Board>
        <Board>
          <h1>subtask detail</h1>
        </Board>
      </div>
    </div>
  )
}

export default Home
