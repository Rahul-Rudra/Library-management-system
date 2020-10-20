import React, { Fragment } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar() {
  const name = localStorage.getItem("name");
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                tabIndex="-1"
                aria-disabled="true"
              >
                Home
              </Link>
            </li>

            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "superAdmin" ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/dashboard"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              ""
            )}

            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "superAdmin" ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/users"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  UserList
                </Link>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "superAdmin" ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/activitys"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Activity
                </Link>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "Admin" ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/activitys"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Activity
                </Link>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/profile"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Profile
                </Link>
              </li>
            ) : (
              ""
            )}

            {localStorage.getItem("login") ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/books"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Book
                </Link>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/mybooks"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Mybook
                </Link>
              </li>
            ) : (
              ""
            )}

            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "superAdmin" ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/issuedbooks"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  IssuedBook
                </Link>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "Admin" ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/issuedbooks"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  IssuedBook
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item ml-5 ">
              <Link
                className="nav-link active"
                to="/profile"
                tabIndex="-1"
                aria-disabled="false"
              >
                <span
                  style={{
                    color: "#deee78",
                    margin: "5px",
                    textAlign: "center",
                  }}
                >
                  {name}
                </span>
                <FaUserCircle />
              </Link>
            </li>
            {localStorage.getItem("login") ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/logout"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Login
                </Link>
              </li>
            )}
            {localStorage.getItem("login") ? (
              " "
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/register"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  SignUp
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}
