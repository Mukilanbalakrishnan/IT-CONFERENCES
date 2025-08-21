import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import './Navbar.css';

const Navbar = () => {
  const [sidemenu, setSideMenu] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isHomePage = location.pathname === '/';

    const handleScroll = () => {
      // Becomes solid on scroll, transparent at top
      setIsTransparent(window.scrollY <= 10);
    };

    if (isHomePage) {
      // Set initial state and add listener only for the homepage
      handleScroll(); // Set state on initial load/navigation
      window.addEventListener("scroll", handleScroll);
    } else {
      // Always be solid on other pages
      setIsTransparent(false);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (isHomePage) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [location.pathname]); // Re-run this effect when the page changes

  const navLinkClass = ({ isActive }) => (isActive ? "active" : "");

  // Determine the header class based on transparency state
  const headerClass = `header ${!isTransparent ? "scrolled" : ""}`;

  return (
    <header className={headerClass}>
      <div className="header-container">
        {/* Desktop Menu */}
        <ul className="desktop-nav">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/agenda" className={navLinkClass}>
              Agenda
            </NavLink>
          </li>
          <li>
            <NavLink to="/speaker" className={navLinkClass}>
              Speaker
            </NavLink>
          </li>

          {/* Committees Dropdown */}
          <li className="nav-item-dropdown">
            <p className="dropdown-trigger">
              Committees <IoIosArrowDown />
            </p>
            <div className="nav-item-dropdown-content">
              <div className="dropdown-links">
                <p onClick={() => navigate("/committees/advisory-board")}>
                  Advisory Board
                </p>
                <p onClick={() => navigate("/committees/organizing-committee")}>
                  Organizing Committee
                </p>
                <p onClick={() => navigate("/committees/research-and-review-committee")}>
                  Research and Review Committee
                </p>
              </div>
            </div>
          </li>

          {/* Events Dropdown */}
          <li className="nav-item-dropdown">
            <p className="dropdown-trigger">
              Events <IoIosArrowDown />
            </p>
            <div className="nav-item-dropdown-content">
              <div className="dropdown-links">
                {["track1", "track2", "track3", "track4"].map((t) => (
                  <p key={t} onClick={() => navigate(`/tracks/${t}`)}>
                    {t.replace("track", "Track ")}
                  </p>
                ))}
              </div>
            </div>
          </li>

          <li>
            <NavLink to="/venue" className={navLinkClass}>
              Venue
            </NavLink>
          </li>
          <li>
            <NavLink to="/sponsors" className={navLinkClass}>
              Sponsors
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right section */}
        <div className="header-actions">
          <Link to="/login" className="login-btn">
            Login
          </Link>

          {/* Mobile Menu Button */}
          <HiOutlineMenuAlt3
            className="mobile-menu-button"
            onClick={() => setSideMenu(true)}
          />
        </div>
      </div>

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

          {/* Committees Mobile Dropdown */}
          <li className="mobile-dropdown">
            <details>
              <summary>
                Committees
                <IoIosArrowDown />
              </summary>
              <div className="mobile-dropdown-content">
                <p onClick={() => { navigate("/committees/advisory-board"); setSideMenu(false); }}>Advisory Board</p>
                <p onClick={() => { navigate("/committees/organizing-committee"); setSideMenu(false); }}>Organizing Committee</p>
                <p onClick={() => { navigate("/committees/research-and-review-committee"); setSideMenu(false); }}>Research and Review Committee</p>
              </div>
            </details>
          </li>

          {/* Events Mobile Dropdown */}
          <li className="mobile-dropdown">
            <details>
              <summary>
                Events
                <IoIosArrowDown />
              </summary>
              <div className="mobile-dropdown-content">
                {["track1", "track2", "track3", "track4"].map((t) => (
                  <p
                    key={t}
                    onClick={() => { navigate(`/tracks/${t}`); setSideMenu(false); }}
                  >
                    {t.replace("track", "Track ")}
                  </p>
                ))}
              </div>
            </details>
          </li>

          <li><NavLink to="/venue" className={navLinkClass} onClick={() => setSideMenu(false)}>Venue</NavLink></li>
          <li><NavLink to="/sponsors" className={navLinkClass} onClick={() => setSideMenu(false)}>Sponsors</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass} onClick={() => setSideMenu(false)}>Contact</NavLink></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
