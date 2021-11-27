import * as React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean
}

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
`

const ActionButton = ({ children, onClick, disabled }: Props) => (
  <Button onClick={onClick} disabled={disabled}>{children}</Button>
)

export default ActionButton
