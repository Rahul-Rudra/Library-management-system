import React, { Component, Fragment } from "react";
//import Pagination from "./Pagination";
//import { Paginate } from "./util/Paginate";
import searchData from "../searchData.json";
import axios from "axios";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchData: [],
    };
  }

  search(key) {
    axios
      .get("/api/books/searchbyname?name=" + key)
      .then((response) => {
        //this.state.movie = response.data;
        this.setState({ searchData: response.data });
        console.log(searchData);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Fragment>
        <input
          type="text"
          onChange={(event) => this.search(event.target.value)}
        ></input>
        <div>
          {this.state.searchData ? (
            <div>
              {this.state.searchData.map((u, i) => (
                <div>{u.title}</div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}

export default Search;
