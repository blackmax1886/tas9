import { useSession, signIn, signOut } from 'next-auth/react'

const LoginButton = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
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
