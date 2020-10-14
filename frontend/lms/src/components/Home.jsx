import React, { Fragment } from "react";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <Fragment>
      <NavBar />
      <div className="card-columns">
        <div className="card bg-info m-3" style={{ width: 400 }}>
          <img className="card-img-top " src="abc.jpeg" alt="Card image" />
          <div className="card-body">
            <h4 className="card-title">Nodejs</h4>
            {/*<p className="card-text">Some example text.</p>
          <a href="#" className="btn btn-primary">
            See Profile
  </a>*/}
          </div>
        </div>
        <div className="card bg-danger m-3" style={{ width: 400 }}>
          <img className="card-img-top " src="abc.jpeg" alt="Card image" />
          <div className="card-body">
            <h4 className="card-title">Reactjs</h4>
            {/*<p className="card-text">Some example text.</p>
          <a href="#" className="btn btn-primary">
            See Profile
  </a>*/}
          </div>
        </div>
        <div className="card bg-success m-3" style={{ width: 400 }}>
          <img className="card-img-top " src="abc.jpeg" alt="Card image" />
          <div className="card-body">
            <h4 className="card-title">Express</h4>
            {/*<p className="card-text">Some example text.</p>
          <a href="#" className="btn btn-primary">
            See Profile
  </a>*/}
          </div>
        </div>
      </div>
      <div className="card-columns">
        <div className="card bg-info m-3" style={{ width: 400 }}>
          <img className="card-img-top " src="abc.jpeg" alt="Card image" />
          <div className="card-body">
            <h4 className="card-title">Nodejs</h4>
            {/*<p className="card-text">Some example text.</p>
          <a href="#" className="btn btn-primary">
            See Profile
  </a>*/}
          </div>
        </div>
        <div className="card bg-danger m-3" style={{ width: 400 }}>
          <img className="card-img-top " src="abc.jpeg" alt="Card image" />
          <div className="card-body">
            <h4 className="card-title">Reactjs</h4>
            {/*<p className="card-text">Some example text.</p>
          <a href="#" className="btn btn-primary">
            See Profile
  </a>*/}
          </div>
        </div>
        <div className="card bg-success m-3" style={{ width: 400 }}>
          <img className="card-img-top " src="abc.jpeg" alt="Card image" />
          <div className="card-body">
            <h4 className="card-title">Express</h4>
            {/*<p className="card-text">Some example text.</p>
          <a href="#" className="btn btn-primary">
            See Profile
  </a>*/}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
