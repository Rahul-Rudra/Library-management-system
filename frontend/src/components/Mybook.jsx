import React, { Component } from "react";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./Pagination";
import { Paginate } from "./util/Paginate";

//import Toggle from "./Toggle";
import NavBar from "./NavBar";

class Mybook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mybook: [],
      currentPage: 1,
      pageSize: 4,
      count: 0,
      //checked: false,
      // isEnable: true,
    };
  }
  componentDidMount() {
    const id = localStorage.getItem("id");
    //console.log(id);
    axios
      .get(`/api/users/mybooks/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ mybook: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  control = (id) => {
    this.setState({ count: this.state.count + 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage, mybook: allmybook } = this.state;
    const mybook = Paginate(allmybook, currentPage, pageSize);
    return (
      <div className="App">
        <React.Fragment>
          <NavBar />
          <table className="table table-bordered table-hover table-lg w-30 p-2 m-3">
            <thead>
              <tr className="table-success">
                <th scope="col">Book_Name</th>
                <th>IssueDate</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {mybook.map((u, i) => {
                const d = u.book_info.issueDate.split("T");
                const d1 = u.book_info.returnDate.split("T");
                return (
                  <tr key={i}>
                    <td>{u.book_info.title}</td>
                    <td>{d[0]}</td>
                    <td>{d1[0]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            itemsCount={this.state.mybook.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default Mybook;
