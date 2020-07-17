import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBar = styled.div`
  max-width: 80%;
  margin: auto;
  margin-top: 34px;
  display: flex;
`;

const Logo = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

const PigeonName = styled.div`
  font-size: 30px;
  margin-left: 10px;
  font-family: 'Avenir';
  font-weight: 500;
  color: white;
`;

const Header = () => {
  return (
    <NavBar>
      <Link to="/">
        <Logo>🐦</Logo>
      </Link>
      <PigeonName>Pigeon</PigeonName>
    </NavBar>
  );
};

export default Header;
