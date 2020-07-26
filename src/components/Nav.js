import React from "react";
import { Link } from "react-router-dom";
import bball from "../images/b-ball.png";
import dummyProfile from "../images/profile-dummy.png";

export default function Nav(props) {
  return (
    <div id="content-wrap">
      <nav class="navbar navbar-expand-lg navbar-custom navbar-light bg-light ">
        <div className="collapsed-nav">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <Link to={props.loggedInUser ? "/user-main" : "/"}>
            <img
              src={bball}
              width="30"
              height="30"
              class="d-inline-block align-top bball-nav"
              alt=""
            ></img>
          </Link>
          <p className="hoopItApp">hoop.it.App</p>
        </div>

        {props.loggedInUser ? (
          !props.loggedInUser.imageUrl ? (
            <Link to="/profile">
              <img
                className="profileImage pull-right"
                src={dummyProfile}
                alt="Profile Dummy"
              ></img>
            </Link>
          ) : (
            <Link to="/profile">
              <img
                className="profileImage  pull-right"
                src={
                  !props.loggedInUser
                    ? dummyProfile
                    : props.loggedInUser.imageUrl
                }
                alt="Profile"
              ></img>
            </Link>
          )
        ) : null}

        {props.loggedInUser ? (
          <div
            class="collapse navbar-collapse  justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav navbar-brand items">
              <li class="nav-item">
                <Link className="nav-link " to="/team-info">
                  Teams
                </Link>
              </li>

              <li class="nav-item">
                <button className="logout" onClick={props.onLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div
            class="collapse navbar-collapse justify-content-end "
            id="navbarNav"
          >
            <ul class="navbar-nav nav-content ">
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign-up">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
