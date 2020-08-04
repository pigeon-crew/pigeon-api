import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Header from '../../components/ui/Header';
import { useHistory } from 'react-router-dom';
import { ENDPOINT } from '../../utils/config';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Colors from '../../common/Colors';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
  background-color: ${Colors.pink};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 80%;
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 40px;
  margin: auto;
  padding: 20px 0;
  text-align: center;
`;

const SubHeader = styled.div`
  font-size: 20px;
  color: rgb(72, 72, 72);
  margin: auto;
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
  margin: 20px auto 10px auto;
`;

const ErrorText = styled.p`
  font-family: 'Avenir';
  font-weight: 500;
  font-size: 14px;
  color: #8b0000;
  margin: 5px auto 0 auto;
`;

interface Props {}

interface FormValues {
  name: string;
  email: string;
}

const AddFriends: React.FC<Props> = (props) => {
  const initialValues: FormValues = {
    name: '',
    email: '',
  };

  const history = useHistory();

  const [referrals, setReferrals] = useState(0);
  const [insufficientRefferals, setInsufficientReferrals] = useState(false);

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
      name: values.name,
    };

    axios({
      url: `${ENDPOINT}/api/email/invite`,
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        ...requiredValues,
      }),
    })
      .then(() => {
        alert('Successfuly sent invite');
      })
      .catch((err: any) => {
        const errMessage = err.response.data.message;
        alert(errMessage);
      });
    setSubmitting(false);
  };

  return (
    <Container>
      <Header color={'white'} />
      <ContentContainer>
        <H1>Welcome to Pigeon 🎉</H1>
        <SubHeader>
          To get started, add the contact information of at least one friend or
          family member
        </SubHeader>
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
                      setReferrals(referrals + 1);
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
                    Add another contact!
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
                    onClick={() => {
                      if (referrals >= 1) {
                        window.location.assign(
                          'mailto:sieger2@illinois.edu?subject=Downloading the Pigeon Extension&body=Joseph will email you the zip file containing the Pigeon extension!'
                        );
                      } else {
                        setInsufficientReferrals(true);
                      }
                    }}
                  >
                    Continue
                  </button>
                </ButtonContainer>
                {insufficientRefferals && (
                  <ErrorText>Invite a contact to proceed</ErrorText>
                )}
              </FormContainer>
            </>
          )}
        </Formik>
      </ContentContainer>
    </Container>
  );
};

export default AddFriends;
