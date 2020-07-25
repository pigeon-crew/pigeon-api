import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../common/Colors';
import Dashboard from '../components/layouts/Dashboard';
import * as API from '../api/auth-api';
import { ENDPOINT } from '../utils/config';
import axios from 'axios';

const Body = styled.div`
  margin: 80px 0 0 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
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
  useEffect(() => {
    // If page not visited before, show modal
    const visited = localStorage.getItem('visited');
    if (!visited) {
      setRenderModal(true);
      localStorage.setItem('visited', '1');
    }
    const accessTokenData = JSON.parse(
      localStorage.getItem('pigeonAccessToken') || '{}'
    );

    const getUserID = async () => {
      return await API.fetchMe(accessTokenData.accessToken);
    };

    getUserID().then((result) => {
      axios({
        url: `${ENDPOINT}/api/links/me`,
        method: 'GET',
        timeout: 0,
        headers: {
          Authorization: `Bearer ${accessTokenData.accessToken}`,
        },
        data: JSON.stringify({
          userID: result.id,
        }),
      })
        .then((response) => {
          console.log(response.data.links);
          setLinks(response.data.links);
        })
        .catch((err: any) => {
          if (err && err.response && err.response.data) {
            const errMessage = err.response.data.message;
            alert(errMessage);
          }
        });
    });
  }, []);
  const [renderModal, setRenderModal] = useState(false);
  const [links, setLinks] = useState(null);
  return (
    <Dashboard installExtensionOpen={renderModal}>
      <Body>
        <h1>Your Links</h1>
        <p>Use metadata to make this look pretty</p>
        <p>Will have link boxes with image, description, link (like Pocket)</p>
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
    </Dashboard>
  );
};

export default Links;
