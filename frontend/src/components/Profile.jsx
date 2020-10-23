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

        <div className="card bg-light mb-3" style={{ width: 300 }}>
          <img className="card-img-top " src="p.png" alt="p.png" />
          <div className="card-body text">
            <h4 className="card-text">
              Name : <span style={{ color: "black" }}>{name}</span>
            </h4>
            <h4>
              Id : <span style={{ color: "black" }}>{id}</span>
            </h4>
            <h4>
              Role : <span style={{ color: "black" }}>{role}</span>
            </h4>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
