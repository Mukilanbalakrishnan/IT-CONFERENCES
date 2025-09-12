// import React, { useState, useEffect } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import { IoCaretBackOutline } from "react-icons/io5";
// import { IoIosArrowDown } from "react-icons/io";
// import './Navbar.css';
// import SignIn from '/src/pages/Login/Signin';
// import AuthModal from "/src/pages/Login/Signin"; // wraps both login + signup

// {showLogin && (
//   <div className="modal-backdrop">
//     <AuthModal onClose={() => setShowLogin(false)} />
//   </div>
// )}


// import RegistrationForm from '/src/pages/Login/LoginForm';

// const Navbar = ({ onOpenLogin }) => {
//   const [sidemenu, setSideMenu] = useState(false);
//   const [isTransparent, setIsTransparent] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showSignIn, setShowSignIn] = useState(false);

//   // Effect to handle header transparency on scroll
//   useEffect(() => {
//     const isHomePage = location.pathname === '/';
//     const handleScroll = () => {
//       setIsTransparent(window.scrollY <= 10);
//     };

//     if (isHomePage) {
//       handleScroll();
//       window.addEventListener("scroll", handleScroll);
//     } else {
//       setIsTransparent(false);
//     }

//     return () => {
//       if (isHomePage) {
//         window.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, [location.pathname]);

//   // EFFECT TO LOCK BODY SCROLL WHEN SIDEMENU IS OPEN
//   useEffect(() => {
//     if (sidemenu) {
//       document.body.classList.add('body-no-scroll');
//     } else {
//       document.body.classList.remove('body-no-scroll');
//     }
//     return () => {
//       document.body.classList.remove('body-no-scroll');
//     };
//   }, [sidemenu]);

//   // **NEW** EFFECT TO ADD A CLASS TO BODY ON HOME PAGE
//   useEffect(() => {
//     if (location.pathname === '/') {
//         document.body.classList.add('is-home-page');
//     } else {
//         document.body.classList.remove('is-home-page');
//     }
//     // Cleanup to ensure the class is removed if the component unmounts
//     return () => {
//         document.body.classList.remove('is-home-page');
//     };
//   }, [location.pathname]);


//   const navLinkClass = ({ isActive }) => (isActive ? "active" : "");
//   const headerClass = `header ${!isTransparent ? "scrolled" : ""}`;

//   return (
//     <>
//       <header className={headerClass}>
//         <div className="header-container">
//           <ul className="desktop-nav">
//             <li><NavLink to="/" className={navLinkClass} onClick={()=>screenTop(0,0)}>Home</NavLink></li>
//               <li className="nav-item-dropdown">
//               <p className="dropdown-trigger">Committees <IoIosArrowDown /></p>
//               <div className="nav-item-dropdown-content">
//                 <div className="dropdown-links">
//                   <p onClick={() => navigate("/committees/advisory-board")}>Advisory Board</p>
//                   <p onClick={() => navigate("/committees/organizing-committee")}>Organizing Committee</p>
//                   <p onClick={() => navigate("/committees/research-and-review-committee")}>Research and Review Committee</p>
//                 </div>
//               </div>
//             </li>

//             <li><NavLink to="/agenda" onClick={()=>screenTop(0,0)} className={navLinkClass}>Agenda</NavLink></li>

//             <li><NavLink to="/speaker" className={navLinkClass}>Speaker</NavLink></li>

//             <li><NavLink to="/conferencetrack" className={navLinkClass} onClick={() => setSideMenu(false)}>Tracks</NavLink></li>

//             <li><NavLink to="/venue" className={navLinkClass}>Venue</NavLink></li>
//             <li><NavLink to="/journal" className={navLinkClass}>Journal</NavLink></li>
//             <li><NavLink to="/feestructure" className={navLinkClass}>Fee Details</NavLink></li>
//             <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
//           </ul>

//           <div className="header-actions">
//             <button 
//               onClick={() => setShowSignIn(true)} 
//               className="login-btn"
//             >
//               SUBMIT A PAPER
//             </button>
//             <HiOutlineMenuAlt3
//               className="mobile-menu-button"
//               onClick={() => setSideMenu(true)}
//             />
//           </div>

//         </div>
//       </header>


//       {showSignIn && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <SignIn
//               onSwitch={() => {
//                 // later you can switch to SignUp
//                 console.log("Switch to Signup");
//               }}
//               onClose={() => setShowSignIn(false)}
//             />
//           </div>
//         </div>
//       )}
//       {showLogin && (
//   <div className="modal-backdrop">
//     <AuthModal onClose={() => setShowLogin(false)} />
//   </div>
// )}

