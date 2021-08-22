import React, { useEffect, useState } from "react";
import { BodyWrapper } from "../../Globals";
import { useFormik } from "formik";
import { StyledButton } from "../WelcomePage/WelcomePage";
import { TextField } from "@material-ui/core";
import * as yup from "yup";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

import { ButtonWrapper, FormWrapper, IconWrapper } from "../Login/Login";
import styled, { keyframes } from "styled-components";
import CustomAlert from "../Alerts/CustomAlert";
import { PostRequest } from "../../NetworkActions/UsersActions/LoginActions";
import { bounceInLeft } from "react-animations";
import { useCookies } from "react-cookie";

const Icon = styled(AssignmentIndIcon)`
  width: 150px !important;
  height: 50px !important;
`;
const bounceAnimation = keyframes`${bounceInLeft}`;

const RedirectWrapper = styled.div`
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
  animation: 2s ${bounceAnimation};
`;

function Register({ history }) {
    const [error, setError] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(["Set-Cookie"]);

    const [redirectMessage, setRedirectMessage] = useState();

    const validationSchema = yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup
            .string("Enter your email")
            .email("Enter a valid email")
            .required("Email is required"),
        password: yup
            .string("Enter your password")
            .min(6, "Password should be of minimum 6 characters length")
            .required("Password is required"),
        password2: yup
            .string("Enter your password")
            .oneOf([yup.ref("password"), null], "Passwords do not match"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
        },
        //  validationSchema: validationSchema,
        onSubmit: async (values) => {
            const res = await PostRequest(values, history, "/users/register");
            const serverRes = {
                responseCode: res.responseCode,
                message: res.message,
            };

            setError(serverRes);
        },
    });

    function clearError() {
        setError({});
    }
    useEffect(() => {
        const timeoutRedirect = async () => {
            setTimeout(() => {
                history.push("/login");
            }, 3000);
        };

        if (!!error && error.responseCode == "200") {
            timeoutRedirect();

            setRedirectMessage("Redirecting...");
        }
    }, [error, history, cookies]);

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
                        label={
                            formik.touched.firstName && Boolean(formik.errors.firstName)
                                ? formik.errors.firstName
                                : "First Name"
                        }
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    />
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label={
                            formik.touched.lastName && Boolean(formik.errors.lastName)
                                ? formik.errors.lastName
                                : "Last Name"
                        }
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label={
                            formik.touched.email && Boolean(formik.errors.email)
                                ? formik.touched.email && formik.errors.email
                                : "Email"
                        }
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label={
                            formik.touched.password && Boolean(formik.errors.password)
                                ? formik.touched.password && formik.errors.password
                                : "Password"
                        }
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    <TextField
                        fullWidth
                        id="password2"
                        name="password2"
                        label={
                            formik.touched.password2 && Boolean(formik.errors.password2)
                                ? formik.touched.password2 && formik.errors.password2
                                : "Password"
                        }
                        type="password"
                        value={formik.values.password2}
                        onChange={formik.handleChange}
                        error={formik.touched.password2 && Boolean(formik.errors.password2)}
                    />
                    <ButtonWrapper>
                        <StyledButton onClick={() => formik.handleSubmit()}>
                            Register
                        </StyledButton>
                    </ButtonWrapper>
                </form>
                {!!error ? (
                    <CustomAlert
                        responseCode={error.responseCode}
                        message={error.message}
                        cancelAlert={clearError}
                    />
                ) : (
                    ""
                )}
                {!!redirectMessage ? (
                    <RedirectWrapper>{redirectMessage}</RedirectWrapper>
                ) : (
                    ""
                )}
            </FormWrapper>
        </BodyWrapper>
    );
}

export default Register;
