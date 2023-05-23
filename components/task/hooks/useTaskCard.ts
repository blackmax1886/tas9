import { useMutation } from '@apollo/client'
import { useState } from 'react'

import {
  DeleteTaskDocument,
  DeleteTaskMutation,
  UpdateTaskIsDoneDocument,
  UpdateTaskIsDoneMutation,
} from '@/graphql/types/client'
import { TaskSummaryFragment } from '@/graphql/types/client'

const useTaskCard = (props: { task: TaskSummaryFragment }) => {
  const [isDone, setIsDone] = useState(props.task.done)
  const [updateTaskIsDone] = useMutation<UpdateTaskIsDoneMutation>(
    UpdateTaskIsDoneDocument
  )
  const [deleteTask] = useMutation<DeleteTaskMutation>(DeleteTaskDocument, {
    update: (cache, mutationResult) => {
      if (mutationResult.data?.deleteTask) {
        cache.evict({ id: cache.identify(mutationResult.data.deleteTask) })
      }
    },
    optimisticResponse: {
      deleteTask: {
        __typename: 'Task',
        id: props.task.id,
        userId: props.task.userId,
        title: props.task.title,
        done: props.task.done,
        start: props.task.start,
        end: props.task.end,
        group: props.task.group,
        type: props.task.type,
        priority: props.task.priority,
        archived: props.task.archived,
      },
    },
  })

  const handleTaskIsDone = () => {
    const { id, done, ...rest } = props.task

    setIsDone(!isDone)
    updateTaskIsDone({
      variables: {
        taskId: id,
        isDone: !isDone,
      },
      optimisticResponse: {
        updateTask: {
          id: id,
          done: !done,
          ...rest,
          __typename: 'Task',
        },
      },
    })
  }

  const handleDeleteTask = () => {
    deleteTask({ variables: { taskId: props.task.id } })
  }

  return { isDone, handleTaskIsDone, handleDeleteTask }
}

export default useTaskCard
