import { useMutation } from '@apollo/client'
import { css } from '@emotion/react'
import { KeyboardEvent, useRef, useState } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { useUpdateEffect } from 'react-use'

import {
  TaskDetailsFragment,
  UpdateTaskContentMutation,
  UpdateTaskContentDocument,
  UpdateTaskTitleMutation,
  UpdateTaskTitleDocument,
} from '@/graphql/types/client'
import { dayjs, formatString } from '@/lib/day'

const taskDetail = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const taskName = css`
  overflow-wrap: break-word;
`

const taskContentWrapper = css`
  flex: 1 0 auto;
  display: flex;
  margin-top: 1rem;
`

const taskContent = css`
  flex: 1 0 auto;
  border: none;
  border-radius: 0.5rem;
  outline: none;
  resize: none;
  background-color: #424242;
  padding: 1rem;
  font-size: inherit;
  font-family: inherit;
  overflow-wrap: anywhere;
  width: fit-content;
`

const TaskDetail = ({
  selectedTask,
}: {
  selectedTask: TaskDetailsFragment
}) => {
  const [title, setTitle] = useState(selectedTask.title)
  const [content, setContent] = useState(selectedTask.content || '')
  const [isSaving, setIsSaving] = useState(false)
  const [updateTaskContent] = useMutation<UpdateTaskContentMutation>(
    UpdateTaskContentDocument
  )
  const [updateTaskTitle] = useMutation<UpdateTaskTitleMutation>(
    UpdateTaskTitleDocument
  )
  const taskContentRef = useRef<HTMLDivElement>(null)

  useUpdateEffect(() => {
    const timeoutId = setTimeout(() => {
      updateTaskContent({
        variables: { taskId: selectedTask.id, content: content },
      })
      setIsSaving(false)
    }, 3000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [content])

  useUpdateEffect(() => {
    const { id, title: _, ...rest } = selectedTask
    const timeoutId = setTimeout(() => {
      updateTaskTitle({
        variables: { taskId: id, title: title },
        optimisticResponse: {
          updateTask: {
            id: selectedTask.id,
            title: title,
            ...rest,
            __typename: 'Task',
          },
        },
      })
      setIsSaving(false)
    }, 3000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [title])

  const handleChangeTaskTitle = (event: ContentEditableEvent) => {
    const titleInput = event.target.value || ''
    setIsSaving(true)
    setTitle(titleInput)
  }
  const handleEnterOnTaskTitle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault() // prevent new line
      taskContentRef.current?.focus()
    }
  }
  const handleChangeTaskContent = (event: ContentEditableEvent) => {
    setIsSaving(true)
    setContent(event.target.value || '')
  }

  const start = selectedTask.start
    ? dayjs(selectedTask.start).format(formatString)
    : ''
  const end = selectedTask.end
    ? dayjs(selectedTask.end).format(formatString)
    : ''

  return (
    <div css={taskDetail} data-cy="taskDetail">
      <h1 css={taskName} data-cy="taskDetailTitle">
        <ContentEditable
          html={title}
          onChange={handleChangeTaskTitle}
          onKeyDown={handleEnterOnTaskTitle}
          data-cy="editableTaskDetailTitle"
        />
      </h1>
      <div data-cy="taskDetailStart">start: {start}</div>
      <div data-cy="taskDetailEnd">end: {end}</div>
      <div css={taskContentWrapper} data-cy="taskDetailContent">
        <ContentEditable
          css={taskContent}
          html={content}
          onChange={handleChangeTaskContent}
          innerRef={taskContentRef}
          data-cy="editableTaskDetailContent"
        />
      </div>
      <div>{isSaving ? 'saving...' : 'saved'}</div>
    </div>
  )
}

export { TaskDetail }
