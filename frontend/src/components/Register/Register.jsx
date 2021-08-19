import React, { useEffect } from 'react'
import { BodyWrapper } from '../../Globals'
import { useFormik } from 'formik';
import { StyledButton } from '../WelcomePage/WelcomePage';
import {  TextField } from '@material-ui/core';
import * as yup from 'yup';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import { ButtonWrapper, FormWrapper, IconWrapper } from '../Login/Login';
import styled from 'styled-components';

const Icon = styled(AssignmentIndIcon)`
  width:150px !important;
  height:50px !important;
`;

function Register() {

    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required('First name is required'),
        lastName: yup
            .string()
            .required('Last name is required'),
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(6, 'Password should be of minimum 6 characters length')
            .required('Password is required'),
            password2: yup
            .string('Enter your password')
            .oneOf([yup.ref('password'),null],"Passwords do not match"),    
    });


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("i've been called")
            alert(JSON.stringify(values, null, 2));
            console.log(values)
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
                        id="firstName"
                        name="firstName"
                        label={formik.touched.firstName && Boolean(formik.errors.firstName) ?  formik.errors.firstName : 'First Name'}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label={formik.touched.lastName && Boolean(formik.errors.lastName) ? formik.errors.lastName : 'Last Name'}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label={formik.touched.email && Boolean(formik.errors.email) ? formik.touched.email && formik.errors.email : 'Email'}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label={formik.touched.password && Boolean(formik.errors.password) ? formik.touched.password && formik.errors.password : 'Password'}
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    <TextField
                        fullWidth
                        id="password2"
                        name="password2"
                        label={formik.touched.password2 && Boolean(formik.errors.password2) ? formik.touched.password2 && formik.errors.password2 : 'Password'}
                        type="password"
                        value={formik.values.password2}
                        onChange={formik.handleChange}
                        error={formik.touched.password2 && Boolean(formik.errors.password2)}
                    />
                    <ButtonWrapper>
                        <StyledButton onClick={() => formik.handleSubmit()} >
                            Register
                        </StyledButton>
                    </ButtonWrapper>
                </form>
            </FormWrapper>

        </BodyWrapper>
    )
}

export default Register
