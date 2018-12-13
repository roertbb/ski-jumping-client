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
  const sideRoutes = [
    {
      endpoint: '/ski-jumper',
      label: 'Ski Jumper'
    },
    {
      endpoint: '/coach',
      label: 'Coach'
    },
    {
      endpoint: '/team',
      label: 'Team'
    },
    {
      endpoint: '/ski-jumping-hill',
      label: 'Ski Jumping Hill'
    },
    {
      endpoint: '/tournament',
      label: 'Tournament'
    },
    {
      endpoint: '/individual-competition',
      label: 'Individual Competition'
    },
    {
      endpoint: '/team-competition',
      label: 'Team Competition'
    },
    {
      endpoint: '/placement',
      label: 'Placement'
    }
  ];

  return (
    <Side>
      <ul>
        {sideRoutes.map(route => (
          <li key={route.label}>
            <NavItem activeClassName="active" to={route.endpoint}>
              {route.label}
            </NavItem>
          </li>
        ))}
      </ul>
    </Side>
  );
}

export default SideNavigation;
