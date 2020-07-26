import React from "react";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";

import nextButton from "../images/next-button.png";
import userImg from "../images/combined-shape-copy.png";
import group2 from "../images/group-2.png";

export default class Profile extends React.Component {
  state = {
    user: "",
  };

  componentDidMount() {
    axios
      .get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        // console.log(res + 'ResuLT')
        this.setState({
          user: res.data,
        });
      });
  }

  render() {
    return (
      <div className="page-containers">
        <img
          className="profile-page-image"
          src={this.state.user.imageUrl}
          alt="Profile"
        ></img>

        <p className="profile-page-name">{this.state.user.username}</p>
        <div className="game-detail-text">
          <hr></hr>

          <div className="profile-page-text">
            <p className="second-font profile-labels">
              <img className="location-img" src={group2} alt="Location Marker"></img>
              {this.state.user.location}
            </p>

            <p className="second-font profile-labels ">
              <img className="circle-img" src={userImg} alt="User"></img>
              {this.state.user.email}{" "}
            </p>
          </div>

          <hr></hr>
        </div>
        <Link to="/edit-profile">
          <button className="card-buttons second-font edit-profile-btn">
            Edit Profile <img className="next-button" src={nextButton} alt="Next"></img>
          </button>
        </Link>
      </div>
    );
  }
}
