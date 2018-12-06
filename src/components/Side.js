import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Side = styled.div`
  flex-basis: 350px;
  background-color: ${({ theme }) => theme.color.white};
  height: 100vh;

  ul {
    list-style: none;
    padding-left: ${({ theme }) => theme.spacing.m};
  }
`;

const NavItem = styled(NavLink)`
  text-decoration: none;

  &.${props => props.activeClassName} {
    font-weight: ${({ theme }) => theme.font.bold};
  }
`;

function SideNavigation() {
  return (
    <Side>
      <ul>
        <li>
          <NavItem activeClassName="active" to="/tournament">
            Tournament
          </NavItem>
        </li>
      </ul>
    </Side>
  );
}

export default SideNavigation;
