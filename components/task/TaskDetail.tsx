import { useMutation } from '@apollo/client'
import { css } from '@emotion/react'
import { KeyboardEvent, useRef, useState } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { useUpdateEffect } from 'react-use'

import {
  TaskDetailsFragment,
  UpdateTaskContentMutation,
  UpdateTaskContentDocument,
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
  const [content, setContent] = useState(selectedTask?.content || '')
  const [isSaved, setIsSaved] = useState(true)
  const [updateTaskContent] = useMutation<UpdateTaskContentMutation>(
    UpdateTaskContentDocument
  )
  const taskContentRef = useRef<HTMLDivElement>(null)

  useUpdateEffect(() => {
    const timeoutId = setTimeout(() => {
      updateTaskContent({
        variables: { taskId: selectedTask?.id, content: content },
      })
      console.log('run update')
      setIsSaved(true)
    }, 3000)
    return () => {
      console.log('run cleanup')
      clearTimeout(timeoutId)
    }
  }, [content])

  const handleChangeTaskTitle = (event: ContentEditableEvent) => {
    //TODO: setTaskTitle
    console.log(event.target.value || '')
  }
  const handleEnterOnTaskTitle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault() // prevent new line
      taskContentRef.current?.focus()
    }
  }
  const handleChangeTaskContent = (event: ContentEditableEvent) => {
    setIsSaved(false)
    setContent(event.target.value || '')
  }

  const start = selectedTask?.start
    ? dayjs(selectedTask.start).format(formatString)
    : ''
  const end = selectedTask?.end
    ? dayjs(selectedTask.end).format(formatString)
    : ''

  return (
    <div css={taskDetail} data-cy="taskDetail">
      <h1 css={taskName} data-cy="taskDetailTitle">
        <ContentEditable
          html={selectedTask?.title}
          onChange={handleChangeTaskTitle}
          onKeyDown={handleEnterOnTaskTitle}
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
        />
      </div>
      <div>{isSaved ? 'saved' : 'saving...'}</div>
    </div>
  )
}

export { TaskDetail }
