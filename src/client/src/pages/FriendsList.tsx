import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../common/Colors';
import Dashboard from '../components/layouts/Dashboard';
import * as API from '../api/auth-api';
import { ENDPOINT } from '../utils/config';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListContainer = styled.div`
  /*margin: 30px 50px 0 50px;*/
  margin-top: 30px;
  padding: 0px 50px;
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 100%;
  justify-content: space-between;
`;

const ColumnContainer = styled.div`
  margin: 0 15px;
  /* box-shadow: 0px 2px 40px 0px rgba(0, 0, 0, 0.15); */
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

const RequestContainer = styled.div`
  display: flex;
`;

const OptionsContainer = styled.div`
  display: flex;
  padding-top: 10px;
`;

const Option = styled.img`
  margin-left: 10px;
  height: 20px;
  float: left;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const AddContainer = styled.div`
  box-shadow: 0px 2px 40px 0px rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  margin: 30px auto;
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

  const placeholderRequests = [
    'Brad Pitt',
    'Jennifer Lawrence',
    'Alex Trebek',
    'Lebron James',
  ];
  return (
    <Dashboard>
      <Container>
        <ListContainer>
          <ColumnContainer>
            <h1>Your Friends</h1>
            <FriendsListContainer>
              {placeholderFriends.map((friend) => (
                <FriendName key={friend}>{friend}</FriendName>
              ))}
            </FriendsListContainer>
          </ColumnContainer>
          <ColumnContainer>
            <h1>Pending Requests</h1>
            <FriendsListContainer>
              {placeholderRequests.map((request) => (
                <RequestContainer key={request}>
                  <OptionsContainer>
                    <Option src="/images/thumbs-up-solid.svg" />
                    <Option
                      src="/images/thumbs-down-solid.svg"
                      style={{
                        marginTop: '4px',
                      }}
                    />
                  </OptionsContainer>
                  <FriendName
                    style={{
                      marginLeft: '10px',
                      paddingRight: '10px',
                    }}
                  >
                    {request}
                  </FriendName>
                </RequestContainer>
              ))}
            </FriendsListContainer>
          </ColumnContainer>
        </ListContainer>
        <AddContainer>Add friends here</AddContainer>
      </Container>
    </Dashboard>
  );
};

export default Friends;
