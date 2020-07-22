import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components';
import Header from '../components/ui/Header';
import { Link } from 'react-router-dom';
import Colors from '../common/Colors';

// TODO: Fix mobile view

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
  background-color: ${Colors.pink};
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
  flex-direction: column;
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

const H3 = styled.h3`
  font-size: 30px;
  margin-bottom: 50px;
`;

const SubHeader = styled.div`
  font-size: 20px;
  color: rgb(72, 72, 72);
  margin-bottom: 50px;
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

const FAQ = () => {
  return (
    <Container>
      <Header color={'white'} />
      <ContentContainer>
        <Content>
        <Button>
            <Icon name='angle left' />
            Back
        </Button>
          <LandingTextContainer>
            <H3>What is Pigeon?</H3>
            <SubHeader>
                The fastest way to share links with friends. We also help organize and keep track of links you send!
            </SubHeader>
            <H3>How do I use Pigeon?</H3>
            <SubHeader>
                Sign up to join our early access program. Our extension will soon be available on the chrome webstore.
            </SubHeader>
            <H3>How does it work?</H3>
            <SubHeader>
                When you sign up, you can add your friends and tell us how you want to contact them.
                Whenever you want to send something, just use Cmd+E! We make it easy to search your contacts and send links out quickly.
            </SubHeader>
          </LandingTextContainer>
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default FAQ;
