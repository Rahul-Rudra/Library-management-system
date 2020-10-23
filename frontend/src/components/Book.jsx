import React, { Component } from "react";
import { Link } from "react-router-dom";

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
import book from "../book.json";
import _ from "lodash";
import swal from "sweetalert2";
import { FcDown, FcUp } from "react-icons/fc";
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
    s1: "btn btn-primary float-right",
    e: "",
    pos: 0,
    d: false,
    disabled: [],
    sortColumn: { path: "title", order: "asc" },
    //checked: false,
    // isEnable: true,
  };
  sortBy = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
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

  RequestBook = (book_id, i) => {
    // this.disable();
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

        this.setState({ disabled: [...this.state.disabled, book_id] });
        console.log(this.state.disabled);

        return this.props.history.push("/books");
        //res.data.st === 0 ? toast("Stock is zero") : "";
      })
      .catch((error) => {
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
        res.data.issue === null || res.data.c !== res.data.book_id
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
  handleDelete = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "grey",
        confirmButtonText: "Yes,delete it!",
      })
      .then((result) => {
        if (result.value) {
          this.deleteUser(id);
        }
      });
  };
  deleteUser = (id) => {
    // this.opensweetalertdanger();
    axios
      .delete(`/api/books/${id}`)
      .then((res) => {
        const books = this.state.books.filter((c) => c._id !== id);
        this.setState({ book: books });
        swal.fire(" successfully Deleted");
      })
      .catch((error) => {
        swal.fire("Something went wrong");
      });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage, book: allbook, sortColumn } = this.state;

    const sorted = _.orderBy(allbook, [sortColumn.path], [sortColumn.order]);
    const book = Paginate(sorted, currentPage, pageSize);
    //const searchData = Paginate(sorted1, currentPage, pageSize);
    //const { user } = this.state;
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
                <tr className="table-warning">
                  <th scope="col">Title</th>
                  <th>ISBN</th>
                  <th>Stock</th>
                  <th>Author</th>
                  <th scope="col">Issue</th>
                  <th>Return</th>
                  <th>Renew</th>
                  {localStorage.getItem("role") === "superAdmin" ? (
                    <th>Delete</th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {this.state.searchData.map((u, i) => {
                  const id = localStorage.getItem("id");
                  return (
                    <tr key={i}>
                      <td>{u.title}</td>
                      <td>{u.ISBN}</td>
                      <td>{u.stock}</td>
                      <td>{u.author}</td>

                      <td>
                        <button
                          type="button"
                          // disabled={this.state.d}
                          //className={this.state.s1}
                          disabled={
                            this.state.disabled.indexOf(u._id) !== -1 ||
                            u.stock === 0
                          }
                          onClick={() => {
                            this.RequestBook(u._id);
                          }}
                          className={
                            u.userId.includes(id)
                              ? "btn btn-primary float-right disabled"
                              : this.state.s
                          }
                        >
                          Request
                        </button>
                      </td>

                      <td>
                        <button
                          type="button"
                          disabled={u.userId.includes(id) ? "false" : "true"}
                          className={
                            u.userId.includes(id)
                              ? this.state.s1
                              : "btn btn-primary float-right disabled"
                          }
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
                          disabled={u.userId.includes(id) ? "false" : "true"}
                          className={
                            u.userId.includes(id)
                              ? this.state.s1
                              : "btn btn-primary float-right disabled"
                          }
                          onClick={() => {
                            this.RenewBook(u._id);
                          }}
                        >
                          Renew
                        </button>
                      </td>
                      {localStorage.getItem("role") === "superAdmin" ? (
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger float-right"
                            onClick={() => {
                              this.handleDelete(u._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="table table-bordered table-hover table-lg  p-1 mt-2">
              <thead>
                <tr className="table-warning">
                  <th scope="col" onClick={() => this.sortBy("title")}>
                    Title{sortColumn.order === "asc" ? <FcUp /> : <FcDown />}
                  </th>
                  <th>ISBN</th>
                  <th onClick={() => this.sortBy("stock")}>
                    Stock {sortColumn.order === "asc" ? <FcUp /> : <FcDown />}
                  </th>
                  <th onClick={() => this.sortBy("author")}>
                    Author{sortColumn.order === "asc" ? <FcUp /> : <FcDown />}
                  </th>
                  <th scope="col">Issue</th>
                  <th>Return</th>
                  <th>Renew</th>
                  {localStorage.getItem("role") === "superAdmin" ? (
                    <th>Delete</th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {book.map((u, i) => {
                  //this.setState({ s: "btn btn-primary float-right" });
                  const id = localStorage.getItem("id");
                  return (
                    <tr key={i}>
                      <td>{u.title}</td>
                      <td>{u.ISBN}</td>
                      <td>{u.stock}</td>
                      <td>{u.author}</td>

                      <td>
                        <button
                          key={u._id}
                          type="button"
                          disabled={
                            this.state.disabled.indexOf(u._id) !== -1 ||
                            u.stock === 0
                          }
                          className={
                            u.userId.includes(id)
                              ? "btn btn-primary float-right disabled"
                              : this.state.s
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
                          //className={this.state.s}
                          disabled={u.userId.includes(id) ? "false" : "true"}
                          onClick={() => {
                            this.ReturnBook(u._id);
                          }}
                          className={
                            u.userId.includes(id)
                              ? this.state.s1
                              : "btn btn-primary float-right disabled"
                          }
                        >
                          Return
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          disabled={u.userId.includes(id) ? "false" : "true"}
                          className={
                            u.userId.includes(id)
                              ? this.state.s1
                              : "btn btn-primary float-right disabled"
                          }
                          onClick={() => {
                            this.RenewBook(u._id);
                          }}
                        >
                          Renew
                        </button>
                      </td>
                      {localStorage.getItem("role") === "superAdmin" ? (
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger float-right"
                            onClick={() => {
                              this.handleDelete(u._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      ) : (
                        ""
                      )}
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
