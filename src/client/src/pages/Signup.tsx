import axios from 'axios';
import { Formik } from 'formik';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Colors from '../common/Colors';
import Header from '../components/ui/Header';
import { ENDPOINT } from '../utils/config';

// TICKETS: Add loading animation to button. Validate email on landing page?

interface FormValues {
  email: string;
  name: string;
  password: string;
  confirm: string;
}

const Headline = styled.h1`
  padding-top: 7%;
  font-family: 'Avenir';
  font-size: 33px;
  text-align: center;
  color: white;
  margin-block-end: 0em;
`;

const Background = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
  background-color: ${Colors.pink};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 200px;
  border-radius: 12px;
  color: black;
  background-color: #f5f6f8;
  padding: 8px 16px;
  font-family: 'Avenir';
  font-weight: 400;
  font-size: 14px;
  border: 3px solid #f5f6f8;
  margin: auto;
  margin-top: 20px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: none;
    background: white;
    border: 3px solid #ddd;
    color: black;
  }
`;

const ErrorText = styled.p`
  font-family: 'Avenir';
  font-weight: 500;
  font-size: 14px;
  color: #8b0000;
  margin: 5px auto 0 auto;
`;

const Signup = () => {
  const params = new URLSearchParams(useLocation().search);
  const emailQuery = params.get('email');
  const history = useHistory();

  const initialValues: FormValues = {
    email: emailQuery || '',
    name: '',
    password: '',
    confirm: '',
  };

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

    if (!values.password) {
      errors.password = 'Password is required';
    }

    if (values.confirm !== values.password) {
      errors.confirm = "Passwords don't match";
    }
    return errors;
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const requiredValues = {
      email: values.email,
      firstName: values.name.split(' ').slice(0, -1).join(' '),
      lastName: values.name.split(' ').slice(-1).join(' '),
      password: values.password,
    };

    axios({
      url: `${ENDPOINT}/api/users/signup`,
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
        alert('Sign up success');

        axios({
          url: `${ENDPOINT}/api/users/login`,
          method: 'POST',
          timeout: 0,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
          .then((response) => {
            localStorage.setItem(
              'pigeonAccessToken',
              JSON.stringify({ accessToken: response.data.accessToken })
            );
            history.push('/onboarding');
          })
          .catch((err: any) => {
            if (err && err.response && err.response.data) {
              const errMessage = err.response.data.message;
              alert(errMessage);
            }
          });
      })
      .catch((err: any) => {
        if (err && err.response && err.response.data) {
          const errMessage = err.response.data.message;
          alert(errMessage);
        }
      });

    setSubmitting(false);
  };

  return (
    <Background>
      <Header color={'white'} />
      <>
        <Headline>Pigeon Sign Up</Headline>
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
          }) => (
            <>
              <FormContainer onSubmit={handleSubmit}>
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
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
                <InputField
                  type="password"
                  name="confirm"
                  value={values.confirm}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirm && touched.confirm && (
                  <ErrorText>{errors.confirm}</ErrorText>
                )}
                <ButtonContainer>
                  <button
                    type="submit"
                    className="ui primary button"
                    style={{ margin: '15px auto 0 auto' }}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Get Started
                  </button>
                </ButtonContainer>
              </FormContainer>
            </>
          )}
        </Formik>
      </>
    </Background>
  );
};

export default Signup;
