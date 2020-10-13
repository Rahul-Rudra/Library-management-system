import React, { Component } from "react";
import activity from "../Action.json";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./Pagination";
import { Paginate } from "./util/Paginate";
import { Link } from "react-router-dom";
//import Toggle from "./Toggle";
import NavBar from "./NavBar";
//import Register from "./Register";

class Activity extends Component {
  state = {
    activity: [],
    currentPage: 1,
    pageSize: 5,
    count: 0,
    //checked: false,
    // isEnable: true,
  };
  componentDidMount() {
    axios
      .get("http://localhost:7500/api/activitys")
      .then((response) => {
        //this.state.movie = response.data;
        this.setState({ activity: response.data });
        console.log(activity);
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
    const { pageSize, currentPage, activity: allactivity } = this.state;
    const activity = Paginate(allactivity, currentPage, pageSize);
    return (
      <div className="App">
        <React.Fragment>
          <NavBar />
          <table className="table table-bordered table-hover table-lg w-40 p-3 m-5">
            <thead>
              <tr>
                <th scope="col">Book_id</th>
                <th>Book_Title</th>
                <th>IssueDate</th>
                <th>ReturnDate</th>
                <th>UserName</th>
                <th>User_id</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((u, i) => {
                return (
                  <tr key={i}>
                    <td scope="row">{u.info.id}</td>
                    <td>{u.info.title}</td>
                    <td>{u.time.issueDate}</td>
                    <td>{u.time.returnDate}</td>
                    <td>{u.user_id.id}</td>
                    <td>{u.user_id.name}</td>
                    <td>{u.category}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            itemsCount={this.state.activity.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default Activity;
