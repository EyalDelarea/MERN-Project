import React, { useEffect } from 'react'
import { BodyWrapper } from '../../Globals'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { StyledButton } from '../WelcomePage/WelcomePage';
import { Button, TextField } from '@material-ui/core';
import * as yup from 'yup';
import styled from 'styled-components';
import LockOpenIcon from '@material-ui/icons/LockOpen';



export const ButtonWrapper = styled.div`
display: grid;
justify-content: center;
margin-top :20px;
`;

export const IconWrapper = styled.div`
display:grid;
justify-content: center;  
`;
export const Icon = styled(LockOpenIcon)`
  width:150px !important;
  height:50px !important;
`;
export const FormWrapper = styled.div`
max-width: 400px;

  
`;
function Login() {
    const validationSchema = yup.object({

       
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(6, 'Password should be of minimum 6 characters length')
            .required('Password is required'),
    });


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("i've been called")
            alert(JSON.stringify(values, null, 2));
        },
    });



    return (
        <BodyWrapper>

            <FormWrapper>
                <IconWrapper>
                    <Icon />
                </IconWrapper>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label={formik.errors.email ? formik.touched.email && formik.errors.email : 'Email'}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label={formik.errors.password ? formik.touched.password && formik.errors.password:'Password'}
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    <ButtonWrapper>
                        <StyledButton onClick={()=>formik.handleSubmit()} >
                            Login
                        </StyledButton>
                    </ButtonWrapper>
                </form>
            </FormWrapper>

        </BodyWrapper>
    )
}



export default Login
