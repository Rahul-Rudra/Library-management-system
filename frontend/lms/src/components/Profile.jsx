import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
class Profile extends Component {
  //  state = {  }

  render() {
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    //const w = "max-width: 18rem";
    return (
      <Fragment>
        <NavBar />
        <div class="card border-success mb-3" style={{ width: "18rem" }}>
          <div class="card-body text-success">
            <h5 class="card-title">User-Profile</h5>
            <p class="card-text">
              Name : <span style={{ color: "red" }}>{name}</span>
            </p>
            <p>
              Id : <span style={{ color: "red" }}>{id}</span>
            </p>
            <p>
              Role : <span style={{ color: "red" }}>{role}</span>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
