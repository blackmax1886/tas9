import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  GetTasksQuery,
  GetTasksDocument,
  UpdateTaskStartEndMutation,
  UpdateTaskStartEndDocument,
  Task,
} from '@/graphql/types/client'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'
import Board from '@/components/board'
import { css } from '@emotion/react'
import { DraggableTaskCards } from '@/components/task_card'
import Calendar from '@/components/calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { stringOrDate } from 'react-big-calendar'
import Tabs from '@/components/tabs'
import QuickAdd from '@/components/quick_add'

dayjs.locale('ja')

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
  const tasks = data?.tasks

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
    <div>
      <Header />
      <Tabs selected="Timetable" />
      <div css={boards}>
        <Board>
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
  )
}

export default TimeTable
