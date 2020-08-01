import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../common/Colors';
import Dashboard from '../components/layouts/Dashboard';
import * as API from '../api/auth-api';
import { ENDPOINT } from '../utils/config';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Metadata {
  url?: string;
  domain?: string;
  title?: string;
  img?: string;
  description?: string;
  favicon?: string;
}

const Body = styled.div`
  margin: 30px 0 0 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 30px;
  width: 300px;
  height: 300px;
  margin: 0 auto 20px auto;
  text-align: center;
  background-color: rgba(72, 72, 72, 0.05);
  box-shadow: 0px 2px 40px 0px rgba(0, 0, 0, 0.3); /*rgba(0, 0, 0, 0.15) 0px 3px 10px;*/
  padding: 20px 0;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
    opacity: 0.9;
    background-color: rgba(72, 72, 72, 0.1);
  }
  &:active {
    opacity: 0.6;
  }
`;

const MetaImage = styled.img`
  height: 100px;
  border-radius: 15px;
  margin: 10px auto;
`;

const MetaDesc = styled.p`
  margin: 10px auto;
  padding: 0 5px;
  -webkit-line-clamp: 3;
`;

const placeholderLinks = [
  'https://www.google.com/',
  'https://bleacherreport.com',
  'https://chelseafc.com',
  'https://www.cnn.com/',
  'https://www.nytimes.com/',
  'https://www.reddit.com/',
  'https://www.facebook.com/',
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

    const parseMetadata = async () => {
      const previewData: object[] = [];
      placeholderLinks.map(async (link) => {
        const meta = await API.fetchMetadata(link);
        previewData.push(meta);
      });

      return previewData;
    };

    /* Experiment to see if await would fix */
    const retrieveMetadata = async () => {
      await parseMetadata().then((result) => {
        setMetadata(result);
        setFetching(false);
      });
    };

    retrieveMetadata();

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
  const [metadata, setMetadata] = useState<Metadata[] | null>(null);
  const [fetching, setFetching] = useState(true);

  if (fetching) {
    return (
      <Dashboard>
        <Body>
          <h1>Your Links are being loaded</h1>
        </Body>
      </Dashboard>
    );
  }

  return (
    <Dashboard installExtensionOpen={renderModal}>
      <Body>
        <h1
          style={{
            marginBottom: '40px',
          }}
        >
          Your Links
        </h1>
        {metadata &&
          metadata.map((data) => (
            <LinkContainer
              key={data.url}
              onClick={() => {
                if (data.url) {
                  window.open(data.url);
                }
              }}
            >
              {data.img && <MetaImage src={data.img} />}
              {data.url && <a href={data.url}>{data.url}</a>}
              {data.description && <MetaDesc>{data.description}</MetaDesc>}
            </LinkContainer>
          ))}
      </Body>
    </Dashboard>
  );
};

export default Links;
