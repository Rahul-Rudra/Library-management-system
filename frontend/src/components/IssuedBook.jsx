import React, { Component } from "react";
import Issue from "../Issue.json";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./Pagination";
import { Paginate } from "./util/Paginate";
import { Link } from "react-router-dom";
//import Toggle from "./Toggle";
import NavBar from "./NavBar";
//import Register from "./Register";

class IssuedBook extends Component {
  state = {
    Issue: [],
    currentPage: 1,
    pageSize: 5,
    count: 0,
    //checked: false,
    // isEnable: true,
  };
  componentDidMount() {
    axios
      .get("/api/issued/books")
      .then((response) => {
        //this.state.movie = response.data;
        this.setState({ Issue: response.data });
        console.log(Issue);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  /* deleteUser = (id) => {
    axios.delete(`http://localhost:7500/api/users/${id}`).then((res) => {
      const users = this.state.user.filter((c) => c._id !== id);
      this.setState({ user: users });
    });
  };
*/
  ///editUser = (id) => {};
  /*  disableUser = (id) => {
    axios.put(`http://localhost:9500/api/users/${id}`).then((res) => {
      //console.log(res.data);
      return this.props.history.push("/login");
      //this.setState({ count: this.state.count + 1 });
    });
  };
*/
  //componentDidMount(){}
  control = (id) => {
    this.setState({ count: this.state.count + 1 });
    // return this.state.count;
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage, Issue: allIssue } = this.state;
    const Issue = Paginate(allIssue, currentPage, pageSize);
    return (
      <div className="App">
        <React.Fragment>
          <NavBar />
          <table className="table table-bordered table-hover table-lg w-40 p-3 m-5">
            <thead>
              <tr>
                <th>Book_Title</th>
                <th>IssueDate</th>
                <th>UserName</th>
              </tr>
            </thead>
            <tbody>
              {Issue.map((u, i) => {
                const d = u.book_info.issueDate.split("T");

                return (
                  <tr key={i}>
                    <td>{u.book_info.title}</td>

                    <td>{d[0]}</td>
                    <td>{u.user_id.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            itemsCount={this.state.Issue.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default IssuedBook;
