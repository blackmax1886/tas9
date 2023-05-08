import { css } from '@emotion/react'
import { ReactElement } from 'react'

const board = css`
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #2e2e2e;
  padding: 8px;
  padding-bottom: 30px;
  width: 33%;
  margin: 1rem;
`
const Board = ({
  children,
}: {
  children: ReactElement | ReactElement[] | undefined
}) => {
  return <div css={board}>{children}</div>
}

export default Board
