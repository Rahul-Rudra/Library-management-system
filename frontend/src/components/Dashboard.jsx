import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import axios from "axios";
class Dashboard extends Component {
  state = {
    message: [],
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
  render() {
    return (
      <Fragment>
        <NavBar />

        <div class="card">
          <div class="card-header">Notification</div>
          <div class="card-body">
            <h5 class="card-title">Requested Book</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <Link to="/messages">
              <button type="button" className="btn btn-primary m-2">
                Message
                <span className="badge badge-light">
                  {this.state.message.length}
                </span>
                <span className="sr-only">unread messages</span>
              </button>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
