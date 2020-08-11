import React from "react";
import axios from "axios";
import config from "../config";
import { Redirect } from "react-router-dom";
import nextButton from "../images/next-button.png";
import userImg from "../images/combined-shape-copy.png";
import dateImg from "../images/combined-shape.png";
import group2 from "../images/group-2.png";

export default class GameDetail extends React.Component {
  state = {
    player: "",
    game: "",
  };

  componentDidMount() {
    let id = this.props.match.params.gameId;
    // console.log('Users on Game Deatail Page: ' + this.props.users)
    axios
      .get(`${config.API_URL}/game-detail/${id}`, { withCredentials: true })
      .then((res) => {
        // console.log('Info' + res.data)
        this.setState({
          game: res.data,
          player: this.props.loggedInUser.username,
        });
        console.log(res.data + "SBDI/&&/&&/&&&&&66666");
        // console.log(this.state.game)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ADD PLAYER TO GAME
  handleJoinGame = () => {
    // console.log(this.state.player)
    let { location, date, createdBy } = this.state.game;
    const list = this.state.game.players.concat(this.state.player);
    if (!this.state.game.players.includes(this.state.player)) {
      if (this.state.game.players.length !== this.state.game.maxPlayers) {
        this.sendNewPlayers();
        this.setState(
          {
            game: {
              location: location,
              date: date,
              createdBy: createdBy,
              players: list,
            },
          },
          () => {
            this.props.history.push("/user-main");
          }
        );
      } else {
        alert("Game is full.");
      }
    }
  };

  //SEND PLAYERS TO DB
  sendNewPlayers = () => {
    let id = this.props.match.params.gameId;
    axios
      .get(`${config.API_URL}/join-game/${id}`, { withCredentials: true })
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {
        console.log(err + "ERRRRRRR");
      });
  };

  handleQuitGame = (e) => {
    let id = e.target.value;

    console.log("gameId:" + id);
    console.log("user " + this.props.loggedInUser._id);
    let confirmQuit = window.confirm(`Are really a quitter?`);
    if (confirmQuit) {
      axios
        .get(`${config.API_URL}/quit-game/${id}`, { withCredentials: true })
        .then((res) => {
          console.log(res.data + "success");
          this.props.history.push("/user-main");
        })
        .catch((err) => {
          console.log("Game delete error client side" + err);
        });
    }
  };

  render() {
    if (!this.props.loggedInUser) {
      return <Redirect to="/sign-in" />;
    }
    const {
      location,
      date,
      createdBy,
      players,
      _id,
      savedAsTeam,
      time,
    } = this.state.game;
    console.log("players:  " + typeof players);
    let userNames = [];
    for (let i = 0; i < this.props.users.length; i++) {
      for (const prop in players) {
        console.log(players[prop]);
        if (this.props.users[i]._id === players[prop]) {
          userNames.push(this.props.users[i].username);
        }
      }
    }

    console.log(userNames);

    return (
      <div className="page-containers">
        <div className="game-detail-page">
          <h4 className="second-font">Game Details</h4>

          <div className="game-detail-text">
            <p className="second-font labels">
              <img src={dateImg} alt="Date"></img>Date and Time
            </p>{" "}
            <hr></hr>
            <div className="dateTime">
              <p className="inputs"> {date}</p>
              <p className="inputs"> Game Time: {time}</p>
            </div>
            <p className="second-font labels">
              <img src={group2} alt="Location Marker"></img>Location{" "}
            </p>
            <hr></hr>
            <p className="inputs">{location}</p>
            {savedAsTeam ? (
              <p className="second-font labels">
                Team: <hr></hr> {savedAsTeam}
              </p>
            ) : (
              <div>
                <p className="second-font labels">
                  <img src={userImg} alt="User"></img>Players
                </p>
                <hr></hr>
                <p className="inputs">
                  {userNames.map((name) => {
                    return (
                      <div>
                        {name}
                        <br></br>
                      </div>
                    );
                  })}
                </p>
                
              </div>
            )}
          </div>
          <div className=" admin-buttons">
            {!userNames.includes(this.props.loggedInUser.username) ? (
              <button
                className="  card-buttons"
                onClick={this.handleJoinGame}
                type="submit"
              >
                Join<img className="next-button" src={nextButton} alt="Next"></img>
              </button>
            ) : (
              <div>
                <p className="scheduled-to-play">
                  You are scheduled to play this game.
                </p>
                <button
                  className="red-buttons"
                  value={_id}
                  onClick={this.handleQuitGame}
                >
                  Leave Game<img className="next-button" src={nextButton} alt="Next"></img>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
