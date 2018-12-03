import styled from 'styled-components';
import React from 'react';

const Side = styled.div`
  flex-basis: 350px;
  background-color: ${({ theme }) => theme.color.white};
  height: 100vh;
`;

function SideNavigation() {
  return (
    <Side>
      <p>Navigation</p>
    </Side>
  );
}

export default SideNavigation;
