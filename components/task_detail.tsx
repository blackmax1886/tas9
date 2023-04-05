import { css } from '@emotion/react'
import {
  Task,
  UpdateTaskContentMutation,
  UpdateTaskContentDocument,
} from '@/graphql/types/client'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import 'dayjs/locale/ja'
import dayjs from 'dayjs'

dayjs.locale('ja')

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
`

const TaskDetail = ({
  selectedTask,
}: {
  selectedTask: Partial<Task> | null | undefined
}) => {
  const [content, setContent] = useState(selectedTask?.content || '')
  const [isSaved, setIsSaved] = useState(true)
  const [updateTaskContent] = useMutation<UpdateTaskContentMutation>(
    UpdateTaskContentDocument
  )

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

  const handleChangeTaskContent = (event: ContentEditableEvent) => {
    setIsSaved(false)
    setContent(event.target.value || '')
  }

  const start = selectedTask?.start
    ? dayjs(selectedTask.start).format('YYYY/MM/DD hh:mm')
    : ''
  const end = selectedTask?.end
    ? dayjs(selectedTask.end).format('YYYY/MM/DD hh:mm')
    : ''

  return (
    <div css={taskDetail}>
      <h1 css={taskName}>{selectedTask?.title}</h1>
      <div>start: {start}</div>
      <div>end: {end}</div>
      <div css={taskContentWrapper}>
        <ContentEditable
          css={taskContent}
          html={content}
          onChange={handleChangeTaskContent}
        />
      </div>
      <div>{isSaved ? 'saved' : 'saving...'}</div>
    </div>
  )
}

export { TaskDetail }
