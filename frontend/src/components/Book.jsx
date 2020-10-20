import React, { Component } from "react";
import { Link } from "react-router-dom";
import book from "../book.json";
import Issue from "../Issue.json";
import searchData from "../searchData.json";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./Pagination";
import { Paginate } from "./util/Paginate";
import { ToastContainer, toast } from "react-toastify";
//import Toggle from "./Toggle";
import NavBar from "./NavBar";
import "react-toastify/dist/ReactToastify.css";
//import { response } from "express";
//import user from "../../../controllers/user";

class Book extends Component {
  state = {
    book: [],
    Issue: [],
    user: [
      {
        bookIssueInfo: [],
      },
    ],
    searchData: null,
    currentPage: 1,
    message: [],
    pageSize: 10,
    count: 0,
    bool: "true",
    s: "btn btn-primary float-right",
    e: "btn btn-primary float-right disabled",
    pos: 0,
    //checked: false,
    // isEnable: true,
  };
  componentDidMount() {
    //this.search();
    axios
      .get("/api/books")
      .then((response) => {
        //this.state.movie = response.data;

        this.setState({ book: [...response.data] });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  search(key) {
    axios
      .get("/api/books/searchbyname?title=" + key)
      .then((response) => {
        //this.state.movie = response.data;

        this.setState({ searchData: response.data });

        console.log(searchData);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //updateUser = (id) => {};
  /*  disableUser = (id) => {
    axios.put(`http://localhost:9500/api/books/${id}`).then((res) => {
      //console.log(res.data);
      return this.props.history.push("/login");
      //this.setState({ count: this.state.count + 1 });
    });
  };
*/

  RequestBook = (book_id) => {
    const user_id = localStorage.getItem("id");

    //console.log(user_id);
    axios
      .post(`/api/messages/book_id/${book_id}/user_id/${user_id}`)
      .then((res) => {
        //const users = this.state.user.filter((c) => c._id !== book_id);
        console.log(res.data);

        //this.setState((this.state.pos = 1));
        // this.state.bool = false;

        res.data.len === 5 || res.data.st === 0
          ? toast.warning(
              "You can not access more than 5 books or stock is zero"
            )
          : toast.success("successfully requested by you");
        this.setState({ message: res.data });

        return this.props.history.push("/books");
        //res.data.st === 0 ? toast("Stock is zero") : "";
      })
      .catch((error) => {
        const msg = "you can not isssue more than 5 books";
        console.log(error);
        //toast.error(msg);
      });
  };

  ReturnBook = (book_id) => {
    const id = localStorage.getItem("id");

    //console.log(user_id);
    axios
      .post(`/api/return/book_id/${book_id}/user_id/${id}`)
      .then((res) => {
        //const users = this.state.user.filter((c) => c._id !== book_id);
        console.log(res.data.c);
        this.setState({ Issue: res.data.issue });
        //this.setState({ book: res.data.book });
        // this.state.bool = false;
        res.data.issue === null || res.data.c != res.data.book_id
          ? toast.error(
              "You can not return this book first issue the book then only you can return"
            )
          : toast.success("successfully return by you");

        return this.props.history.push("/books");
      })
      .catch((error) => {
        console.log(error);
        const msg =
          "You did not issued this book so first issue then only you can return";
        toast.error(msg);
      });
  };
  RenewBook = (id) => {
    const user_id = localStorage.getItem("id");

    //console.log(user_id);
    axios
      .post(`/api/renew/book_id/${id}/user_id/${user_id}`)
      .then((res) => {
        //const users = this.state.user.filter((c) => c._id !== book_id);
        console.log(res.data);
        this.setState({ Issue: res.data });
        //this.state.bool = false;
        res.data.msg
          ? toast.error(res.data.msg)
          : toast.success("successfully renew by you");
      })
      .catch((error) => {
        console.log(error);
        const msg =
          "You did not issued this book so first issue then only you can renew";
        toast.error(msg);
      });
  };

  control = (id) => {
    this.setState({ count: this.state.count + 1 });
    // return this.state.count;
  };
  /*
  getUserWithBookId = (id) => {
    axios.get(`/api/users/book_id/:${id}`).then((response) => {
      console.log(response.data);
      if (response.data) {
        this.setState({ s: "btn btn-primary float-right" });
        console.log(this.state.s);
      } else {
        this.setState({ s: "btn btn-primary float-right disabled" });
      }
    });
  };*/
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage, book: allbook } = this.state;
    const book = Paginate(allbook, currentPage, pageSize);
    const { user } = this.state;
    return (
      <div className="App">
        <React.Fragment>
          <ToastContainer />
          <NavBar />
          {localStorage.getItem("login") &&
          localStorage.getItem("role") === "superAdmin" ? (
            <Link to="/addbooks">
              <input
                type="submit"
                value="AddBook"
                className="btn btn-info mt-2"
              />
            </Link>
          ) : (
            ""
          )}
          <hr />
          <h3>Search</h3>
          <input
            type="text"
            placeholder="Book Name"
            className="form-control-sm ml-5"
            onChange={(event) => this.search(event.target.value)}
          ></input>

          {this.state.searchData ? (
            <table className="table table-bordered table-hover table-lg  p-2 m-2">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th>ISBN</th>
                  <th>Stock</th>
                  <th>Author</th>
                  <th scope="col">Issue</th>
                  <th>Return</th>
                  <th>Renew</th>
                </tr>
              </thead>
              <tbody>
                {this.state.searchData.map((u, i) => {
                  return (
                    <tr key={i}>
                      <td scope="row">{u.title}</td>
                      <td>{u.ISBN}</td>
                      <td>{u.stock}</td>
                      <td>{u.author}</td>

                      <td>
                        <button
                          type="button"
                          className={
                            u.stock !== 0
                              ? "btn btn-primary float-right"
                              : "btn btn-primary float-right disabled"
                          }
                          onClick={() => {
                            this.RequestBook(u._id);
                          }}
                        >
                          Request
                        </button>
                      </td>

                      <td>
                        <button
                          type="button"
                          className={this.state.s}
                          onClick={() => {
                            this.ReturnBook(u._id);
                          }}
                        >
                          Return
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={this.state.s}
                          onClick={() => {
                            this.RenewBook(u._id);
                          }}
                        >
                          Renew
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="table table-bordered table-hover table-lg  p-2 m-2">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th>ISBN</th>
                  <th>Stock</th>
                  <th>Author</th>
                  <th scope="col">Issue</th>
                  <th>Return</th>
                  <th>Renew</th>
                </tr>
              </thead>
              <tbody>
                {this.state.book.map((u, i) => {
                  return (
                    <tr key={i}>
                      <td scope="row">{u.title}</td>
                      <td>{u.ISBN}</td>
                      <td>{u.stock}</td>
                      <td>{u.author}</td>

                      <td>
                        <button
                          type="button"
                          className={
                            u.stock !== 0
                              ? "btn btn-primary float-right"
                              : "btn btn-primary float-right disabled"
                          }
                          onClick={() => {
                            this.RequestBook(u._id);
                          }}
                        >
                          Request
                        </button>
                      </td>

                      <td>
                        <button
                          type="button"
                          className={this.state.s}
                          onClick={() => {
                            this.ReturnBook(u._id);
                          }}
                        >
                          Return
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={this.state.s}
                          onClick={() => {
                            this.RenewBook(u._id);
                          }}
                        >
                          Renew
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <Pagination
            itemsCount={this.state.book.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default Book;
