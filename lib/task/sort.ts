import { TaskSummaryFragment } from '@/graphql/types/client'

const sortTasksByStart = (tasks: TaskSummaryFragment[]) => {
  return tasks.sort((a, b) => {
    if (a.start === undefined || a.start === null) return -1
    if (b.start === undefined || b.start === null) return 1
    return a.start - b.start
  })
}

export { sortTasksByStart }
