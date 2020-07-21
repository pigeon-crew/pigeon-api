import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Colors from '../../common/Colors';
import Header from '../../components/ui/Header';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0px;
  max-width: 250px;
  width: 100%;
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

interface SidebarOptions {
  title: string;
  path?: string;
}

const options: SidebarOptions[] = [
  {
    title: 'Links',
    path: '/links',
  },
  {
    title: 'Friends List',
    path: '/',
  },
  {
    title: 'Account',
    path: '/',
  },
  {
    title: 'Install Extension',
    path: '/',
  },
];

const Sidebar: React.FC<Props> = (props) => {
  return (
    <SidebarContainer>
      <Header color={Colors.pink} />
      {options.map((option) => (
        <Link
          to={option.path || '/'}
          key={option.title + option.path}
          style={{ color: 'gray' }}
        >
          <SidebarOption>
            <SidebarLabel>{option.title}</SidebarLabel>
          </SidebarOption>
        </Link>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
