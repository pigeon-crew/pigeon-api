import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Colors from '../common/Colors';
import Header from '../components/ui/Header';

// TODO: Fix mobile view

const Container = styled.div`
  min-height: 100%;
  bottom: 0;
  right: 0;
  min-width: 100%;
  background-color: ${Colors.blue};
`;

const IntroContainer = styled.div`
  display: flex;
  height: 90vh;
  max-width: 80%;
  margin-right: auto;
  margin-left: auto;
`;

const Content = styled.div`
  margin-top: 2vh;
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-around;
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

const LandingGraphic = styled.img`
  display: flex;
  margin-top: 5vh;
  max-width: 40%;
  min-width: 40%;
  justify-content: flex-end;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 10% 10% 15% 10%;
`;

const DescriptionTextContainer = styled.div`
  display: block;
  width: 60%;
  max-width: 0;
  min-width: 50%;
  margin-bottom: 0;
  padding-right: 0;
  color: white;
  padding-left: 5%;
  font-family: 'Avenir';
`;

const DescriptionGraphic = styled.img`
  height: 30%;
  width: 30%;
`;

const BodyContainer = styled.div`
  padding-top: 3%;
  background-color: ${Colors.green};
`;

const UseCaseContainer = styled.div``;

const ModuleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 3% 0%;
  min-width: 800px;
  max-width: 65vw;
  margin-right: auto;
  margin-left: auto;
`;

const ModuleBox = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0px 7px 5px #aaaaaa;

  flex: 0 0 auto;
  margin: 0px;
  min-width: 220px;
  min-height: 300px;
  width: 25%;
  height: 20vw;
  padding: 30px 5px 10px 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModuleImage = styled.img`
  text-align: center;
  max-width: 65%;
  max-height: 65%;
  object-fit: cover;
`;

const Paragraph = styled.h2`
  font-size: 17px;
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
  font-size: 17px;
  color: dimgray;
  text-align: left;
  padding-left: 2px;
  font-family: 'Avenir';
  font-style: normal;
  font-weight: 500;
  display: block;
`;

const H1 = styled.h1`
  font-size: 50px;
  margin-bottom: 40px;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 40px;
  color: white;
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
  const mobile = useMediaQuery({ query: '(max-width: 786px)' });
  const [pushURL, setPushURL] = useState('/signup');

  const handleChange = (event: any) => {
    setPushURL('/signup?email=' + event.target.value);
  };

  if (mobile) {
    return (
      <h1 style={{ margin: '20px auto 0 auto', textAlign: 'center' }}>
        Our landing page is currently only available on Desktop.
      </h1>
    );
  }

  return (
    <Container>
      <Header color={'${Colors.blue}'} />
      <IntroContainer>
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
      </IntroContainer>
      <BodyContainer>
        <UseCaseContainer>
          <Title style={{ textAlign: 'center' }}>
            Pigeon is designed to help you when
          </Title>
          <ModuleContainer>
            <ModuleBox>
              <ModuleImage src="/images/hangout.png" />
              <Paragraph style={{ marginTop: '50px' }}>
                You're scrambling to share a Google Doc link on Zoom
              </Paragraph>
            </ModuleBox>

            <ModuleBox>
              <ModuleImage src="/images/question.png" />
              <Paragraph style={{ marginTop: '50px' }}>
                You lost an important link that your friend shared with you
              </Paragraph>
            </ModuleBox>

            <ModuleBox>
              <ModuleImage src="/images/friends.png" />
              <Paragraph style={{ marginTop: '50px' }}>
                You want to check out what's trending among your friends
              </Paragraph>
            </ModuleBox>
          </ModuleContainer>
        </UseCaseContainer>
        <DescriptionContainer>
          <DescriptionGraphic src="/images/linked.svg" />
          <DescriptionTextContainer>
            <Title>What is Pigeon?</Title>
            <H3>
              Pigeon is the fastest way to share links with friends. We make
              link-sharing social by helping to organize and keep track of links
              you send to friends!
            </H3>
            <Title>How does Pigeon work?</Title>
            <H3>
              When you sign up for Pigeon, you can add your friends and tell us
              how you want to contact them. Whenever you want to send a link,
              just hit Cmd+E to activate our extension! We make it easy to
              search your contacts and send links quickly.
            </H3>
            <Title>How do I use Pigeon?</Title>
            <H3>
              Sign up to join our early access program above! Our extension will
              soon be available on the chrome webstore.
            </H3>
          </DescriptionTextContainer>
        </DescriptionContainer>
      </BodyContainer>
    </Container>
  );
};

export default Main;
