import type { NextPage } from 'next'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetTasksQuery, GetTasksDocument } from '@/graphql/types/client'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'
import Board from '@/components/board'
import { TaskCards } from '@/components/task_card'
import { css } from '@emotion/react'
import QuickAdd from '@/components/quick_add'

const boards = css`
  display: flex;
  min-height: 50rem;
`

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data, refetch } = useQuery<GetTasksQuery>(GetTasksDocument, {
    variables: { userId: session?.user?.id },
    skip: status === 'loading',
  })
  //TODO: rename inputValue
  const [inputValue, setInputValue] = useState('')
  const [selectedTaskId, setSelectedTaskId] = useState('')

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
          <QuickAdd
            inputValue={inputValue}
            setInputValue={setInputValue}
            userId={session?.user?.id}
            refetch={refetch}
          />
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
