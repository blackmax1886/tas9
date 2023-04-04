import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'

import { GetTasksDocument } from '@/graphql/types/client'
import { GetTasksQuery } from '@/graphql/types/client'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data } = useQuery<GetTasksQuery>(GetTasksDocument, {
    variables: { userId: session?.user?.id },
    skip: status === 'loading',
  })
  return (
    <div style={{ margin: '0 auto', width: '1600px' }}>
      <Header />
      {data?.tasks?.map((task) => (
        <div key={task.id}>
          <h1>{task.content}</h1>
          <p>id:{task.id}</p>
          <p>name:{task.title}</p>
          <p>content:{task.content}</p>
        </div>
      ))}
    </div>
  )
}

export default Home
