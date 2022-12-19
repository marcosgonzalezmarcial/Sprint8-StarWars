import { useCallback, useContext } from "react";
import { Navbar } from "react-bootstrap";
import smallLogo from "../../assets/sw_logo_mobile.png";
import bigLogo from "../../assets/star-wars-logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import SectionNav from "./SectionNav";
import LoginNav from "./LoginNav";
import ToggleMenuBtn from "./ToggleMenuBtn";
import SearchIcon from "../SearchIcon/SearchIcon";
import SearchModal from "../SearchModal/SearchModal";
import { searchModalContext } from "../../contexts/searchModalContext";
import { UiContextProvider } from "../../contexts/uiContext";
import "./Header.scss";

const Header = ({ loggedIn, setLoggedIn }) => {
  const { showModal, openModal, closeModal } = useContext(searchModalContext);

  let navigate = useNavigate();

  const handleSearchClick = useCallback(() => {
    if (loggedIn) {
      openModal();
    } else {
      navigate("/login");
    }
  }, [loggedIn, openModal, navigate]);

  return (
    <header className="header">
      <UiContextProvider>
        <Navbar variant="dark" className="py-1">
          <div className="navbar-container text-center position-relative justify-content-end px-0">
            <ToggleMenuBtn />
            <SearchModal show={showModal} onHide={closeModal} />
            <Navbar.Brand className="m-0 py-3 px-2 p-md-0">
              <Link className="navbar-link p-2" to="/">
                <picture>
                  <source media="(max-width: 767px)" srcSet={smallLogo} />
                  <source media="(min-width: 768px)" srcSet={bigLogo} />
                  <img className="logo-img" src={smallLogo} alt="logo" />
                </picture>
              </Link>
            </Navbar.Brand>
            <button
              className="search-icon-btn ms-auto me-md-auto ms-md-0"
              onClick={() => handleSearchClick()}
            >
              <SearchIcon
                onClick={() => {
                  showModal ? closeModal() : openModal();
                }}
              />
            </button>
            <span></span>
            <LoginNav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <span></span>
          </div>
        </Navbar>
      </UiContextProvider>
      <SectionNav />
    </header>
  );
};

export default Header;
