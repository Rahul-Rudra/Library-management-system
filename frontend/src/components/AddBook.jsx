// ** create-user.component.js ** //

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import NavBar from "../components/NavBar";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeISBN = this.onChangeISBN.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      ISBN: "",
      stock: "",
      author: "",
      errors: {
        title: "",
        ISBN: "",
        stock: "",
        author: "",
      },
    };
  }

  onChangeTitle(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.title =
      value.length < 3
        ? "Title must contain between 3 to 10 character shoul be string "
        : "";
    this.setState({ title: e.target.value });
  }

  onChangeISBN(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.ISBN =
      value.length < 3 ? "name must contain atleast 6 character" : "";
    this.setState({ ISBN: e.target.value });
  }
  onChangeStock(e) {
    let value = e.target.value;
    let errors = this.state.errors;
    errors.stock =
      value.length < 3 ? "name must be a Integer and greater than 0" : "";
    this.setState({ stock: e.target.value });
  }
  onChangeAuthor(event) {
    let value = event.target.value;
    let errors = this.state.errors;
    errors.author = value.length < 3 ? "name must contain 3 character" : "";
    this.setState({ author: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userObject = {
      title: this.state.title,
      ISBN: this.state.ISBN,
      stock: this.state.stock,
      author: this.state.author,
    };

    axios
      .post("/api/books", userObject)
      .then((res, err) => {
        console.log(res.data);
        if (err) {
          alert("name is required and length must be more than 3");
        }

        return this.props.history.push("/books");
      })
      .catch((error) => {
        //console.log(error);
        alert(error);
      });

    this.setState({ title: "", ISBN: "", stock: "", author: "" });
  }

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <div className="wrapper m-5 ">
          <form onSubmit={this.onSubmit}>
            <div className="form-group m-3">
              <label forhtml="title">Title</label>
              <input
                autoFocus
                type="text"
                id="title"
                placeholder="Title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                className="form-control"
              />
              <p>
                <span style={{ color: "Pink" }}>{errors.title}</span>
              </p>
            </div>
            <div className="form-group m-3">
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
              <p>
                <span style={{ color: "Pink" }}>{errors.ISBN}</span>
              </p>
            </div>
            <div className="form-group m-3 ">
              <label forhtml="stock">Stock</label>
              <input
                autoFocus
                type="text"
                id="stock"
                placeholder="stock"
                value={this.state.stock}
                onChange={this.onChangeStock}
                className="form-control"
              />
              <p>
                <span style={{ color: "Pink" }}>{errors.stock}</span>
              </p>
            </div>
            <div className="form-group m-3">
              <label forhtml="author">Author</label>
              <input
                autoFocus
                type="text"
                id="author"
                placeholder="Author"
                value={this.state.author}
                onChange={this.onChangeAuthor}
                className="form-control"
              />
              <p>
                <span style={{ color: "Pink" }}>{errors.author}</span>
              </p>
            </div>
            <div className="form-group m-3">
              <input
                type="submit"
                value="ADD"
                className="btn btn-success mr-3"
              />
              <Link to="/books">
                <button className="btn btn-secondary">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
