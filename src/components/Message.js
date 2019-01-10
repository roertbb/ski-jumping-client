import React from 'react';
import styled from 'styled-components';

const propToColor = (theme, color, hover) => {
  const col = hover ? theme.color.hover : theme.color;
  if (color === 'success') return col.green;
  else if (color === 'danger') return col.red;
  else if (color === 'info') return col.blue;
};

const MessageWrapper = styled.div`
  min-width: 300px;
  width: 25vw;
  position: fixed;
  margin: ${({ theme }) => theme.spacing.l};
  z-index: 1;
  padding: ${({ theme }) => theme.spacing.m};
  border-radius: ${({ theme }) => theme.spacing.s};
  bottom: 0;
  right: 0;
  background-color: ${({ theme, color }) => propToColor(theme, color, true)};
  color: white;
`;

const Message = ({ children, color }) => {
  return <MessageWrapper color={color}>{children}</MessageWrapper>;
};

export default Message;
