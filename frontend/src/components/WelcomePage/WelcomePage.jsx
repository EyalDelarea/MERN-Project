import { Button } from "@material-ui/core";
import { pulse } from "react-animations";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { BodyWrapper } from "../../Globals";



const TextWrapper = styled.div`
  display: grid;
`;
const Text = styled.p`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const pulseAnimation = keyframes`${pulse}`;

export const StyledButton = styled(Button)`
  background-color: white !important;
  min-width: 100px !important;
  text-transform: none !important;
  animation: infinite 2s ${pulseAnimation} !important;
 

  &:hover{
      background: #a2a2a2 !important;
  }
  
`;

const StyledLink = styled(Link)`
   text-decoration: none !important;
`;



const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between ;
`;
export default function WelcomePage() {
    return (
        <>
            <BodyWrapper>
                <TextWrapper>
                    <Text>Welcome To My MERN Project</Text>
                    <Text>Go ahead, make an account!</Text>
                    <ButtonsWrapper>
                        <StyledLink
                            to={'/login'}
                        >  <StyledButton>Login</StyledButton>
                        </StyledLink>
                        <StyledLink
                        to={'/register'}>
                        <StyledButton>Register</StyledButton>
                        </StyledLink>
                    </ButtonsWrapper>
                </TextWrapper>
            </BodyWrapper>
        </>
    );
}
