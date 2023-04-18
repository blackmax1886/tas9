import { useQuery, useMutation } from '@apollo/client'
import { css } from '@emotion/react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { stringOrDate } from 'react-big-calendar'

import Board from '@/components/board'
import Calendar from '@/components/calendar'
import Header from '@/components/header'
import QuickAdd from '@/components/quick_add'
import Tabs from '@/components/tabs'
import { DraggableTaskCards } from '@/components/task_card'
import TaskTabs from '@/components/task_tabs'
import {
  GetTasksQuery,
  GetTasksDocument,
  UpdateTaskStartEndMutation,
  UpdateTaskStartEndDocument,
  Task,
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
  const { data, refetch } = useQuery<GetTasksQuery>(GetTasksDocument, {
    variables: { userId: session?.user?.id },
    skip: status === 'loading',
  })
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [activeTaskTab, setActiveTaskTab] = useState('tasks')
  const [draggedTask, setDraggedTask] = useState<Partial<Task> | null>()
  const [updateTaskStartEnd] = useMutation<UpdateTaskStartEndMutation>(
    UpdateTaskStartEndDocument,
    {
      onCompleted() {
        // Idea: to optimize, do not use refetch & use only mutation & add event to calendar manually
        refetch()
      },
    }
  )
  const tasks = filterByActiveTab(activeTaskTab, data?.tasks)

  const handleDropFromOutside = ({
    start,
    end,
  }: {
    start: stringOrDate
    end: stringOrDate
  }) => {
    updateTaskStartEnd({
      variables: {
        taskId: draggedTask?.id,
        start: dayjs(start).valueOf(),
        end: dayjs(end).valueOf(),
      },
    })
    setDraggedTask(null)
  }
  const handleEventDrop = ({
    event,
    start,
    end,
  }: {
    event: object
    start: stringOrDate
    end: stringOrDate
  }) => {
    updateTaskStartEnd({
      variables: {
        // @ts-expect-error to be fixed
        taskId: event.taskId,
        start: dayjs(start).valueOf(),
        end: dayjs(end).valueOf(),
      },
    })
  }

  const resizeEvent = ({
    event,
    start,
    end,
  }: {
    event: object
    start: stringOrDate
    end: stringOrDate
  }) => {
    updateTaskStartEnd({
      variables: {
        // @ts-expect-error to be fixed
        taskId: event.taskId,
        start: dayjs(start).valueOf(),
        end: dayjs(end).valueOf(),
      },
    })
  }

  return (
    <>
      <Head>
        <title>Timetable</title>
      </Head>
      <div>
        <Header />
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
              userId={session?.user?.id}
              refetch={refetch}
            />
            <DraggableTaskCards
              tasks={tasks}
              refetch={refetch}
              setDraggedTask={setDraggedTask}
            ></DraggableTaskCards>
          </Board>
          <div css={calendarWrapper}>
            <Calendar
              tasks={data?.tasks}
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
