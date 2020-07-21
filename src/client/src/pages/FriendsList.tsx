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

const Friends = () => {
  return (
    <Dashboard installExtensionOpen={false}>
      <Body>
        <h1>Friends</h1>
        <p>TODO: Hook up to endpoint</p>
      </Body>
    </Dashboard>
  );
};

export default Friends;
