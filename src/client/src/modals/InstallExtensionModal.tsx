import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import ModalBackground from './ModalBackground';

const Content = styled.div`
  width: 300px;
  height: 50%;
  background-color: white;
  position: relative;
  margin: auto;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
`;

const Header = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  margin: auto;
`;

const CloseButton = styled.img`
  cursor: pointer;
`;

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
            <h1>Add Pigeon to your browser</h1>
            <p>*Insert Instructions*</p>
          </Content>
        </ModalBackground>
      )}
    </>
  );
};

export default InstallExtensionModal;
