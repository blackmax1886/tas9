import { SerializedStyles, css } from '@emotion/react'
import { Session } from 'next-auth'
import React, { useState } from 'react'

type User = Session['user']
type AccoutMenuProps = {
  style: SerializedStyles
  user: User
}

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

const AccountMenu = (props: AccoutMenuProps) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  const handleAccountDeletion = () => {
    // アカウント削除処理
    console.log('open confirmation of account deletion')
  }

  const accountMenu = css`
    ${props.style}
    position: relative;
  `
  return (
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
  )
}

export default AccountMenu
