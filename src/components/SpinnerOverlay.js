import React from 'react';
import styled from 'styled-components';
import Spinner from './Spiner';

const Overlay = styled.div`
  width: calc(100% - 2 * ${({ theme }) => theme.spacing.l});
  height: calc(100% - 2 * ${({ theme }) => theme.spacing.l});
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.white};
  opacity: 0.5;
`;

function OverlaySpinner() {
  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
}

export default OverlaySpinner;
