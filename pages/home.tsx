import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import type { NextPage } from 'next'

import Board from '@/components/Board'
import Header from '@/components/Header'
import Tabs from '@/components/Tabs'
import QuickAdd from '@/components/task/QuickAdd'
import { TaskCards } from '@/components/task/TaskCard'
import { TaskDetail } from '@/components/task/TaskDetail'
import TaskTabs from '@/components/task/TaskTabs'
import {
  GetTaskQuery,
  GetTaskDocument,
  GetTasksQuery,
  GetTasksDocument,
} from '@/graphql/types/client'
import { filterByActiveTab } from '@/lib/task/filter'

const home = css`
  display: flex;
  flex-direction: column;
`

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
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const [activeTaskTab, setActiveTaskTab] = useState('tasks')
  const { data: selected, refetch: refetchSelectedTask } =
    useQuery<GetTaskQuery>(GetTaskDocument, {
      variables: { taskId: selectedTaskId },
      skip: !selectedTaskId,
      fetchPolicy: 'network-only',
    })
  useEffect(() => {
    refetchSelectedTask()
  }, [refetchSelectedTask, selectedTaskId])

  const tasks = filterByActiveTab(activeTaskTab, data?.tasks)

  const openTaskDetail = (taskId: string | undefined) => {
    if (taskId) {
      setSelectedTaskId(taskId)
    }
  }

  return (
    <>
      <Head>
        <title>Task Manager</title>
      </Head>
      <div css={home}>
        <Header user={session?.user} />
        <Tabs selected="TaskManager" />
        <div css={boards}>
          <Board>
            <TaskTabs
              activeTaskTab={activeTaskTab}
              setActiveTaskTab={setActiveTaskTab}
            />
            <QuickAdd
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              userId={session?.user?.id as string}
              refetch={refetch}
            />
            <TaskCards
              tasks={tasks}
              refetch={refetch}
              openTaskDetail={openTaskDetail}
              selectedTaskId={selectedTaskId}
              setSelectedTaskId={setSelectedTaskId}
            ></TaskCards>
          </Board>
          <Board>
            {selected && (
              <TaskDetail
                selectedTask={selected.task}
                key={selected.task?.id}
              ></TaskDetail>
            )}
          </Board>
          <Board>
            <h1>subtask detail</h1>
          </Board>
        </div>
      </div>
    </>
  )
}

export default Home
