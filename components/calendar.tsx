import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
  stringOrDate,
} from 'react-big-calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { css } from '@emotion/react'
import { Task } from '@/graphql/types/client'
import styled from '@emotion/styled'

dayjs.locale('ja')
const formatString = 'YYYY-MM-DD HH:mm'
const localizer = dayjsLocalizer(dayjs)
const DragAndDropCalendar = withDragAndDrop(ReactBigCalendar)

const tasksAsEvents = (tasks: Partial<Task>[] | undefined) => {
  if (!tasks) {
    return []
  }
  const events = tasks.map((task) => {
    return {
      taskId: task.id,
      title: task.title,
      start: dayjs(task.start, formatString).toDate(),
      end: dayjs(task.end, formatString).toDate(),
    }
  })
  return events
}

const calendar = css`
  height: 800px;
`

const timeslot = css`
  height: 50px;
`

export const CalendarStyleWrapper = styled.div`
  .rbc-today {
    background-color: #8da0b6;
  }
  .rbc-btn-group > button {
    color: inherit;
  }
  button.rbc-active {
    background-color: #8da0b6;
  }
  .rbc-toolbar button:hover {
    background-color: #bbe2f1;
  }
  .rbc-toolbar button:focus {
    color: inherit;
    background-color: #8da0b6;
  }
`

type TimeSlotWrapperProps = {
  children: React.ReactNode
}

// TODO: Fix type error from TimeSlowWrapper arg
const TimeSlotWrapper: React.FC<TimeSlotWrapperProps> = ({ children }) => {
  return <div css={timeslot}>{children}</div>
}

const Calendar = ({
  tasks,
  onDropFromOutside,
  onEventDrop,
  onEventResize,
}: {
  tasks: Partial<Task>[] | undefined
  onDropFromOutside: ({
    start,
    end,
  }: {
    start: stringOrDate
    end: stringOrDate
  }) => void
  onEventDrop: ({
    event,
    start,
    end,
  }: {
    event: object
    start: stringOrDate
    end: stringOrDate
  }) => void
  onEventResize: ({
    event,
    start,
    end,
  }: {
    event: object
    start: stringOrDate
    end: stringOrDate
  }) => void
}) => {
  const events = tasksAsEvents(tasks)
  const defaultDate = dayjs().toDate()
  const scrollToTime = dayjs().toDate()
  return (
    <CalendarStyleWrapper>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        defaultView="day"
        defaultDate={defaultDate}
        scrollToTime={scrollToTime}
        onDropFromOutside={onDropFromOutside}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        components={{
          // @ts-expect-error to be fixed
          timeSlotWrapper: TimeSlotWrapper,
        }}
        css={calendar}
      />
    </CalendarStyleWrapper>
  )
}

export default Calendar
