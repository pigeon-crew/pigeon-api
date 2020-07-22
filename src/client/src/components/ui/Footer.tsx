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

interface Props {
  color?: string;
}

const Footer: React.FC<Props> = (props) => {
  return (
    <NavBar>
      <PigeonName
        style={{
          color: props.color,
        }}
      >
      <a 
        href={"mailto:jsieger44@gmail.com"}
        style={{ color: '#FFF' }}
      >
          Contact Us &nbsp;
        </a>
    <Link to="/faq" style={{ color: '#FFF' }} >
        FAQ
      </Link>
      </PigeonName>
    </NavBar>
  );
};

export default Footer;