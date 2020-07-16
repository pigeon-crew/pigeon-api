import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 45%;
  left: 50%;
  width: 60%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`;

const ENDPOINT = process.env.REACT_APP_API_URL || '';

const Main = () => {
  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        minWidth: '100%',
        minHeight: '100%',
        opacity: '100%',
        backgroundColor: '#FFA3A3',
      }}
    >
      <HeaderContainer>
        <h1>Spark quality conversations with links</h1>
        <Link to="/signup">
          <button className="ui primary button">Get Started</button>
        </Link>
      </HeaderContainer>
    </div>
  );
};

export default Main;
