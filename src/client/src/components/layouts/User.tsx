import React, { useEffect } from 'react';
import styled from 'styled-components';
import InstallExtensionModal from '../../modals/InstallExtensionModal';
import Sidebar from '../../components/ui/Sidebar';
import Colors from '../../common/Colors';
import Header from '../../components/ui/Header';

// AUTH LOGIC HERE

interface Props {
  children: any;
  installExtensionOpen: boolean;
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
  background-color: white;
`;

const ContentContainer = styled.div`
  display: flex;
  height: 600px;
  max-width: 80%;
  margin-right: auto;
  margin-left: auto;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const User: React.FC<Props> = ({ children, installExtensionOpen, ...rest }) => {
  return (
    <>
      {installExtensionOpen && <InstallExtensionModal />}
      <Container>
        <Header color={Colors.pink} />
        <ContentContainer>
          <Sidebar />
          {children}
        </ContentContainer>
      </Container>
    </>
  );
};

export default User;
