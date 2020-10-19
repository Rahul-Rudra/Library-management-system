// ** create-user.component.js ** //

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import NavBar from "../components/NavBar";
//import react from "react";

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    // this.Change = this.change.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //const id: this.props.match.params.id,
    this.state = {
      user: [],
      name: "",
      email: "",
      password: "",
      role: "user",
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

  componentWillMount() {
    this.getUserDetail();
  }
  getUserDetail = () => {
    const id = this.props.match.params.id;
    axios
      .get(`/api/users/${id}`)
      .then((res) => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
          role: res.data.role,
        });
        console.log(res.data);
        //return this.props.history.push("/users");
      })
      .catch((error) => {
        console.log(error);
      });

    // this.setState({ name: "", email: "", password: "" });
  };

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };
    //this.editUserDetail(userObject);

    const id = this.props.match.params.id;
    //console.log(id);
    axios
      .put(`/api/users/${id}`, userObject)
      .then((res) => {
        // console.log(res.data);
        alert("Successfully updated");
        return this.props.history.push("/users");
      })
      .catch((error) => {
        console.log(error);
      });

    //this.setState({ name: "", email: "", password: "" });
  }
  render() {
    return (
      <React.Fragment>
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
                type="text"
                id="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                className="form-control"
              />
            </div>
            <div className="form-group">
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
                value="Update"
                className="btn btn-success mr-3"
              />
              <Link to="/users">
                <button className="btn btn-secondary">Cancel</button>
              </Link>
            </div>
            <div></div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
