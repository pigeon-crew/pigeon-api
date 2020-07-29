import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Colors from '../../common/Colors';

// TODO: Add AUTH to log out

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

const MenuContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
`;

const Menu = styled.div`
  min-width: 100px;
  position: absolute;
  right: 3rem;
  transform: translateY(-8px);
  border-radius: 10px;
`;

const MenuItem = styled.div`
  background-color: #eee;
  color: black;
  display: block;
  padding: 12px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #ccc;
  }
  &:active {
    background-color: ${Colors.pink};
    color: white;
  }
`;

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <NavBarContainer>
        <Link to="/">
          <LogoText>🐦 Pigeon</LogoText>
        </Link>
        <MenuContainer>
          <SettingsIcon
            src="/images/cog-solid.svg"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        </MenuContainer>
      </NavBarContainer>
      {showMenu && (
        <Menu>
          <Link to="/">
            <MenuItem> Log out</MenuItem>
          </Link>
        </Menu>
      )}
    </>
  );
};

export default NavBar;
