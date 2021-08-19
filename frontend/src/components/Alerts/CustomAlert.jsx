
import { Alert, AlertTitle } from "@material-ui/lab";
import styled from "styled-components";

const AlertWrapper = styled.div`
margin: 15px;
`;


const  CustomAlert = ({responseCode,message})=> {

   
    let severity;
    switch (responseCode[0]) {

        case "5":
            severity = "error";
            break;
        case "4":
            severity = "warning";
            break;
        case "2":
            severity = "success";
            break;
        default:
            severity = "info";
            break;
    }
    return (
        <AlertWrapper>
            <Alert severity={severity} variant="filled">
                <AlertTitle>Status: {responseCode}</AlertTitle>

                <strong>{message}</strong>
            </Alert>
        </AlertWrapper>
    );
};



export default CustomAlert