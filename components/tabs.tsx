import { css } from '@emotion/react'
import Link from 'next/link'

const tabs = css`
  display: flex;
  justify-content: start;
  margin: 0 1rem;
`

const tab = css`
  cursor: pointer;
  padding: 5px 30px;
  color: inherit;
  background-color: #339966;
  font-size: 1rem;
  text-decoration: none;
  border-bottom: 1px solid white;
  border-radius: 4px 4px 0 0;
`
const activeTab = css`
  ${tab}
  background-color: inherit;
  border: 1px solid white;
  border-bottom: none;
`

const space = css`
  border-bottom: 1px solid white;
  flex: 1 0 auto;
`

const Tabs = ({ selected }: { selected: string }) => {
  const TaskManagerTab = selected === 'TaskManager' ? activeTab : tab
  const TimetableTab = selected === 'Timetable' ? activeTab : tab
  return (
    <div css={tabs}>
      <Link href="/home" css={TaskManagerTab}>
        Task Manager
      </Link>
      <Link href="/timetable" css={TimetableTab}>
        Timetable
      </Link>
      <div css={space}></div>
    </div>
  )
}

export default Tabs
