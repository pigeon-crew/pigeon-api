import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const Headline = styled.h1`
    padding-top: 7%;
    font-family: 'Avenir';
    font-size: 33px;
    text-align: center;
    color: white;
    padding-bottom: 10px;
`;

const NavBar = styled.div`
  max-width: 80%;
  margin: auto;
  margin-top: 34px;
  display: flex;
`;

const Background = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
  background-color: #ffa3a3;
`;

const ButtonContainer = styled.div`
  display:flex;
  width:400px;
  margin-left:46%
`;

const Logo = styled.div`
  font-size: 30px;
`;

const PigeonName = styled.div`
  font-size: 30px;
  margin-left: 10px;
  font-family: 'Avenir';
  font-weight: 500;
  color: white;
`;


const Body = styled.div`
  background-color: #ffa3a3;
`;

// TODO: Decide on Formik or another way of processing form submissions

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const InputField = styled.input`
    width: 200px;
    border-radius: 12px;
    color: #797979;
    background-color: #f5f6f8;
    padding: 8px 16px;
    font-family: 'Avenir';
    font-weight: 400;
    font-size: 14px;
    border: 3px solid #f5f6f8;
    margin: auto;
    margin-bottom: 20px;

    &::placeholder {
        color: rgba(0, 0, 0, 0.4);
    }

    &:focus {
        outline: none;
        background: white;
        border: 3px solid #ddd;
        color: black;
    }
`;


const Signup = () => {
    return (
        <Background>
        <NavBar>
          <Logo>🐦</Logo>
          <PigeonName>Pigeon</PigeonName>
        </NavBar>
          <Body>
            <Headline>Pigeon Sign Up</Headline>
            <FormContainer>
                <InputField type="text" name="email" placeholder="janedoe@gmail.com" />
                <InputField type="text" name="name" placeholder="Jane Doe" />
                <InputField type="password" name="password" placeholder="Password" />
                <InputField type="text" name="confirm-password" placeholder="Confirm Password" />
                <ButtonContainer>
                  <button className="ui primary button">Get Started</button>
                </ButtonContainer>
            </FormContainer>
          </Body>
        </Background>
    );
};

export default Signup;
