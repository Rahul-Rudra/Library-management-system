// ** create-user.component.js ** //

import React, { Component } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { toast, ToastContainer } from "react-toastify";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      alert_message: "",
      errors: {
        email: "",
      },
    };
  }

  onChangeEmail(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.email =
      this.state.email === " " || value.length < 3
        ? "email must contain 3 character"
        : "";
    let apos = value.indexOf("@");
    let dotpos = value.lastIndexOf(".");
    if (apos < 1 || dotpos - apos < 2) {
      errors.email = "please enter a valid email id";
    }
    this.setState({ email: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      email: this.state.email,
    };

    axios
      .post("/forget-password", userObject)
      .then((res) => {
        console.log(res.data.msg);
        toast.success(res.data);
        this.setState({
          alert_message: "success",
        });
        // localStorage.setItem("forget", JSON.stringify(res));
        //return this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          alert_message: "error",
        });
        // alert("Email not exists or enter a correct email");
      });

    this.setState({ email: "" });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <div className="wrapper m-5 ">
          {this.state.alert_message === "succes" ? (
            <div className="alert alert-success" role="alert">
              Email has been sent to your email id
            </div>
          ) : (
            ""
          )}
          {this.state.alert_message === "error" ? (
            <div className="alert alert-danger" role="alert">
              Enter a correct email id
            </div>
          ) : (
            ""
          )}
          <form onSubmit={this.onSubmit}>
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
            {this.state.errors.email ? (
              <div className="alert alert-danger m-1" role="alert">
                {this.state.errors.email}
              </div>
            ) : (
              ""
            )}

            <div className="form-group m-3">
              <input type="submit" value="send" className="btn btn-success" />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
