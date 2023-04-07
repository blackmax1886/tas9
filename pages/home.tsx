import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  GetTaskQuery,
  GetTaskDocument,
  GetTasksQuery,
  GetTasksDocument,
  Task,
} from '@/graphql/types/client'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'
import Board from '@/components/board'
import { TaskCards } from '@/components/task_card'
import { css } from '@emotion/react'
import QuickAdd from '@/components/quick_add'
import { TaskDetail } from '@/components/task_detail'
import Tabs from '@/components/tabs'

const home = css`
  display: flex;
  flex-direction: column;
`

const boards = css`
  display: flex;
  min-height: 50rem;
`

const taskFilterTabs = css`
  display: flex;
  justify-content: start;
  margin: 0 0 1rem 0;
`

const taskFilterTab = css`
  cursor: pointer;
  padding: 5px 30px;
  color: inherit;
  background-color: #339966;
  font-size: 1rem;
  text-decoration: none;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  border-radius: 4px 4px 0 0;
`

const activetaskFilterTab = css`
  ${taskFilterTab}
  background-color: inherit;
  border: 1px solid white;
  border-bottom: none;
`

const space = css`
  border-bottom: 1px solid white;
  flex: 1 0 auto;
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

  let tasks: Partial<Task>[] | undefined = []
  switch (activeTaskTab) {
    case 'tasks':
      tasks = data?.tasks.filter((task) => !task.done)
      break
    case 'done':
      tasks = data?.tasks.filter((task) => task.done)
      break
    default:
      tasks = data?.tasks
  }

  const openTaskDetail = (taskId: string | undefined) => {
    if (taskId) {
      setSelectedTaskId(taskId)
    }
  }

  const tasksTab =
    activeTaskTab === 'tasks' ? activetaskFilterTab : taskFilterTab
  const doneTab = activeTaskTab === 'done' ? activetaskFilterTab : taskFilterTab
  const allTab = activeTaskTab === 'all' ? activetaskFilterTab : taskFilterTab

  const handleClickTaskFilterTab = (tab: string) => {
    setActiveTaskTab(tab)
  }

  return (
    <div css={home}>
      <Header />
      <Tabs selected="TaskManager" />
      <div css={boards}>
        <Board>
          <div css={taskFilterTabs}>
            <div
              onClick={() => handleClickTaskFilterTab('tasks')}
              css={tasksTab}
            >
              tasks
            </div>
            <div onClick={() => handleClickTaskFilterTab('done')} css={doneTab}>
              done
            </div>
            <div onClick={() => handleClickTaskFilterTab('all')} css={allTab}>
              all
            </div>
            <div css={space}></div>
          </div>
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
