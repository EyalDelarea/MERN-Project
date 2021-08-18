import styled from 'styled-components';
import logo from "../../static/logo.png"



const NavWrapper = styled.div`
  display: flexbox;
  background: black;
  opacity: 0.8;
 min-height: 10vh;
 align-items: center;
 padding: 10px;
 
`;

const Header= styled.p`
  color:white;
  font-size: 25px;
  font-weight: bold;
  margin: 10px;

`;

const Logo = styled.img`
width:200px;
height: 100px;



  
`;
function Navbar() {
    return (
        <NavWrapper>
        <Logo 
        src={logo}      
        />
            <Header>Auth NodeJS Project</Header>
        </NavWrapper>
    );
}

export default Navbar;
