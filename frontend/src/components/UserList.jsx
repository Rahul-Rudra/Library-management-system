import React, { Component } from "react";
import user from "../user.json";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./Pagination";
import { Paginate } from "./util/Paginate";
import { Link } from "react-router-dom";
//import Toggle from "./Toggle";
import NavBar from "./NavBar";
//import Register from "./Register";
import swal from "sweetalert2";
import _ from "lodash";
import { FcDown, FcUp } from "react-icons/fc";
class UserList extends Component {
  state = {
    user: [],
    currentPage: 1,
    pageSize: 4,
    count: 0,
    sortColumn: { path: "name", order: "asc" },
    //checked: false,
    // isEnable: true,
  };

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
  //Button Click Function

  componentDidMount() {
    axios
      .get("/api/users")
      .then((response) => {
        //this.state.movie = response.data;
        this.setState({ user: response.data });
        console.log(user);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteUser = (id) => {
    // this.opensweetalertdanger();
    axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        const users = this.state.user.filter((c) => c._id !== id);
        this.setState({ user: users });
        swal.fire(" successfully Deleted");
      })
      .catch((error) => {
        swal.fire("Something went wrong");
      });
  };

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
  render() {
    const { pageSize, currentPage, user: alluser, sortColumn } = this.state;
    const sorted = _.orderBy(alluser, [sortColumn.path], [sortColumn.order]);
    const user = Paginate(sorted, currentPage, pageSize);
    return (
      <div className="App">
        <React.Fragment>
          <NavBar />
          <table className="table table-bordered table-hover table-lg w-20 p-2 m-3">
            <thead>
              <tr className="table-warning">
                <th scope="col" onClick={() => this.sortBy("name")}>
                  Name {sortColumn.order === "asc" ? <FcUp /> : <FcDown />}
                </th>
                <th>Email</th>
                <th>Role</th>
                <th scope="col">Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {user.map((u, i) => {
                return (
                  <tr key={i}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>

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
                    <td>
                      <Link to={`/edit/${u._id}`}>
                        <button
                          type="button"
                          className="btn btn-success float-right"
                        >
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            itemsCount={this.state.user.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default UserList;
