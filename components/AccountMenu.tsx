import { useMutation } from '@apollo/client'
import { SerializedStyles, css } from '@emotion/react'
import router from 'next/router'
import { Session } from 'next-auth'
import { useEffect, useRef, useState } from 'react'

import Modal from './Modal'

import { DeleteUserDocument, DeleteUserMutation } from '@/graphql/types/client'

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
  border-radius: 1rem;
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
  const [isModalOpen, setModalOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [deleteAccount] = useMutation<DeleteUserMutation>(DeleteUserDocument, {
    onCompleted() {
      router.push('/')
    },
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  const handleAccountDeletion = () => {
    setModalOpen(true)
  }

  const handleConfirm = () => {
    deleteAccount({
      variables: {
        userId: props.user?.id,
      },
    })
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  const accountMenu = css`
    ${props.style}
    position: relative;
  `
  return (
    <div ref={menuRef} css={accountMenu}>
      <div data-cy='accountMenu' onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}>
        Account
      </div>
      {isAccountMenuOpen && (
        <div data-cy='accountToggleMenu' css={accountToggleMenu}>
          <div data-cy='accountMenuHeader' css={accountToggleMenuHeader}>{props.user?.email}</div>
          <div data-cy='deleteAccount' onClick={handleAccountDeletion} css={accountToggleMenuItem}>
            delete tas9 account
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        title='Delete Account'
        content='Are you sure you want to delete your account?'
        isWarnStyle={true}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  )
}

export default AccountMenu
