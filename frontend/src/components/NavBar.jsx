import React, { Fragment } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function NavBar() {
  const name = localStorage.getItem("name");
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
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
            <li className="nav-item ">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "superAdmin" ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/users"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  UserList
                </a>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "superAdmin" ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/activitys"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Activity
                </a>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "Admin" ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/activitys"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Activity
                </a>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/profile"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Profile
                </a>
              </li>
            ) : (
              ""
            )}

            {localStorage.getItem("login") ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/books"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Book
                </a>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "superAdmin" ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/issuedbooks"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  IssuedBook
                </a>
              </li>
            ) : (
              ""
            )}
            {localStorage.getItem("login") &&
            localStorage.getItem("role") === "Admin" ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/issuedbooks"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  IssuedBook
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item ml-5 ">
              <a
                className="nav-link active"
                href="/profile"
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
              </a>
            </li>
            {localStorage.getItem("login") ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/logout"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Logout
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/login"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Login
                </a>
              </li>
            )}
            {localStorage.getItem("login") ? (
              " "
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/register"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  SingUp
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}
