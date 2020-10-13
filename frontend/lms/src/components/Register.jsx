// ** create-user.component.js ** //

import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import NavBar from "../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    };
  }

  onChangeUser(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleChange(event) {
    this.setState({ role: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };

    axios
      .post("http://localhost:7500/api/users", userObject)
      .then((res) => {
        console.log(res.data);
        //alert(res.data.msg);
        alert("Successfully Register");
        return this.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("password must be atleast 6 character");
      });

    this.setState({ name: "", email: "", password: "" });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <div className="wrapper m-5 ">
          <form onSubmit={this.onSubmit}>
            <div className="form-group m-3">
              <label forhtml="name">UserName</label>
              <input
                autoFocus
                type="text"
                id="name"
                placeholder="UserName"
                value={this.state.name}
                onChange={this.onChangeUser}
                className="form-control"
              />
            </div>
            <div className="form-group m-3">
              <label forhtml="email">Email</label>
              <input
                autoFocus
                type="text"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                className="form-control"
              />
            </div>
            <div className="form-group m-3 ">
              <label forhtml="password">Password</label>
              <input
                autoFocus
                type="password"
                id="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                className="form-control"
              />
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
            <div className="form-group m-3">
              <input
                type="submit"
                value="Register"
                className="btn btn-success"
              />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
