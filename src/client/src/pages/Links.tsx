import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Header from '../components/ui/Header';
import { Link } from 'react-router-dom';
import InstallExtensionModal from '../modals/InstallExtensionModal';
import Sidebar from '../components/ui/Sidebar';
import Colors from '../common/Colors';

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

const Body = styled.div`
  margin-left: 200px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const LandingTextContainer = styled.div`
  display: block;
  width: 45%;
  max-width: 0;
  min-width: 45%;
  margin-bottom: 0;
  padding-right: 0;
  color: white;
  font-family: 'Avenir';
`;

const H1 = styled.h1`
  font-size: 50px;
  margin-bottom: 40px;
`;

const LandingGraphic = styled.img`
  display: flex;
  max-width: 50%;
  min-width: 50%;
  justify-content: flex-end;
  align-items: center;
`;

const InputField = styled.input`
  width: 200px;
  color: black;
  background-color: #f5f6f8;
  padding: 7px 16px;
  font-family: 'Avenir';
  font-weight: 400;
  font-size: 14px;
  border: 3px solid #f5f6f8;
  margin: auto;
  margin-bottom: 20px;
  margin-right: 10px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: none;
    background: white;
    border: 3px solid #ff8686;
    color: black;
  }
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
    <>
      <InstallExtensionModal />

      <Container>
        <Header color={Colors.pink} />
        <ContentContainer>
          <Sidebar />
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
        </ContentContainer>
      </Container>
    </>
  );
};

export default Links;
