import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import { Paginate } from "./util/Paginate";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
class Message extends Component {
  state = {
    message: [],
    issue: [],
    pageSize: 10,
    count: 0,
    currentPage: 1,
  };

  componentDidMount() {
    axios
      .get("/api/messages")
      .then((response) => {
        //this.state.movie = response.data;

        this.setState({ message: [...response.data] });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  IssueBook = (book_id, u_id) => {
    const user_id = localStorage.getItem("id");

    //console.log(user_id);
    axios
      .post(`/api/book/${book_id}/issue/${user_id}`)
      .then((res) => {
        //const users = this.state.user.filter((c) => c._id !== book_id);
        console.log(res.data);

        //this.setState((this.state.pos = 1));
        // this.state.bool = false;
        this.setState({ issue: res.data });
        this.CancelBook(u_id);
        return this.props.history.push("/dashboard");
        //res.data.st === 0 ? toast("Stock is zero") : "";
      })
      .catch((error) => {
        //const msg = "you can not isssue more than 5 books";
        console.log(error);
        //toast.error(msg);
      });
  };

  CancelBook = (id) => {
    axios.delete(`/api/messages/${id}`).then((res) => {
      const message = this.state.message.filter((c) => c._id !== id);
      this.setState({ message: message });
    });
  };

  render() {
    const { pageSize, currentPage, message: allmessage } = this.state;
    const message = Paginate(allmessage, currentPage, pageSize);
    return (
      <Fragment>
        <NavBar />
        <table className="table table-bordered table-hover table-lg  p-2 m-2">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th>ISBN</th>
              <th>UserName</th>
              <th>Message</th>
              <th>Allow</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {message.map((u, i) => {
              return (
                <tr key={i}>
                  <td scope="row">{u.book_info.title}</td>
                  <td>{u.book_info.ISBN}</td>

                  <td>{u.user_id.name}</td>
                  <td>{u.text}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-primary float-right"
                      onClick={() => {
                        this.IssueBook(u.book_info.id, u._id);
                      }}
                    >
                      Allow
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary float-right"
                      onClick={() => {
                        this.CancelBook(u._id);
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        )
        <Pagination
          itemsCount={this.state.message.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </Fragment>
    );
  }
}

export default Message;
