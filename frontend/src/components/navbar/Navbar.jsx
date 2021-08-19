import styled, { keyframes } from "styled-components";
import logo from "../../static/logo.png";
import { pulse } from "react-animations";
import { Link } from "react-router-dom";

const NavWrapper = styled.div`
  display: flexbox;
  background: #193011;
  min-height: 10vh;
  align-items: center;
  padding: 10px;
`;

const Header = styled.p`
  color: white;
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
`;

const fadeInAnimation = keyframes`${pulse}`;
const Logo = styled.img`
  width: 200px;
  height: 100px;

  @media (max-width: 400px) {
    width: 100px;
    height: 50px;
  }

  animation: infinite 5s ${fadeInAnimation};
`;
function Navbar() {
  return (
    <NavWrapper>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      <Header>MERN Project</Header>
    </NavWrapper>
  );
}

export default Navbar;
