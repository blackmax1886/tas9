import { css } from '@emotion/react'
import React from 'react'

interface ModalProps {
  isOpen: boolean
  title: string
  content: string
  isWarnStyle?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  content,
  isWarnStyle,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  const confirmStyle = isWarnStyle ? cautionButtonStyle : safeButtonStyle

  return (
    <div css={overlayStyle}>
      <div css={modalStyle}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div css={buttons}>
          <button onClick={onConfirm} css={confirmStyle}>
            OK
          </button>
          <button onClick={onCancel} css={cancelButtonStyle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: default;
`

const modalStyle = css`
  background-color: #2f4f4f;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  z-index: 10000;
`

const buttons = css`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid white;
  padding: 1rem 1rem;
`

const safeButtonStyle = css`
  background-color: #4caf50
  color: inherit;
  cursor: pointer;
`

const cautionButtonStyle = css`
  background-color: #a52a2a; /* brown */
  color: inherit;
  cursor: pointer;
`

const cancelButtonStyle = css`
  background-color: #848484;
  color: inherit;
  cursor: pointer;
`

export default Modal
