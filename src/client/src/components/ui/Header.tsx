import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBar = styled.div`
  max-width: 80%;
  padding-top: 34px;
  padding-bottom: 20px;
  margin: auto;
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

interface Props {
  color?: string;
}

const Header: React.FC<Props> = (props) => {
  return (
    <NavBar>
      <Link to="/">
        <Logo>🐦</Logo>
      </Link>
      <PigeonName
        style={{
          color: props.color,
        }}
      >
        Pigeon
      </PigeonName>
    </NavBar>
  );
};

export default Header;
