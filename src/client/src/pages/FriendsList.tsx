import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../common/Colors';
import Dashboard from '../components/layouts/Dashboard';
import * as API from '../api/auth-api';
import { ENDPOINT } from '../utils/config';
import axios from 'axios';

const Body = styled.div`
  margin: 100px auto 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Friends = () => {
  useEffect(() => {
    const accessTokenData = JSON.parse(
      localStorage.getItem('pigeonAccessToken') || '{}'
    );

    const getUserID = async () => {
      return await API.fetchMe(accessTokenData.accessToken);
    };

    getUserID().then((result) => {
      axios({
        url: `${ENDPOINT}/api/friends/current`,
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
          setFriends(response.data.data);
        })
        .catch((err: any) => {
          if (err && err.response && err.response.data) {
            const errMessage = err.response.data.message;
            alert(errMessage);
          }
        });
    });
  }, []);
  const [friends, setFriends] = useState(null);
  return (
    <Dashboard>
      <Body>
        <h1>Friends</h1>
        <p>Hi hello hey</p>
      </Body>
    </Dashboard>
  );
};

export default Friends;
