
import { Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import styled from "styled-components";
import ClearIcon from '@material-ui/icons/Clear';

const AlertWrapper = styled.div`
margin: 15px;
position: relative;
`;

const Icon = styled(ClearIcon)`

 position: absolute;
 top: 0px ;
 right: 0px;
 margin:10px;
`;


const CustomAlert = ({ responseCode, message, cancelAlert }) => {


  if(typeof message ==='object'){
      message = message.message
  }

    let firstCodeDigit;

    try {
        firstCodeDigit = String(responseCode[0])
    } catch {
        return <div></div>
    }
    let severity;
    switch (firstCodeDigit) {

        case "5":
            severity = "error";
            break;
        case "4":
            severity = "warning";
            break;
        case "2":
            severity = "success";
            break;
        case "3":
            severity = "info";
            break;
        default:
            return (<div></div>);
    }
    return (
        <AlertWrapper>

            <Alert severity={severity} variant="filled">

                <AlertTitle>Status: {responseCode} </AlertTitle>

                <strong>{message}</strong>

                <Icon
                    onClick={() => cancelAlert()}
                />
            </Alert>
        </AlertWrapper>
    );
};



export default CustomAlert