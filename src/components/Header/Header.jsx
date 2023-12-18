import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/sign-in",
    display: "Sign In",
  },
];

const Header = ({ user, setUser }) => {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          console.log("Login successful. Response data:", responseData);
          setUser(responseData);
        } else {
          // Handle the case where the response is not JSON
          console.error("Unexpected response format:", contentType);
        }
      } else {
        // Handle the case where the server returns an error
        console.error("Login failed:", response.status, response.statusText);
        const responseText = await response.text();
        console.error("Response text:", responseText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
    }
  };




  const fetchUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/protected", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        // Handle unauthorized or other errors
        console.error("Failed to fetch user data");
        return null;
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error fetching user data", error);
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:5555/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +254797233957
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {user ? (
                  <>
                    <span>Hello, {user.username}!</span>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <div className="d-flex align-items-center gap-1">
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button onClick={handleLogin}>Login</button>
                    </div>
                    <Link to="/sign-up" className="d-flex align-items-center gap-1">
                      <i className="ri-user-line"></i> Register
                    </Link>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                      Rent Car <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Kenya</h4>
                  <h6>Mombasa</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
