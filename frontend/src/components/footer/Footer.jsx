

import styled from 'styled-components';
const FooterWrapper = styled.div`
   display: flexbox;
   position: absolute;
  bottom: 0;
  color:white;
  width:100%;
  min-height: 10vh;
  background: black;

  justify-content: center;
`;

const GitHubLink = styled.a`
  display:grid;
align-content: center;
text-decoration: underline;
color :white;

`;

function Footer() {
    return (
        <FooterWrapper>
      
      <GitHubLink href={"https://github.com/EyalDelarea/"} target="_blank">
      ©  Crated by : Eyal Delarea
      </GitHubLink>
       
        </FooterWrapper>
    )
}

export default Footer
