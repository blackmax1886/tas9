import { TaskSummaryFragment } from '@/graphql/types/client'

const filterByActiveTab = (
  activeTaskTab: string,
  tasks: TaskSummaryFragment[]
) => {
  let result: TaskSummaryFragment[]
  switch (activeTaskTab) {
    case 'tasks':
      result = tasks.filter((task) => !task.done)
      break
    case 'done':
      result = tasks.filter((task) => task.done)
      break
    default:
      // useQuery result is readonly object
      result = [...tasks]
  }
  return result
}

export { filterByActiveTab }
