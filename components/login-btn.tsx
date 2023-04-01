import { useSession, signIn, signOut } from 'next-auth/react'
import { useQuery, gql } from '@apollo/client'

const GetUserQuery = gql`
  query getUser($userId: String!) {
    user(id: $userId) {
      id
      name
      email
    }
  }
`
const LoginButton = () => {
  const { data: session, status } = useSession()
  const { data } = useQuery(GetUserQuery, {
    variables: { userId: session?.user?.id },
    skip: status === 'loading',
  })
  if (session && data) {
    return (
      <>
        <h1>ID: {data.user.id}</h1>
        <p>name: {data.user.name}</p>
        <p>email: {data.user.email}</p>
        Signed in as {session.user?.email} <br />
        Id : {session.user?.id}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </>
  )
}

export default LoginButton
