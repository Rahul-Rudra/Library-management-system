import React, { Component } from "react";
class ErrorAlert extends Component {
  //  state = {  }
  render() {
    return (
      <div className="alert alert-danger " role="alert">
        Username or password is incorrect
      </div>
    );
  }
}

export default ErrorAlert;
