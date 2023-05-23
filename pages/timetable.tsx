import { useQuery, useMutation } from '@apollo/client'
import { css } from '@emotion/react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { stringOrDate } from 'react-big-calendar'

import Board from '@/components/Board'
import Calendar, { taskAsEvent } from '@/components/Calendar'
import Header from '@/components/Header'
import Tabs from '@/components/Tabs'
import QuickAdd from '@/components/task/QuickAdd'
import { DraggableTaskCards } from '@/components/task/TaskCard'
import TaskTabs from '@/components/task/TaskTabs'
import {
  GetTasksQuery,
  GetTasksDocument,
  UpdateTaskStartEndMutation,
  UpdateTaskStartEndDocument,
  TaskSummaryFragment,
} from '@/graphql/types/client'
import { dayjs } from '@/lib/day'
import { filterByActiveTab } from '@/lib/task/filter'

const boards = css`
  display: flex;
  min-height: 50rem;
`

const calendarWrapper = css`
  width: 66%;
  margin: 1rem;
  padding: 8px;
  padding-bottom: 30px;
`

const TimeTable = () => {
  const { data: session, status } = useSession()
  const { data, refetch, loading, error } = useQuery<GetTasksQuery>(
    GetTasksDocument,
    {
      variables: { userId: session?.user?.id },
      skip: status === 'loading',
    }
  )
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [activeTaskTab, setActiveTaskTab] = useState('tasks')
  const [draggedTask, setDraggedTask] = useState<TaskSummaryFragment | null>()
  const [updateTaskStartEnd] = useMutation<UpdateTaskStartEndMutation>(
    UpdateTaskStartEndDocument
  )
  let tasks: TaskSummaryFragment[] = []
  if (!loading && !error && data) {
    tasks = filterByActiveTab(activeTaskTab, data.tasks)?.reverse()
  }

  const updateTaskTime = (
    taskId: string,
    startInput: stringOrDate,
    endInput: stringOrDate
  ) => {
    const startUnixMillis = dayjs(startInput).valueOf()
    const endUnixMillis = dayjs(endInput).valueOf()
    updateTaskStartEnd({
      variables: {
        taskId: taskId,
        start: startUnixMillis,
        end: endUnixMillis,
      },
      optimisticResponse: {
        updateTask: {
          __typename: 'Task',
          id: taskId,
          start: startUnixMillis,
          end: endUnixMillis,
        },
      },
    })
  }

  const handleDropFromOutside = ({
    start: startInput,
    end: endInput,
  }: {
    start: stringOrDate
    end: stringOrDate
  }) => {
    if (!draggedTask) {
      return
    }
    updateTaskTime(draggedTask.id, startInput, endInput)
    setDraggedTask(null)
  }

  const handleEventDrop = ({
    event,
    start: startInput,
    end: endInput,
  }: {
    event: taskAsEvent
    start: stringOrDate
    end: stringOrDate
  }) => {
    updateTaskTime(event.taskId, startInput, endInput)
  }

  const resizeEvent = ({
    event,
    start: startInput,
    end: endInput,
  }: {
    event: taskAsEvent
    start: stringOrDate
    end: stringOrDate
  }) => {
    updateTaskTime(event.taskId, startInput, endInput)
  }

  return (
    <>
      <Head>
        <title>Timetable</title>
      </Head>
      <div>
        <Header user={session?.user} />
        <Tabs selected="Timetable" />
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
            {!loading && !error ? (
              <DraggableTaskCards
                tasks={tasks}
                setDraggedTask={setDraggedTask}
              ></DraggableTaskCards>
            ) : (
              <></>
            )}
          </Board>
          <div css={calendarWrapper}>
            <Calendar
              tasks={tasks}
              onDropFromOutside={handleDropFromOutside}
              onEventDrop={handleEventDrop}
              onEventResize={resizeEvent}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TimeTable
