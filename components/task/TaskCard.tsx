import { css } from '@emotion/react'
import Image from 'next/image'

import useTaskCard from './hooks/useTaskCard'

import { TaskSummaryFragment } from '@/graphql/types/client'

const checkbox = css`
  display: none;
`

const checkboxWrapper = css`
  display: flex;
  margin: 1rem;
  position: relative;
  width: 1.5rem;
  align-items: center;
`

const taskLabel = css`
  flex: 1 0 auto;
  max-width: 80%;
  overflow-wrap: break-word;
`

const deleteButton = css`
  background: transparent;
  border: none;
`

const taskCard = css`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  margin-bottom: 0.25rem;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
`

type taskCardProps = {
  task: TaskSummaryFragment
  openTaskDetail: (taskId: string) => void
  isSelected: boolean
  setSelectedTaskId: (taskId: string) => void
}

const TaskCard = (props: taskCardProps) => {
  const {
    isDone,
    handleTaskIsDone,
    handleDeleteTask: deleteTask,
  } = useTaskCard(props)

  const handleClickTask = () => {
    props.openTaskDetail(props.task.id)
  }

  const handleDeleteTask = () => {
    deleteTask()
    if (props.isSelected) {
      props.setSelectedTaskId('')
    }
  }

  const selectableTaskCard = css`
    ${taskCard}
    ${props.isSelected &&
    css`
      border: 2px solid #66bb6a;
    `}
  `

  const checkboxWrapperLabel = css`
    background: none repeat scroll 0 0 #eeeeee;
    border: 1px solid #dddddd;
    border-radius: 50%;
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;

    &:after {
      border: 2px solid #fff;
      border-top: none;
      border-right: none;
      content: '';
      height: 6px;
      left: 0.4rem;
      opacity: 0;
      position: absolute;
      top: 0.5rem;
      transform: rotate(-45deg);
      width: 12px;
    }

    ${isDone &&
    css`
      background-color: #66bb6a;
      border-color: #66bb6a;
      &:after {
        opacity: 1;
      }
    `}
  `

  return (
    <>
      <div key={props.task.id} css={selectableTaskCard} data-cy="taskCard">
        <div css={checkboxWrapper}>
          <input type="checkbox" css={checkbox}></input>
          <label
            css={checkboxWrapperLabel}
            data-cy="doneTaskLabel"
            onClick={handleTaskIsDone}
          ></label>
        </div>
        <label
          css={taskLabel}
          onClick={handleClickTask}
          data-cy="taskCardTitle"
        >
          {props.task.title}
        </label>
        <button
          css={deleteButton}
          data-cy="deleteTaskButon"
          onClick={handleDeleteTask}
        >
          <Image
            src="/delete-button.png"
            alt="delete"
            height={24}
            width={24}
          ></Image>
        </button>
      </div>
    </>
  )
}

type taskCardsProps = {
  tasks: TaskSummaryFragment[]
  openTaskDetail: (taskId: string) => void
  selectedTaskId: string
  setSelectedTaskId: (taskId: string) => void
}

const TaskCards = (props: taskCardsProps) => {
  return (
    <>
      {props.tasks.map((task: TaskSummaryFragment) => (
        <TaskCard
          key={task.id}
          task={task}
          openTaskDetail={props.openTaskDetail}
          isSelected={task.id === props.selectedTaskId}
          setSelectedTaskId={props.setSelectedTaskId}
        ></TaskCard>
      ))}
    </>
  )
}

type draggableTaskCardProps = {
  task: TaskSummaryFragment
  setDraggedTask: (task: TaskSummaryFragment) => void
}

const DraggableTaskCard = (props: draggableTaskCardProps) => {
  const { isDone, handleTaskIsDone, handleDeleteTask } = useTaskCard(props)

  const handleDragStart = () => {
    console.log('drag start taskId:', props.task.id)
    props.setDraggedTask(props.task)
  }

  const checkboxWrapperLabel = css`
    background: none repeat scroll 0 0 #eeeeee;
    border: 1px solid #dddddd;
    border-radius: 50%;
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;

    &:after {
      border: 2px solid #fff;
      border-top: none;
      border-right: none;
      content: '';
      height: 6px;
      left: 0.4rem;
      opacity: 0;
      position: absolute;
      top: 0.5rem;
      transform: rotate(-45deg);
      width: 12px;
    }

    ${isDone &&
    css`
      background-color: #66bb6a;
      border-color: #66bb6a;
      &:after {
        opacity: 1;
      }
    `}
  `

  const draggableTaskCard = css`
    ${taskCard}
    ${props.task?.start &&
    css`
      background-color: #2285c2;
    `}
  `

  return (
    <>
      <div key={props.task.id} draggable={true} css={draggableTaskCard}>
        <div css={checkboxWrapper}>
          <input type="checkbox" css={checkbox}></input>
          <label css={checkboxWrapperLabel} onClick={handleTaskIsDone}></label>
        </div>
        <label css={taskLabel} onDragStart={handleDragStart} draggable>
          {props.task.title}
        </label>
        <button css={deleteButton} onClick={handleDeleteTask}>
          <Image
            src="/delete-button.png"
            alt="delete"
            height={24}
            width={24}
          ></Image>
        </button>
      </div>
    </>
  )
}

type draggableTaskCardsProps = {
  tasks: TaskSummaryFragment[]
  //TODO: not undefined, should be null?
  setDraggedTask: (task: TaskSummaryFragment) => void
}

const DraggableTaskCards = (props: draggableTaskCardsProps) => {
  return (
    <>
      {props.tasks.map((task: TaskSummaryFragment) => (
        <DraggableTaskCard
          key={task.id}
          task={task}
          setDraggedTask={props.setDraggedTask}
        ></DraggableTaskCard>
      ))}
    </>
  )
}

export { TaskCard, TaskCards, DraggableTaskCard, DraggableTaskCards }
