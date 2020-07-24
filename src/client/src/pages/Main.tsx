import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Header from '../components/ui/Header';
import { Link } from 'react-router-dom';
import Colors from '../common/Colors';

// TODO: Fix mobile view

const Container = styled.div`
  min-height: 100%;
  bottom: 0;
  right: 0;
  min-width: 100%;
  background-color: ${Colors.pink};
`;

const ContentContainer = styled.div`
  display: flex;
  height: 600px;
  max-width: 80%;
  margin-right: auto;
  margin-left: auto;
`;

const BelowContainer = styled.div`
  display: flex;
  position: relative;
  height: 500px;
  padding-top: 50px;
  max-width: 80%;
  margin-left: 16%;
  margin-right: auto;
  align-items: center;
  justify-content: space-between;
`;

const DescriptionContainer = styled.div`
  display: flex;
  height: 200px;
  padding-top: 21%;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  padding-bottom: 20%;
`;

const DescriptionTextContainer = styled.div`
  display: block;
  width: 50%;
  max-width: 0;
  min-width: 50%;
  margin-bottom: 0;
  padding-right: 0;
  color: white;
  padding-left: 5%;
  font-family: 'Avenir';
`;

const DescriptionGraphic = styled.img`
  display: flex;
  max-width: 45%;
  min-width: 45%;
  justify-content: flex-end;
  align-items: center;
`;

const TopContainer = styled.div`
  display: flex;
  height: 100px;
  padding-top: 100px;
  max-width: 80%;
  margin-left: 32%;
  margin-right: auto;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 786px) {
    flex-direction: column;
  }
`;

const ModuleBox = styled.div`
  display: block;
  height: 70%;
  width: 25%;
  background: white;
  border-radius: 20px;
  border-bottom-width: 10;
  border-bottom-color: blue;
`;

const Spacer = styled.div`
  margin-left: 5%;
  display: block;
`;

const ModuleImage = styled.img`
  align: center;
  max-width: 95%;
  padding-left: 2.5%;
  border-radius: 20px;
  max-height: 77%;
  display: block;
  padding-top: 10%;
`;

const ModuleImage2 = styled.img`
  align: center;
  max-width: 95%;
  padding-left: 2.5%;
  border-radius: 20px;
  max-height: 75%;
  display: block;
  padding-top: 5%;
  margin-bottom: -5%;
`;

const ModuleImage3 = styled.img`
  align: center;
  max-width: 95%;
  padding-left: 2.5%;
  border-radius: 20px;
  max-height: 75%;
  display: block;
  padding-top: 5%;
  margin-bottom: -2%;
`;

const H2 = styled.h2`
  font-size: 16px;
  color: dimgray;
  text-align: center;
  padding-top: 5px;
  padding-right: 20px;
  padding-left: 20px;
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 400;
  display: block;
`;

const H3 = styled.h3`
  font-size: 16px;
  color: #282828;
  text-align: left;
  padding-left: 2px;
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 400;
  display: block;
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
  align-items: center;
  color: white;
`;

const H11 = styled.h1`
  font-size: 33px;
  margin-bottom: 40px;
  align-items: center;
  text-align: center;
  color: white;
`;

const H12 = styled.h1`
  font-size: 33px;
  margin-bottom: -12px;
  text-align: left;
  color: white;
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

const Main = () => {
  const [pushURL, setPushURL] = useState('/signup');

  const handleChange = (event: any) => {
    setPushURL('/signup?email=' + event.target.value);
  };

  return (
    <Container>
      <Header color={'${Colors.pink}'} />
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
      <DescriptionContainer>
        <DescriptionGraphic src="/images/linked.svg" />
        <DescriptionTextContainer>
          <H12>What is Pigeon?</H12>
          <H3>
            Pigeon is the fastest way to share links with friends. We make
            link-sharing social by helping to organize and keep track of links
            you send to friends!
          </H3>
          <H12>How does Pigeon work?</H12>
          <H3>
            When you sign up for Pigeon, you can add your friends and tell us
            how you want to contact them. Whenever you want to send a link, just
            hit Cmd+E to activate our extension! We make it easy to search your
            contacts and send links quickly.
          </H3>
          <H12>How do I use Pigeon?</H12>
          <H3>
            Sign up to join our early access program above! Our extension will
            soon be available on the chrome webstore.
          </H3>
        </DescriptionTextContainer>
      </DescriptionContainer>
      <TopContainer>
        <H11>Pigeon is designed to help you when</H11>
      </TopContainer>
      <BelowContainer>
        <ModuleBox>
          <ModuleImage src="/images/hangout.png" />
          <H2>You're scrambling to share a Google Doc link on Zoom</H2>
        </ModuleBox>
        <Spacer></Spacer>
        <ModuleBox>
          <ModuleImage2 src="/images/question.png" />
          <H2>You lost an important link that your friend shared with you</H2>
        </ModuleBox>
        <Spacer></Spacer>
        <ModuleBox>
          <ModuleImage3 src="/images/friends.png" />
          <H2>You want to check out what's trending among your friends</H2>
        </ModuleBox>
      </BelowContainer>
    </Container>
  );
};

export default Main;
