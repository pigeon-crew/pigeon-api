import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import ModalBackground from './ModalBackground';
import Colors from '../common/Colors';

const Content = styled.div`
  width: 300px;
  height: 50%;
  background-color: white;
  position: relative;
  margin: auto;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
  text-align: center;
`;

const Header = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const Desc = styled.p`
  text-align: center;
  margin: 0 20px 0 20px;
`;

const CloseButton = styled.img`
  cursor: pointer;
`;

// TODO: Need to add a cool graphic here

const InstallExtensionModal = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && (
        <ModalBackground>
          <Content>
            <Header>
              <CloseButton
                src="/images/close_button.svg"
                onClick={() => {
                  setShow(false);
                }}
              />
            </Header>
            <Title>Add Pigeon to your browser</Title>
            <Desc>
              Our chrome extension is central to your Pigeon experience,
              allowing you to share links with friends and family as fast as
              possible.{' '}
            </Desc>
            <button
              type="submit"
              className="ui primary button"
              style={{
                backgroundColor: Colors.pink,
                marginTop: '20px',
              }}
              onClick={() => {
                alert('Link to Chrome web store');
              }}
            >
              Install the Pigeon Chrome Extension
            </button>
          </Content>
        </ModalBackground>
      )}
    </>
  );
};

export default InstallExtensionModal;
