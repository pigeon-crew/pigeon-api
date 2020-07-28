import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBarContainer = styled.div`
  background-color: rgba(255, 163, 163, 0.15);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

const LogoText = styled.div`
  display: inline-block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-left: 2rem;
  font-size: 1.75rem;
  line-height: 2rem;
  white-space: nowrap;
  color: #181818;
`;

const SettingsIcon = styled.img`
  height: 25px;
  cursor: pointer;
  margin-right: 2rem;
`;

const NavBar = () => {
  return (
    <NavBarContainer>
      <Link to="/">
        <LogoText>🐦 Pigeon</LogoText>
      </Link>
      <SettingsIcon src="/images/cog-solid.svg" />
    </NavBarContainer>
  );
};

export default NavBar;
