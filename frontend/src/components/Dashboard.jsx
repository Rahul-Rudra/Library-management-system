import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import axios from "axios";
class Dashboard extends Component {
  state = {
    message3: [],
    message1: [],
    message2: [],
  };

  getall = () => {
    axios
      .get("/api/messages")
      .then((response) => {
        //this.state.movie = response.data;

        this.setState({ message3: [...response.data] });
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidUpdate() {
    axios
      .get("/api/messages/allowed")
      .then((response) => {
        //this.state.movie = response.data;

        this.setState({ message1: [...response.data] });
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getall();
    axios
      .get("/api/messages/rejected")
      .then((response) => {
        //this.state.movie = response.data;

        this.setState({ message2: [...response.data] });
        // console.log(response.data);
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
                Pending
                <span className="badge badge-light">
                  {this.state.message3.length}
                </span>
                <span className="sr-only">unread messages</span>
              </button>
            </Link>
            <Link to="/allowedmessages">
              <button type="button" className="btn btn-success m-2">
                Allowed
                <span className="badge badge-light">
                  {this.state.message1.length}
                </span>
                <span className="sr-only">unread messages</span>
              </button>
            </Link>
            <Link to="/rejectedmessages">
              <button type="button" className="btn btn-secondary m-2">
                Reject
                <span className="badge badge-light">
                  {this.state.message2.length}
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
