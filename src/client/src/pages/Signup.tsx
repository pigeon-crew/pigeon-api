import * as React from 'react';
import styled from 'styled-components';

const Headline = styled.h1`
    padding-top: 7%;
    font-family: Roboto;
    font-size: 30px;
    text-align: center;
    color: black;
`;

// TODO: Decide on Formik or another way of processing form submissions

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const InputField = styled.input`
    width: 200px;
    border-radius: 12px;
    color: #797979;
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

const SubmitButton = styled.button`
    font-family: 'Roboto', sans-serif, bold;
    font-size: 18px;
    border-color: pink;
    background-color: #ffb9b9;
    padding: 10px;
    border-radius: 10px;
    color: white;
    width: 350px;
    margin: auto;
`;

const Signup = () => {
    return (
        <>
            <Headline>Pigeon Sign Up</Headline>
            <FormContainer>
                <InputField type="text" name="name" placeholder="Jane Doe" />
                <InputField type="text" name="email" placeholder="janedoe@gmail.com" />
                <InputField type="password" name="password" placeholder="1234" />
                <InputField type="text" name="confirm-password" placeholder="1234" />
                <SubmitButton type="submit">Get started!</SubmitButton>
            </FormContainer>
        </>
    );
};

export default Signup;
