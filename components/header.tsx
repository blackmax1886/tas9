import { css } from '@emotion/react'
import { signOut } from 'next-auth/react'

const header = css`
  display: flex;
  align-items: center;
  padding: 1rem;
`

const logo = css`
  font-size: 2rem;
`

const nav = css`
  margin-left: auto;
  display: flex;
`

const navItem = css`
  font-size: 1rem;
  padding: 1rem;
`

const Header = () => {
  return (
    <div css={header}>
      <div css={logo}>Tas9</div>
      <nav css={nav}>
        <button onClick={() => signOut()} css={navItem}>
          Sign Out
        </button>
        <div css={navItem}>Account</div>
      </nav>
    </div>
  )
}

export default Header
