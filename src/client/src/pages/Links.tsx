import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Header from '../components/ui/Header';
import Colors from '../common/Colors';
import Dashboard from '../components/layouts/Dashboard';

const Body = styled.div`
  margin: 100px auto 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const LinkContainer = styled.div`
  cursor: pointer;
  border-radius: 30px;
  width: 200px;
  margin: 0 auto 20px auto;
  text-align: center;
  background-color: rgba(72, 72, 72, 0.05);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
  padding: 20px 0;
  border: 2px dashed ${Colors.pink};
`;

const Links = () => {
  return (
    <Dashboard installExtensionOpen={true}>
      <Body>
        <h1>Your Links</h1>
        <p>TODO: Make sidebar resusable</p>
        <LinkContainer>
          <p>google.com</p>
        </LinkContainer>
        <LinkContainer>
          <p>yahoo.com</p>
        </LinkContainer>
        <LinkContainer>
          <p>slack.com</p>
        </LinkContainer>
        <LinkContainer>
          <p>producthunt.com</p>
        </LinkContainer>
      </Body>
    </Dashboard>
  );
};

export default Links;
