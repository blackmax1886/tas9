import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'

import { GetTasksDocument } from '@/graphql/types/client'
import { GetTasksQuery } from '@/graphql/types/client'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'
import Board from '@/components/board'
import { css } from '@emotion/react'

const boards = css`
  display: flex;
  min-height: 50rem;
`

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data } = useQuery<GetTasksQuery>(GetTasksDocument, {
    variables: { userId: session?.user?.id },
    skip: status === 'loading',
  })
  return (
    <div>
      <Header />
      <div css={boards}>
        <Board>
          <h1>developing task-list here</h1>
        </Board>
        <Board>
          <h1>task detail</h1>
        </Board>
        <Board>
          <h1>subtask detail</h1>
        </Board>
      </div>
    </div>
  )
}

export default Home
