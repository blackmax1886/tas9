import { css } from '@emotion/react'

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

type taskTabsProps = {
  activeTaskTab: string
  setActiveTaskTab: (tab: string) => void
}

const TaskTabs = (props: taskTabsProps) => {
  const tasksTab =
    props.activeTaskTab === 'tasks' ? activetaskFilterTab : taskFilterTab
  const doneTab =
    props.activeTaskTab === 'done' ? activetaskFilterTab : taskFilterTab
  const allTab =
    props.activeTaskTab === 'all' ? activetaskFilterTab : taskFilterTab

  const handleClickTaskFilterTab = (tab: string) => {
    props.setActiveTaskTab(tab)
  }
  return (
    <div css={taskFilterTabs}>
      <div onClick={() => handleClickTaskFilterTab('tasks')} css={tasksTab}>
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
  )
}

export default TaskTabs
