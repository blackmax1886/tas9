import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  GetTaskQuery,
  GetTaskDocument,
  GetTasksQuery,
  GetTasksDocument,
} from '@/graphql/types/client'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'
import Board from '@/components/board'
import { TaskCards } from '@/components/task_card'
import { css } from '@emotion/react'
import QuickAdd from '@/components/quick_add'
import { TaskDetail } from '@/components/task_detail'
import Tabs from '@/components/tabs'
import TaskTabs from '@/components/task_tabs'
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
    <div css={home}>
      <Header />
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
            userId={session?.user?.id}
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
  )
}

export default Home
