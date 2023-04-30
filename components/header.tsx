import { css } from '@emotion/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

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

const accountMenu = css`
  ${navItem}
  position: relative;
`

const accountToggleMenu = css`
  display: flex;
  flex-direction: column;
  width: max-content;
  padding: 1rem;
  position: absolute;
  top: 4rem;
  right: 2rem;
  background-color: #424242;
  font-size: inherit;
  z-index: 100;
`

const accountToggleMenuHeader = css`
  padding: 1rem 0;
  cursor: default;
  border-bottom: 1px solid white;
`

const accountToggleMenuItem = css`
  padding: 1rem 0;
  &:hover {
    background-color: #43676b;
  }
`

type User = Session['user']
type headerProps = {
  user: User
}

const Header = (props: headerProps) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  const handleAccountDeletion = () => {
    // アカウント削除処理
    console.log('open confirmation of account deletion')
  }

  return (
    <div css={header}>
      <div css={logo}>Tas9</div>
      <nav css={nav}>
        <div onClick={() => signOut()} css={navItem}>
          Sign Out
        </div>
        <div css={accountMenu}>
          <div onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}>
            Account
          </div>
          {isAccountMenuOpen && (
            <div css={accountToggleMenu}>
              <div css={accountToggleMenuHeader}>{props.user?.email}</div>
              <div onClick={handleAccountDeletion} css={accountToggleMenuItem}>
                delete tas9 account
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Header
