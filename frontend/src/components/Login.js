// ** create-user.component.js ** //

import React, { Component } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { json } from "body-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/api/auth", userObject)
      .then((res) => {
        //console.log(res.data.id);
        localStorage.setItem("login", JSON.stringify(res));
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("name", res.data.name);

        //const a = localStorage.getItem("role");
        console.log(res.data.id);
        //alert()
        // console.log(a === "superAdmin");
        //console.log(JSON.stringify(res.data.id));
        return this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error.msg);
        alert(error.errors);
      });

    this.setState({ email: "", password: "" });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="wrapper m-5 ">
          <form onSubmit={this.onSubmit}>
            <div className="form-group m-3">
              <label forhtml="email">Email</label>
              <input
                autoFocus
                autoComplete
                required
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
                autoComplete
                required
                type="password"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}
                className="form-control"
              />
            </div>
            <div className="form-group m-3">
              <input type="submit" value="Login" className="btn btn-success" />
            </div>
            <div>
              <Link to="/forget-password">Forget Password</Link>
              <hr /> New_User ?<Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
