import { Navbar } from "react-bootstrap";
import smallLogo from "assets/sw_logo_mobile.png";
import bigLogo from "assets/star-wars-logo.jpg";
import { Link } from "react-router-dom";
import SectionNav from "components/Header/SectionNav";
import LoginNav from "components/Header/LoginNav";
import ToggleLoginMenuBtn from "components/Header/ToggleLoginMenuBtn";
import SearchButton from "components/Header/SearchButton";
import SearchModal from "components/SearchModal";
import "./Header.scss";
import { SearchModalCtxProvider } from "contexts/SearchModalCtx";
import { LoginMenuCtxProvider } from "contexts/LoginMenuCtx";

const Header = ({ loggedIn, setLoggedIn }) => {
  return (
    <header className="header">
      <Navbar variant="dark">
        <div className="navbar-container text-center position-relative justify-content-end px-0">
          <Navbar.Brand className="m-0 py-3 px-2 p-md-0">
            <Link className="navbar-link p-2" to="/">
              <picture>
                <source media="(max-width: 767px)" srcSet={smallLogo} />
                <source media="(min-width: 768px)" srcSet={bigLogo} />
                <img className="logo-img" src={smallLogo} alt="logo" />
              </picture>
            </Link>
          </Navbar.Brand>
          <SearchModalCtxProvider>
            <SearchButton loggedIn={loggedIn} />
            <SearchModal />
          </SearchModalCtxProvider>
          <span></span>
          <LoginMenuCtxProvider>
            <ToggleLoginMenuBtn />
            <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </LoginMenuCtxProvider>
          <span></span>
        </div>
      </Navbar>
      <SectionNav />
    </header>
  );
};

export default Header;
