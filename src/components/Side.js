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
  color: ${({ theme }) => theme.color.black};

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
        <li>
          <NavItem activeClassName="active" to="/ski-jumping-hill">
            Ski Jumping Hill
          </NavItem>
        </li>
        <li>
          <NavItem activeClassName="active" to="/team">
            Team
          </NavItem>
        </li>
        <li>
          <NavItem activeClassName="active" to="/ski-jumper">
            Ski Jumper
          </NavItem>
        </li>
      </ul>
    </Side>
  );
}

export default SideNavigation;
