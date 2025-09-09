import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import './Navbar.css';

const Navbar = () => {
  const [sidemenu, setSideMenu] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Effect to handle header transparency on scroll
  useEffect(() => {
    const isHomePage = location.pathname === '/';
    const handleScroll = () => {
      setIsTransparent(window.scrollY <= 10);
    };

    if (isHomePage) {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsTransparent(false);
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [location.pathname]);

  // EFFECT TO LOCK BODY SCROLL WHEN SIDEMENU IS OPEN
  useEffect(() => {
    if (sidemenu) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, [sidemenu]);

  const navLinkClass = ({ isActive }) => (isActive ? "active" : "");
  const headerClass = `header ${!isTransparent ? "scrolled" : ""}`;

  return (
    <>
      <header className={headerClass}>
        <div className="header-container">
          <ul className="desktop-nav">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
              <li className="nav-item-dropdown">
              <p className="dropdown-trigger">Committees <IoIosArrowDown /></p>
              <div className="nav-item-dropdown-content">
                <div className="dropdown-links">
                  <p onClick={() => navigate("/committees/advisory-board")}>Advisory Board</p>
                  <p onClick={() => navigate("/committees/organizing-committee")}>Organizing Committee</p>
                  <p onClick={() => navigate("/committees/research-and-review-committee")}>Research and Review Committee</p>
                </div>
              </div>
            </li>

            <li><NavLink to="/agenda" className={navLinkClass}>Agenda</NavLink></li>

            <li><NavLink to="/speaker" className={navLinkClass}>Speaker</NavLink></li>

            {/* <li className="nav-item-dropdown">
              <p className="dropdown-trigger">Events <IoIosArrowDown /></p>
              <div className="nav-item-dropdown-content">
                <div className="dropdown-links">
                  {["track1", "track2", "track3", "track4"].map((t) => (
                    <p key={t} onClick={() => navigate(`/tracks/${t}`)}>
                      {t.replace("track", "Track ")}
                    </p>
                  ))}
                </div>
              </div>
            </li> */}

            <li><NavLink to="/conferencetrack" className={navLinkClass} onClick={() => setSideMenu(false)}>Tracks</NavLink></li>

            <li><NavLink to="/venue" className={navLinkClass}>Venue</NavLink></li>
            <li><NavLink to="/sponsors" className={navLinkClass}>Sponsors</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
          </ul>

          {/* 3. Right Item (Actions) */}
          <div className="header-actions">
            <Link to="/login" className="login-btn">SUBMIT A PAPER</Link>
            <HiOutlineMenuAlt3
              className="mobile-menu-button"
              onClick={() => setSideMenu(true)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      <div className={`mobile-sidemenu ${sidemenu ? "open" : ""}`}>
        <div className="sidemenu-header">
          <span className="sidemenu-title">Menu</span>
          <IoCaretBackOutline
            className="sidemenu-close-btn"
            onClick={() => setSideMenu(false)}
          />
        </div>
        <ul className="mobile-nav-links">
          <li><NavLink to="/" className={navLinkClass} onClick={() => setSideMenu(false)}>Home</NavLink></li>
          <li><NavLink to="/agenda" className={navLinkClass} onClick={() => setSideMenu(false)}>Agenda</NavLink></li>
          <li><NavLink to="/speaker" className={navLinkClass} onClick={() => setSideMenu(false)}>Speaker</NavLink></li>
          <li className="mobile-dropdown">
            <details>
              <summary>Committees <IoIosArrowDown /></summary>
              <div className="mobile-dropdown-content">
                <p onClick={() => { navigate("/committees/advisory-board"); setSideMenu(false); }}>Advisory Board</p>
                <p onClick={() => { navigate("/committees/organizing-committee"); setSideMenu(false); }}>Organizing Committee</p>
                <p onClick={() => { navigate("/committees/research-and-review-committee"); setSideMenu(false); }}>Research and Review Committee</p>
              </div>
            </details>
          </li>
          {/* <li className="mobile-dropdown">
            <details>
              <summary>Events <IoIosArrowDown /></summary>
              <div className="mobile-dropdown-content">
                {["track1", "track2", "track3", "track4"].map((t) => (
                  <p key={t} onClick={() => { navigate(`/tracks/${t}`); setSideMenu(false); }}>
                    {t.replace("track", "Track ")}
                  </p>
                ))}
              </div>
            </details>
          </li> */}
          <li><NavLink to="/conferencetrack" className={navLinkClass} onClick={() => setSideMenu(false)}>Tracks</NavLink></li>
          <li><NavLink to="/venue" className={navLinkClass} onClick={() => setSideMenu(false)}>Venue</NavLink></li>
          <li><NavLink to="/sponsors" className={navLinkClass} onClick={() => setSideMenu(false)}>Sponsors</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass} onClick={() => setSideMenu(false)}>Contact</NavLink></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;