import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Colors from '../../common/Colors';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  width: 100%;
  margin-top: 20px;
`;

const SidebarOption = styled.div`
  cursor: pointer;
  width: 100%;
  margin: 0 auto 20px auto;
  text-align: center;
  background-color: rgba(72, 72, 72, 0.05);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
  padding: 20px 0;
`;

const SidebarLabel = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

interface Props {}

const Footer: React.FC<Props> = (props) => {
  return (
    <SidebarContainer>
      <Link to="/links">
        <SidebarOption>
          <SidebarLabel>Links</SidebarLabel>
        </SidebarOption>
      </Link>

      <SidebarOption>
        <SidebarLabel>Friends List</SidebarLabel>
      </SidebarOption>
      <SidebarOption>
        <SidebarLabel>Account</SidebarLabel>
      </SidebarOption>
      <SidebarOption>
        <SidebarLabel>Install Extension</SidebarLabel>
      </SidebarOption>
    </SidebarContainer>
  );
};

export default Footer;
