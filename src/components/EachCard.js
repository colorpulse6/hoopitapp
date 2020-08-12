import React from "react";
import { Link } from "react-router-dom";
import nextButton from "../images/next-button.png";
import userImg from "../images/combined-shape-copy.png";
import dateImg from "../images/combined-shape.png";
import group2 from "../images/group-2.png";
import RadialChart from "../components/RadialChart";



export default function eachCard(props) {
    return (
      <div class="card each-card">
        <div id="game">
          <img class="card-img-top" src={props.el.imageUrl} alt="..."></img>
          <div className="card-content">
            <div className="card-text">
              <p className="second-font created-by-name">
                <img src={userImg} alt="User"></img>
                {props.el.createdBy}
              </p>
              <p className="second-font">
                <img src={dateImg} alt="Date"></img>
                {props.el.date}
              </p>
              <p className="second-font">
                <img src={group2} alt="Location Marker"></img>
                {props.el.location}
              </p>
            </div>
  
            <div className="chart-div">
              <RadialChart
                progress={(props.el.players.length / props.el.maxPlayers) * 100}
                color="#C9082A"
                number={props.el.players.length + "/" + props.el.maxPlayers}
                text={
                    props.el.players.length + 2 === props.el.maxPlayers ||
                    props.el.players.length + 1 === props.el.maxPlayers
                    ? "Almost Full"
                    : props.el.players.length === props.el.maxPlayers
                    ? "Full"
                    : "Players"
                }
              />
            </div>
          </div>
          <br></br>
        </div>
        <Link
          to={props.loggedInUser ? `/${props.el._id}/admin` : `/sign-up`}
        >
          <button className=" card-buttons">
            View Details
            <img
              className="next-button"
              src={nextButton}
              alt="Next"
            ></img>
          </button>
        </Link>
      </div>
    );
  
  }