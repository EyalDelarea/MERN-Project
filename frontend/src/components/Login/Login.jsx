import React, { useEffect, useState } from "react";
import { BodyWrapper } from "../../Globals";
import { useFormik } from "formik";
import { StyledButton } from "../WelcomePage/WelcomePage";
import { TextField } from "@material-ui/core";
import * as yup from "yup";
import styled, { keyframes } from "styled-components";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { PostRequest } from "../../NetworkActions/UsersActions/LoginActions"
import CustomAlert from "../Alerts/CustomAlert";
import { bounceInLeft } from 'react-animations';
import { useCookies } from 'react-cookie';


export const ButtonWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 20px;
`;

export const IconWrapper = styled.div`
  display: grid;
  justify-content: center;
`;
export const Icon = styled(LockOpenIcon)`
  width: 150px !important;
  height: 50px !important;
`;
export const FormWrapper = styled.div`
  max-width: 400px;
`;
const bounceAnimation = keyframes`${bounceInLeft}`;
const RedirectWrapper = styled.div`
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
  animation: 2s ${bounceAnimation};
`;
function Login({history}) {

    const [cookies, setCookie, removeCookie] = useCookies(['Set-Cookie']);

    const [error, setError] = useState();
  
  const [redirectMessage, setRedirectMessage] = useState();
    const validationSchema = yup.object({
        email: yup
            .string("Enter your email")
            .email("Enter a valid email")
            .required("Email is required"),
        password: yup
            .string("Enter your password")
            .min(6, "Password should be of minimum 6 characters length")
            .required("Password is required"),
    });

    function clearError  (){
        setError({})
    }
    

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        // validationSchema: validationSchema,
        onSubmit:async (values)=> {

            const response = await PostRequest(values,history,"/users/login")
            const serverRes = {
                responseCode: response.responseCode,
                message: response.message,
            };
            setError(serverRes);
        },
    });

    useEffect(() => {
        const timeoutRedirect = async () => {
            setTimeout(() => {
                history.push("/dashboard");
            }, 3000);
        };
       
        //erro code can be a number type or string
        // eslint-disable-next-line eqeqeq
        if (!!error && error.responseCode == "200") {
           timeoutRedirect();
            setRedirectMessage("Redirecting...");
            
 
        }
    }, [error, history]);


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
                        label={
                            formik.errors.email && formik.errors.email
                                ? formik.errors.email
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
                            formik.errors.password  && formik.errors.password
                                ? formik.errors.password
                                : "Password"
                        }
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    <ButtonWrapper>
                        <StyledButton onClick={() => formik.handleSubmit()}>
                            Login
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
                {!!redirectMessage ?<RedirectWrapper>{ redirectMessage}</RedirectWrapper> : ""}
            </FormWrapper>
        </BodyWrapper>
    );
}

export default Login;
