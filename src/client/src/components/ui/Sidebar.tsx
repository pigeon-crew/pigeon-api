import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Colors from '../../common/Colors';
import InstallExtensionModal from '../../modals/InstallExtensionModal';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0px;
  max-width: 200px;
  width: 100%;
  min-height: 100vh;
  border-right: 1px solid rgba(72, 72, 72, 0.2);
  margin-left: 2.5rem;
`;

// TODO: Add selected button styling

const SidebarOption = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  width: 90%;
  margin: 0 auto 20px 0;
  text-align: center;
  background-color: rgba(72, 72, 72, 0.05);
  padding: 15px 0;
  border-radius: 40px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
    opacity: 0.9;
    background-color: rgba(255, 163, 163, 0.15);
  }
  &:active {
    opacity: 0.6;
  }
`;

const SidebarLabel = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: black;
`;

const Icon = styled.img`
  margin-left: 15px;
  margin-right: 15px;
  max-height: 20px;
`;

interface Props {}

interface SidebarOptions {
  title: string;
  path?: string;
  icon?: string;
}

// TODO: Change extension link to chrome webstore
const options: SidebarOptions[] = [
  {
    title: 'Links',
    path: '/links',
    icon: '/images/link-solid.svg',
  },
  {
    title: 'Friends List',
    path: '/friends',
    icon: '/images/user-friends-solid.svg',
  },
];

const Sidebar: React.FC<Props> = (props) => {
  return (
    <SidebarContainer>
      {options.map((option) => (
        <Link
          to={option.path || '/'}
          key={option.title + option.path}
          style={{ color: 'gray' }}
        >
          <SidebarOption>
            <Icon src={option.icon} />
            <SidebarLabel>{option.title}</SidebarLabel>
          </SidebarOption>
        </Link>
      ))}
      <a href="mailto:sieger2@illinois.edu?subject=Downloading the Pigeon Extension&amp;body=Joseph will email you the zip file containing the Pigeon extension!">
        <SidebarOption>
          <Icon src="/images/download-solid.svg" />
          <SidebarLabel>Extension</SidebarLabel>
        </SidebarOption>
      </a>
    </SidebarContainer>
  );
};

export default Sidebar;
