// ** create-user.component.js ** //

import React, { Component } from "react";
import axios from "axios";
import book from "../book.json";
import user from "../user.json";
import issue from "../Issue.json";
import Action from "../Action.json";

import "bootstrap/dist/css/bootstrap.css";

import NavBar from "../components/NavBar";

export default class Issue extends Component {
  constructor(props) {
    super(props);

    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeISBN = this.onChangeISBN.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      book_info: {
        id: "",
        title: "",
        ISBN: "",
        stock: "",
        author: "",
      },
      user_id: {
        u_id: "",
        name: "",
      },
    };
  }

  onChangeId(e) {
    this.setState({ id: e.target.value });
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangeISBN(e) {
    this.setState({ ISBN: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      book_info: {
        id: book._id,
        title: book.title,
        ISBN: book.ISBN,
        stock: book.stock,
        author: book.author,
      },
      user_id: {
        u_id: user._id,
        name: user.name,
      },
    };

    axios
      .post("http://localhost:7500/book/:book_id/issue/:user_id", userObject)
      .then((res) => {
        console.log(res.data);
        return this.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      id: "",
      title: "",
      ISBN: "",
      stock: " ",
      author: "",
      name: "",
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="wrapper m-5 ">
          <form onSubmit={this.onSubmit}>
            <div className="form-group m-3">
              <label forhtml="id">Id</label>
              <input
                autoFocus
                type="text"
                id="id"
                placeholder="Id"
                value={this.state.id}
                onChange={this.onChangeId}
                className="form-control"
              />
            </div>
            <div className="form-group m-3">
              <label forhtml="title">Title</label>
              <input
                autoFocus
                type="text"
                id="title"
                placeholder="title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                className="form-control"
              />
            </div>
            <div className="form-group m-3 ">
              <label forhtml="ISBN">ISBN</label>
              <input
                autoFocus
                type="text"
                id="ISBN"
                placeholder="ISBN"
                value={this.state.ISBN}
                onChange={this.onChangeISBN}
                className="form-control"
              />
            </div>
            <div className="form-group m-3">
              <input type="submit" value="Issue" className="btn btn-success" />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
