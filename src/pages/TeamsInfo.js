import React from "react";
import axios from "axios";
import config from "../config";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import nextButton from "../images/next-button.png";

export default class TeamsInfo extends React.Component {
  state = {
    teams: [],
  };

  componentDidMount() {
    console.log(this.state.teams + "These are teams!");
    axios
      .get(`${config.API_URL}/teams`, { withCredentials: true })
      .then((res) => {
        this.setState({
          teams: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleQuitTeam = (val1, val2, e) => {
    let name = val1;
    let id = val2;
    let confirmQuit = window.confirm(
      `Are you sure you want to quit the team ${name}?`
    );
    if (confirmQuit) {
      axios
        .post(
          `${config.API_URL}/quit-team/${id}`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          this.props.history.push("/user-main");
          this.setState({
            teams: res.data,
          });
        })
        .catch((err) => {
          console.log(
            "Something went wrong deleting from team on the client side" + err
          );
        });
    }
  };

  handleDisbandTeam = (e) => {
    let id = e.target.value;
    console.log(id);

    let confirmQuit = window.confirm(
      "Are you sure you want to diband this team?"
    );
    if (confirmQuit) {
      axios
        .delete(`${config.API_URL}/disband-team/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.props.history.push("/user-main");
          this.setState({
            teams: res.data,
          });
        })
        .catch((err) => {
          console.log(
            "Something went wrong deleting team on the client side" + err
          );
        });
    }
  };

  render() {
    if (!this.props.loggedInUser) {
      return <Redirect to="/sign-in" />;
    }

    let playerIds = [];
    let playerNames = [];
    // GET PLAYER IDS FROM TEAM OBJECT
    if (this.state.teams.length) {
      this.state.teams.map((team) => {
        team.players.forEach((eachId) => {
          playerIds.push(eachId);
          console.log(eachId);
        });
      });
    }

    //TEST PLAYER IDS AGAINST USER IDS AND ADD NAMES TO ARRAY
    for (let i = 0; i < this.props.users.length; i++) {
      for (let j = 0; j < playerIds.length; j++) {
        if (this.props.users[i]._id === playerIds[j]) {
          playerNames.push(this.props.users[i].username);
        }
      }
    }

    return (
      <div className="page-containers ">
        <h2 className="second-font">Teams</h2>
        <div className="">
          {this.state.teams.slice(0, 1).map((team) => {
            if (!team.players.includes(this.props.loggedInUser._id))
              return (
                <p className="second-font not-a-member">
                  You are not a member of any teams.
                </p>
              );
          })}

          {this.state.teams.map((team, index) => {
            if (team.players.includes(this.props.loggedInUser._id))
              return (
                <div key={index} className="  team-info-card">
                  <Link to={`/each-team/${team._id}`}>
                    <h4 className="second-font team-names">
                      <strong></strong>
                      <br></br> {team.teamName}
                      <hr></hr>
                    </h4>
                  </Link>
                  <p className="second-font team-names">
                    <strong>Owner:</strong>{" "}
                    {this.props.loggedInUser.username !== team.owner
                      ? team.owner
                      : "You"}
                    <hr></hr>
                  </p>
                  <p className="second-font">
                    <strong>Home Town:</strong> {team.homeTown}
                    <hr></hr>
                  </p>

                  <p className="second-font">
                    <strong>Games Played:</strong>{" "}
                    {!team.gamesPlayed ? 0 : team.gamesPlayed}
                    <hr></hr>
                  </p>

                  <div>
                  </div>
                  {
                    //CHANGE BUTTON DEPENDING ON OWNER OF TEAM OR NOT
                    this.props.loggedInUser.username === team.owner ? (
                      <button
                        className="card-buttons red-buttons"
                        value={team._id}
                        onClick={this.handleDisbandTeam}
                      >
                        Disband Team
                        <img className="next-button" src={nextButton} alt="Next"></img>
                      </button>
                    ) : (
                      <button
                        className="card-buttons red-buttons"
                        value={(team.teamName, team._id)}
                        onClick={this.handleQuitTeam.bind(
                          this,
                          team.teamName,
                          team._id
                        )}
                      >
                        Quit Team
                        <img className="next-button" src={nextButton} alt="Next"></img>
                      </button>
                    )
                  }
                </div>
              );
          })}
        </div>
      </div>
    );
  }
}
