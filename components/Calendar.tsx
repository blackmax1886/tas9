import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
  stringOrDate,
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import { TaskSummaryFragment } from '@/graphql/types/client'
import { dayjs, formatString } from '@/lib/day'

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

export type taskAsEvent = {
  taskId: string
  title: string
  start: stringOrDate
  end: stringOrDate
}

type calendarEventArgs = {
  event: taskAsEvent
  start: stringOrDate
  end: stringOrDate
  isAllDay: boolean
}

const localizer = dayjsLocalizer(dayjs)
const DragAndDropCalendar = withDragAndDrop<taskAsEvent, object>(
  ReactBigCalendar
)

const tasksAsEvents = (tasks: TaskSummaryFragment[]) => {
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

const TimeSlotWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div css={timeslot}>{children}</div>
}

const Calendar = ({
  tasks,
  onDropFromOutside,
  onEventDrop,
  onEventResize,
}: {
  tasks: TaskSummaryFragment[]
  onDropFromOutside: ({
    start,
    end,
  }: {
    start: stringOrDate
    end: stringOrDate
  }) => void
  onEventDrop: (args: calendarEventArgs) => void
  onEventResize: (args: calendarEventArgs) => void
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
          timeSlotWrapper: TimeSlotWrapper,
        }}
        css={calendar}
      />
    </CalendarStyleWrapper>
  )
}

export default Calendar
