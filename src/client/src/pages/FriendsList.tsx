import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../common/Colors';
import Dashboard from '../components/layouts/Dashboard';
import * as API from '../api/auth-api';
import { ENDPOINT } from '../utils/config';
import axios from 'axios';
import { Formik } from 'formik';

interface FormValues {
  name: string;
  email: string;
}

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
  /* box-shadow: 0px 2px 40px 0px rgba(0, 0, 0, 0.7); */
  border-radius: 20px;
  margin: 40px auto 0px auto;
`;

const AddTitle = styled.div`
  min-height: 1rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const InputField = styled.input`
  width: 200px;
  color: black;
  background-color: #f5f6f8;
  padding: 7px 16px;
  font-family: 'Avenir';
  font-weight: 400;
  font-size: 14px;
  border: 3px solid #f5f6f8;
  margin-top: 20px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: none;
    background: white;
    border: 3px solid #ff8686;
    color: black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto 10px auto;
`;

const ErrorText = styled.p`
  font-family: 'Avenir';
  font-weight: 500;
  font-size: 14px;
  color: #8b0000;
  margin: 5px auto 0 auto;
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

  const initialValues: FormValues = {
    name: '',
    email: '',
  };

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

  const validateSignUp = (values: FormValues) => {
    const errors = {} as any;
    if (!values.email) {
      errors.email = 'Email address required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.name) {
      errors.name = 'Name is required';
    }

    return errors;
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const requiredValues = {
      email: values.email,
    };
    /* Add in endpoint call */
  };

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
        <AddContainer>
          <AddTitle>Add Friends</AddTitle>
          <Formik
            initialValues={initialValues}
            validate={validateSignUp}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              resetForm,
            }: /* and other goodies */
            {
              values: any;
              errors: any;
              touched: any;
              handleChange: {
                (e: React.ChangeEvent<any>): void;
              };
              handleBlur: {
                (e: React.ChangeEvent<any>): void;
              };
              handleSubmit: {
                (e: React.ChangeEvent<any>): void;
              };
              isSubmitting: boolean;
              resetForm: {
                (): void;
              };
            }) => (
              <>
                <FormContainer onSubmit={handleSubmit}>
                  <InputField
                    type="text"
                    name="name"
                    value={values.name}
                    placeholder="Jane Doe"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <ErrorText>{errors.name}</ErrorText>
                  )}
                  <InputField
                    type="text"
                    name="email"
                    value={values.email}
                    placeholder="janedoe@gmail.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <ErrorText>{errors.email}</ErrorText>
                  )}

                  <ButtonContainer>
                    <button
                      type="submit"
                      className="ui primary button"
                      style={{
                        margin: '15px auto 0 auto',
                        backgroundColor: 'green',
                      }}
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Save
                    </button>
                  </ButtonContainer>
                  <ButtonContainer>
                    <button
                      type="submit"
                      className="ui primary button"
                      style={{
                        margin: '15px auto 0 auto',
                        backgroundColor: 'rgba(72,72,72,0.7)',
                      }}
                      onClick={() => {
                        resetForm();
                      }}
                    >
                      Add another friend!
                    </button>
                  </ButtonContainer>
                  <ButtonContainer
                    style={{
                      marginTop: '30px',
                    }}
                  >
                    <button
                      type="submit"
                      className="ui primary button"
                      style={{ margin: '15px auto 0 auto' }}
                      onClick={() => {}}
                    >
                      Continue
                    </button>
                  </ButtonContainer>
                </FormContainer>
              </>
            )}
          </Formik>
        </AddContainer>
      </Container>
    </Dashboard>
  );
};

export default Friends;
