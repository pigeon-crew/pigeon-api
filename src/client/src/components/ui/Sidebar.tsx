import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  width: 100%;
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
`;

const SidebarOption = styled.div`
  cursor: pointer;
  width: 100%;
  margin: 0 auto 0 auto;
  text-align: center;
  background-color: rgba(72, 72, 72, 0.1);
  padding: 20px 0;
`;

const SidebarLabel = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Footer = () => {
  return (
    <SidebarContainer>
      <SidebarOption>
        <SidebarLabel>Links</SidebarLabel>
      </SidebarOption>
      <SidebarOption
        style={{
          backgroundColor: 'white',
        }}
      >
        <SidebarLabel>Friends List</SidebarLabel>
      </SidebarOption>
      <SidebarOption>
        <SidebarLabel>Account</SidebarLabel>
      </SidebarOption>
      <SidebarOption
        style={{
          backgroundColor: '#ffa3a3',
        }}
      >
        <SidebarLabel>Install Extension</SidebarLabel>
      </SidebarOption>
    </SidebarContainer>
  );
};

export default Footer;
