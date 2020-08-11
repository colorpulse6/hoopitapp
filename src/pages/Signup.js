import React from "react";
import bball from "../images/b-ball.png";
import nextButton from "../images/next-button.png";
import SearchCity from "../components/SearchCity";

export default function Signup(props) {
  return (
    <div className="page-containers">
      <form onSubmit={props.onSignUp} className="form-container">
        <img className="bball" src={bball} alt="Bball"></img>
        <h2 className="second-font">Join hoop.it.App</h2>
        <div className="form-group">
          <label htmlFor="exampleInputUsername" className="second-font">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            name="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="second-font">
            Email address
          </label>
          <input
            type="email"
            className="form-control input"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUsername" className="second-font">
            City
          </label>

          <div >
            <SearchCity panTo={props.handleLocationInput} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="second-font">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control input"
            id="exampleInputPassword1"
          />
          <p style={{ fontSize: "7.8px", marginBottom: "-5px" }}>
            Password must be 8 characters and include a number and an uppercase
            letter
          </p>
        </div>
        <button type="submit" className="card-buttons">
          Sign Up <img className="next-button" src={nextButton} alt="Next"></img>
        </button>
      </form>
      {props.error ? (
        <div
          className="text-danger"
          style={{ marginLeft: "5px", marginTop: "10px" }}
        >
          {props.error}
        </div>
      ) : null}
    </div>
  );
}
