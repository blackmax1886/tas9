import { Task } from '@/graphql/types/client'

const filterByActiveTab = (
  activeTaskTab: string,
  tasks: Partial<Task>[] | undefined
) => {
  let result: Partial<Task>[] | undefined = []
  switch (activeTaskTab) {
    case 'tasks':
      result = tasks?.filter((task) => !task.done)
      break
    case 'done':
      result = tasks?.filter((task) => task.done)
      break
    default:
      result = tasks
  }
  return result
}

export { filterByActiveTab }
