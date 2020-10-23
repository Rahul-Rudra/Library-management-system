// ** create-user.component.js ** //

import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import ErrorAlert from "./ErrorAlert11";
import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import swal from "sweetalert2";
//import { indexOf } from "lodash";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      role: "user",
      //error: [],
      errors: {
        name: "",
        email: "",
        password: "",
      },
      alert_message: "",
    };
  }

  onChangeUser(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.name = value.length < 3 ? "name must contain 3 character" : "";
    this.setState({ name: e.target.value });
  }

  onChangeEmail(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.email =
      value.length > 20 ? "email can not be more than 20 character" : "";
    let apos = value.indexOf("@");
    let dotpos = value.lastIndexOf(".");
    if (apos < 1 || dotpos - apos < 2) {
      errors.email = "please enter a valid email id";
    }
    this.setState({ email: e.target.value });
  }
  onChangePassword(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.password =
      value.length < 6 ? "password must contain atleast  6 character" : "";
    this.setState({ password: e.target.value });
  }

  handleChange(event) {
    this.setState({ role: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let errors = this.state.errors;
    if (this.state.name === "") {
      errors.name = "Can not be null";
    } else if (this.state.email === "") {
      errors.email = "Can not be null";
    } else if (this.state.password === "") {
      errors.password = "Can not be null";
    } else if (this.state.password.length !== 0) {
      errors.password = this.state.errors.name;
    } else if (this.state.errors.email.length !== 0) {
      errors.email = this.state.errors.email;
    } else if (this.state.errors.password.length !== 0) {
      errors.password = this.state.errors.password;
    }

    const userObject = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };

    axios
      .post("/api/users", userObject)
      .then((res) => {
        // toast.success("Successfully Register");
        //swal.fire("Successfully Register");
        //return this.props.history.push("/login");
        this.setState({ alert_message: "success" });
      })
      .catch((error) => {
        console.log(error);
        if (
          this.state.errors.email.length === 0 &&
          this.state.errors.password.length === 0 &&
          this.state.errors.name.length === 0
        ) {
          // alert("user already exists ");
          this.setState({ alert_message: "error" });
        }
      });

    this.setState({ name: "", email: "", password: "" });
  }

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <div className="wrapper m-5 ">
          <h1 style={{ textAlign: "center", color: "ButtonShadow" }}>SignUp</h1>
          {this.state.alert_message === "error" ? <ErrorAlert /> : ""}
          {this.state.alert_message === "success" ? (
            <div className="alert alert-success" role="alert">
              Successfully Registered
              <Link className="m-5" to="/login">
                Login
              </Link>
            </div>
          ) : (
            ""
          )}
          <form onSubmit={this.onSubmit}>
            <div className="form-group m-3">
              <label forhtml="name">Name</label>
              <input
                autoFocus
                type="text"
                id="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.onChangeUser}
                className="form-control"
              />
              {errors.name ? (
                <div className="alert alert-danger m-1" role="alert">
                  {errors.name}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group m-3">
              <label forhtml="email">Email</label>
              <input
                // autoFocus
                type="text"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                className="form-control"
              />
              {errors.email ? (
                <div className="alert alert-danger m-1" role="alert">
                  {errors.email}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group m-3 ">
              <label forhtml="password">Password</label>
              <input
                //autoFocus
                type="password"
                id="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                className="form-control"
              />
              {errors.password ? (
                <div className="alert alert-danger m-1" role="alert">
                  {errors.password}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group m-3">
              <label forhtml="exampleFormControlSelect">Role</label>
              <select
                className="form-control"
                value={this.state.role}
                onChange={this.handleChange}
              >
                <option value="user">user</option>
                <option value="Admin">Admin</option>
                <option value="superAdmin">superAdmin</option>
              </select>
            </div>
            {this.state.errors.email.length === 0 &&
            this.state.errors.password.length === 0 &&
            this.state.errors.name.length === 0 ? (
              <div className="form-group m-3">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-success "
                />
              </div>
            ) : (
              <div className="form-group m-3">
                <input
                  type="submit"
                  value="Register"
                  disabled="true"
                  className="btn btn-success "
                />
              </div>
            )}
          </form>
        </div>
      </React.Fragment>
    );
  }
}
