import { css } from '@emotion/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { signIn } from 'next-auth/react'

const card = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  padding: 2.5rem;
  box-sizing: border-box;
  border: 1px solid #dadce0;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  text-align: center;
`

const heading = css`
  font-family: inherit;
  margin: 0 0 1rem;
  padding: 0;
  text-align: center;
  font-size: 3rem;
  font-weight: 400;
`

const Button = css`
  color: inherit;
  background-color: #4caf50; /* Green */
  border: none;
  padding: 0.5rem;
  margin: 1rem;
  text-align: center;
  font-size: inherit;
  border-radius: 0.25rem;
`

const Top: NextPage & {
  isRootPage?: boolean
} = () => {
  return (
    <>
      <Head>
        <title>Tas9</title>
      </Head>
      <div css={card}>
        <h1 css={heading}>tas9</h1>
        <p>Make your Day more efficient</p>
        <button
          css={Button}
          onClick={() => signIn('google', { callbackUrl: '/home' })}
        >
          Sign in with Google
        </button>
      </div>
    </>
  )
}

Top.isRootPage = true

export default Top
