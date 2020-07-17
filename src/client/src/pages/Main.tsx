import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Header from '../components/ui/Header';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';

// TODO: Fix mobile view

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
  background-color: #ffa3a3;
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
  color: #797979;
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

const Main = () => {
  const [pushURL, setPushURL] = useState('/signup');

  const handleChange = (event: any) => {
    setPushURL('/signup?email=' + event.target.value);
  };

  return (
    <Container>
      <Header />
      <ContentContainer>
        <Content>
          <LandingTextContainer>
            <H1>Spark quality conversations by sharing links.</H1>
            <InputField
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Link to={pushURL}>
              <button className="ui primary button">Get Started</button>
            </Link>
          </LandingTextContainer>
          <LandingGraphic src="/images/social_sharing.svg" />
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default Main;
