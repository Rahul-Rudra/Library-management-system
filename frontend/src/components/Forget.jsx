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
    };
  }

  onChangeEmail(e) {
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
        // localStorage.setItem("forget", JSON.stringify(res));
        //return this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Email not exists or enter a correct email");
      });

    this.setState({ email: "" });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <div className="wrapper m-5 ">
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

            <div className="form-group m-3">
              <input type="submit" value="send" className="btn btn-success" />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
