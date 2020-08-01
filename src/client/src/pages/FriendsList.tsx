import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../common/Colors';
import Dashboard from '../components/layouts/Dashboard';
import * as API from '../api/auth-api';
import { ENDPOINT } from '../utils/config';
import axios from 'axios';

const Body = styled.div`
  margin: 30px 0 0 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const FriendsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid;
  border-radius: 15px;
`;

const FriendName = styled.div`
  margin: 12px auto;
  font-size: 20px;
  font-weight: 500;
  width: 100%;
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
  const placeholderFriends = [
    'Jane Doe',
    'Ferris Bueller',
    'Forest Gump',
    'Nemo TheFish',
  ];
  return (
    <Dashboard>
      <Body>
        <h1>Your Friends</h1>
        <FriendsListContainer>
          {placeholderFriends.map((friend) => (
            <FriendName key={friend}>{friend}</FriendName>
          ))}
        </FriendsListContainer>
      </Body>
    </Dashboard>
  );
};

export default Friends;
