import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import Header from '../components/ui/Header';
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
  padding-bottom: 10px;
`;

const Background = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 100%;
  background-color: #ffa3a3;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 400px;
  margin-left: 46%;
`;

/* TODO: Decide on Formik or another way of processing form submissions*/

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
  margin-bottom: 20px;

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

const Signup = () => {
  const params = new URLSearchParams(useLocation().search);
  const emailQuery = params.get('email');

  const initialValues: FormValues = {
    email: emailQuery || '',
    name: '',
    password: '',
    confirm: '',
  };

  return (
    <Background>
      <Header />
      <>
        <Headline>Pigeon Sign Up</Headline>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {} as any;
            if (!values.email) {
              errors.email = 'Email address required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
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
            handleChange: any;
            handleBlur: any;
            handleSubmit: any;
            isSubmitting: any;
          }) => (
            <>
              <FormContainer>
                <InputField
                  type="text"
                  name="email"
                  value={values.email}
                  placeholder="janedoe@gmail.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  type="text"
                  name="name"
                  value={values.name}
                  placeholder="Jane Doe"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputField
                  type="text"
                  name="confirm-password"
                  value={values.confirm}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ButtonContainer>
                  <button className="ui primary button">Get Started</button>
                </ButtonContainer>

                {/*errors.username && touched.username && (
                  <ErrorLabel>{errors.username}</ErrorLabel>
                )*/}
              </FormContainer>
            </>
          )}
        </Formik>
      </>
    </Background>
  );
};

export default Signup;
