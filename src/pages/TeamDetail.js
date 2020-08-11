import React from "react";
import axios from "axios";
import config from "../config";
import nextButton from "../images/next-button.png";

export default class TeamsDetail extends React.Component {
  state = {
    game: "",
    team: "",
  };
  componentDidMount() {
    let id = this.props.match.params.gameId;
    axios
      .get(`${config.API_URL}/game-detail/${id}`, { withCredentials: true })
      .then((res) => {
        this.setState({
          game: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveTeam = (e) => {
    e.preventDefault();

    let id = this.props.match.params.gameId;
    let owner = this.props.loggedInUser.username;
    let teamName = e.target.teamName.value;
    let homeTown = this.props.loggedInUser.location;
    const list = this.state.game.players;
    if (this.state.game.maxPlayers === this.state.game.players.length) {
      axios
        .post(
          `${config.API_URL}/${id}/save-team`,
          {
            owner: owner,
            teamName: teamName,
            hoometown: homeTown,
            players: list,
          },
          { withCredentials: true }
        )
        .then((res) => {
          this.setState({
            team: {
              teamName: teamName,
              players: list,
            },
          });
          this.props.history.push("/team-info");
        })
        .catch((err) => {
          console.log(err + "Axios Error!!!!");
        });
    } else {
      alert("Game must be full to form a team!");
    }
  };

  render() {
    const { players } = this.state.game;
    //FIND NAMES BY ID
    let userNames = [];
    for (let i = 0; i < this.props.users.length; i++) {
      for (const prop in players) {
        if (this.props.users[i]._id === players[prop]) {
          userNames.push(this.props.users[i].username);
        }
      }
    }

    return (
      <div className="page-containers">
        <h3 className="second-font">Create New Team</h3>

        <form onSubmit={this.saveTeam} className="form-container">
          <div className="form-group">
            <input
              className="form-control second-text"
              type="text"
              placeholder="Name your team?"
              name="teamName"
              id="teamName"
              required
            />
            
              <div className="team-players">
              <h4 className="second-font">Players:</h4>
                {userNames.map((name) => {
                  return <p className="second-font">{name}</p>;
                })}
              </div>
                
                <button className="card-buttons">
                Save Team <img className="next-button" src={nextButton} alt="Next"></img>
              </button>
            
          </div>
        </form>
      </div>
    );
  }
}
