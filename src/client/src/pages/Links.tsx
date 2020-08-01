import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../common/Colors';
import Dashboard from '../components/layouts/Dashboard';
import * as API from '../api/auth-api';
import { ENDPOINT } from '../utils/config';
import axios from 'axios';

/*
interface Metadata {
  url?: string;
  domain?: string;
  title?: string;
  img?: string;
  description?: string;
  favicon?: string;
}*/

const Body = styled.div`
  margin: 30px 0 0 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const LinkContainer = styled.div`
  cursor: pointer;
  border-radius: 30px;
  width: 300px;
  height: 300px;
  margin: 0 auto 20px auto;
  text-align: center;
  background-color: rgba(72, 72, 72, 0.05);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
  padding: 20px 0;
`;

const placeholderLinks = [
  'https://www.google.com/',
  'https://bleacherreport.com',
  'https://chelseafc.com',
];

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

    const previewData: object[] = [];
    const parseMetadata = async () => {
      /* const previewData: any[] = []; */
      placeholderLinks.map((link) =>
        axios({
          url: `${ENDPOINT}/api/links/preview`,
          method: 'POST',
          timeout: 0,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            previewUrl: link,
          }),
        })
          .then((response) => {
            previewData.push(response.data.data);
          })
          .catch((err: any) => {
            if (err && err.response && err.response.data) {
              const errMessage = err.response.data.message;
              alert(errMessage);
            }
          })
      );
    };
    parseMetadata();
    setMetadata(previewData);

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
  const [links, setLinks] = useState(null); /* Switch to this */
  const [metadata, setMetadata] = useState([{}]);

  console.log('Metadata');
  console.log(metadata);
  console.log('Array length = ' + metadata.length);
  return (
    <Dashboard installExtensionOpen={renderModal}>
      <Body>
        <h1>Your Links</h1>
        <p>Use metadata to make this look pretty</p>
        <p>Will have link boxes with image, description, link (like Pocket)</p>
        <LinkContainer>
          <p>Insert link</p>
        </LinkContainer>
      </Body>
    </Dashboard>
  );
};

export default Links;
