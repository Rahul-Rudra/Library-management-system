import React, { Component } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkDate: "",
      email: "",
      password: "",
      confirm_password: "",
      errors: {},
    };
  }
  componentDidMount() {
    let slugParam = this.props.match.params.slug;
    let splitSlug = slugParam.split("+++");
    let reqDate = splitSlug[0];
    let email = splitSlug[1];
    let token = splitSlug[2];
    console.log(reqDate);
    console.log(email);
    this.setState({ email: email, linkDate: reqDate, token: token });
    let date1 = new Date(reqDate);
    let currentDate = new Date();
    console.log(date1);
    console.log(currentDate);
    let differenceinMS = currentDate - date1;
    if (differenceinMS > 36000) {
      alert(
        "Link Not Valid link will be valid for 30 min.Please sent the reset link Again"
      );
      this.props.history.push("/login");
    }
  }
  handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleForm = (e) => {
    e.preventDefault();
    if (this.state.email === "") {
      alert("Email is Required");
      return false;
    }
    // const data = { email: this.state.email, };
    // console.log(data)
    axios
      .post("http://localhost:7500/forget-password/updatePassword", this.state)
      .then((result) => {
        alert(result.data.msg);
        console.log(result.data.msg);
        return this.props.history.push("/login");
      })
      .catch((err) => {
        if (err.response && err.response.status === 404)
          alert(err.response.data.msg);
        else alert("Something Went Wrong");
        this.setState({ errors: err.response });
      });
  };
  render() {
    return (
      <div className="content">
        <form onSubmit={this.handleForm}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-header text-center">Reset Password</div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInput}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={this.state.confirm_password}
                      onChange={this.handleInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="card-footer text-center">
                  <input
                    type="button"
                    value="Reset"
                    onClick={this.handleForm}
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </form>
      </div>
    );
  }
}
