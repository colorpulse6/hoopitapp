import React from "react";
import axios from "axios";
import config from "../config";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import ChatPage from "./ChatPage";
export default class EachTeam extends React.Component {
  state = {
    team: "",
  };

  componentDidMount() {
    let id = this.props.match.params.teamId;
    axios
      .get(`${config.API_URL}/each-team/${id}`, { withCredentials: true })
      .then((res) => {
        this.setState({
          team: res.data,
        });
        console.log(this.state);
      })
      .catch((err) => {
        console.log("Error getting team:  " + err);
      });
  }

  //FOR DISPLAYING CHAT
  openForm = () => {
    document.getElementById("myForm").style.display = "block";
  };

  closeForm = () => {
    document.getElementById("myForm").style.display = "none";
  };

  render() {
    let { owner, teamName, homeTown, gamesPlayed, players } = this.state.team;
    let doobs = [];
    for (const player in players) {
      doobs.push(players[player]);
    }

    return (
      <div className="page-containers">
        <h3 className="second-font">{teamName}</h3>
        {
          <div className="game-card each-team-info">
            <p className="second-font">
              <strong>Owner:</strong>
              <br></br> {owner}
            </p>
            <hr></hr>
            <p className="second-font">
              <strong>Hometown:</strong>
              <br></br> {homeTown}
            </p>
            <hr></hr>
            <p className="second-font team-players-div">
              <strong>Players:</strong> <br></br>
              {doobs.map((player) => {
                return (
                  <div>
                    {player.username} <br></br>
                  </div>
                );
              })}
            </p>
            <hr></hr>
          </div>
        }
        <div className="chatters">
          <ChatPage
            loggedInUser={this.props.loggedInUser}
            teamId={this.props.match.params.teamId}
          />
        </div>
      </div>
    );
  }
}
