import { css } from '@emotion/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import AccountMenu from './account_menu'

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
  flex: 1 0 auto;
  font-size: inherit;
  padding: 1rem;
  cursor: pointer;
`

type User = Session['user']
type headerProps = {
  user: User
}

const Header = (props: headerProps) => {
  return (
    <div css={header}>
      <div css={logo}>Tas9</div>
      <nav css={nav}>
        <div onClick={() => signOut()} css={navItem}>
          Sign Out
        </div>
        <AccountMenu style={navItem} user={props.user} />
      </nav>
    </div>
  )
}

export default Header
