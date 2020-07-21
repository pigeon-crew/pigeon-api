import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  z-index: 1000;
  background-color: rgba(2, 2, 2, 0.2);
`;

export const ModalBackground = (props: { children: React.ReactNode }) => {
  return <Container>{props.children}</Container>;
};

export default ModalBackground;