//       {/* Mobile Side Menu */}
//       <div className={`mobile-sidemenu ${sidemenu ? "open" : ""}`}>
//         <div className="sidemenu-header">
//           <span className="sidemenu-title">Menu</span>
//           <IoCaretBackOutline
//             className="sidemenu-close-btn"
//             onClick={() => setSideMenu(false)}
//           />
//         </div>
//         <ul className="mobile-nav-links">
//           <li><NavLink to="/" className={navLinkClass} onClick={() => setSideMenu(false)}>Home</NavLink></li>
//           <li><NavLink to="/agenda" className={navLinkClass} onClick={() => setSideMenu(false)}>Agenda</NavLink></li>
//           <li><NavLink to="/speaker" className={navLinkClass} onClick={() => setSideMenu(false)}>Speaker</NavLink></li>
//           <li className="mobile-dropdown">
//             <details>
//               <summary>Committees <IoIosArrowDown /></summary>
//               <div className="mobile-dropdown-content">
//                 <p onClick={() => { navigate("/committees/advisory-board"); setSideMenu(false); }}>Advisory Board</p>
//                 <p onClick={() => { navigate("/committees/organizing-committee"); setSideMenu(false); }}>Organizing Committee</p>
//                 <p onClick={() => { navigate("/committees/research-and-review-committee"); setSideMenu(false); }}>Research and Review Committee</p>
//               </div>
//             </details>
//           </li>
//           <li><NavLink to="/conferencetrack" className={navLinkClass} onClick={() => setSideMenu(false)}>Tracks</NavLink></li>
//           <li><NavLink to="/venue" className={navLinkClass} onClick={() => setSideMenu(false)}>Venue</NavLink></li>
//           <li><NavLink to="/journal" className={navLinkClass} onClick={() => setSideMenu(false)}>Journal</NavLink></li>
//           <li><NavLink to="/feestructure" className={navLinkClass} onClick={() => setSideMenu(false)}>Fee Details</NavLink></li>
//           <li><NavLink to="/contact" className={navLinkClass} onClick={() => setSideMenu(false)}>Contact</NavLink></li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Navbar;







import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCaretBackOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import './Navbar.css';

import SignIn from '/src/pages/Login/Signin';
import RegistrationForm from '/src/pages/Login/LoginForm';

const Navbar = () => {
  const [sidemenu, setSideMenu] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // ✅ Single state for popup
  const [authMode, setAuthMode] = useState("signin");

  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle scroll transparency
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

  // Lock body scroll when sidemenu is open
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

  // Add home page class
  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('is-home-page');
    } else {
      document.body.classList.remove('is-home-page');
    }
    return () => {
      document.body.classList.remove('is-home-page');
    };
  }, [location.pathname]);

  useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// Open popup with correct default mode
const handleOpenPopup = () => {
  if (isMobile) {
    setAuthMode("signin"); 
  } else {
    setAuthMode("signin");
  }
  setShowPopup(true);
};

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
            <li><NavLink to="/conferencetrack" className={navLinkClass}>Tracks</NavLink></li>
            <li><NavLink to="/venue" className={navLinkClass}>Venue</NavLink></li>
            <li><NavLink to="/journal" className={navLinkClass}>Journal</NavLink></li>
            <li><NavLink to="/feestructure" className={navLinkClass}>Fee Details</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
          </ul>

          <div className="header-actions">
            <button 
              onClick={handleOpenPopup} 
              className="login-btn"
            >
              SUBMIT A PAPER
            </button>
            <HiOutlineMenuAlt3
              className="mobile-menu-button"
              onClick={() => setSideMenu(true)}
            />
          </div>
        </div>
      </header>

      {/* ✅ Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            {authMode === "signin" ? (
              <SignIn
                onClose={() => setShowPopup(false)}
                onSwitch={() => setAuthMode("signup")} // 🔄 switch to signup
              />
            ) : (
              <RegistrationForm
                onClose={() => setShowPopup(false)}
                onSwitch={() => setAuthMode("signin")} // 🔄 switch back to signin
              />
            )}
          </div>
        </div>
      )}

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
          <details>
              <summary>Committees <IoIosArrowDown /></summary>
              <div className="mobile-dropdown-content">
                <p onClick={() => { navigate("/committees/advisory-board"); setSideMenu(false); }}>Advisory Board</p>
                <p onClick={() => { navigate("/committees/organizing-committee"); setSideMenu(false); }}>Organizing Committee</p>
                <p onClick={() => { navigate("/committees/research-and-review-committee"); setSideMenu(false); }}>Research and Review Committee</p>
              </div>
            </details>
          <li><NavLink to="/agenda" className={navLinkClass} onClick={() => setSideMenu(false)}>Agenda</NavLink></li>
          <li><NavLink to="/speaker" className={navLinkClass} onClick={() => setSideMenu(false)}>Speaker</NavLink></li>
          <li className="mobile-dropdown">
            
          </li>
          <li><NavLink to="/conferencetrack" className={navLinkClass} onClick={() => setSideMenu(false)}>Tracks</NavLink></li>
          <li><NavLink to="/venue" className={navLinkClass} onClick={() => setSideMenu(false)}>Venue</NavLink></li>
          <li><NavLink to="/journal" className={navLinkClass} onClick={() => setSideMenu(false)}>Journal</NavLink></li>
          <li><NavLink to="/feestructure" className={navLinkClass} onClick={() => setSideMenu(false)}>Fee Details</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass} onClick={() => setSideMenu(false)}>Contact</NavLink></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;

