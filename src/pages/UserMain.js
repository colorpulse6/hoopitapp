import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Header from "../components/Header";
import Map from "../components/Map";
import EachCard from "../components/EachCard";
import RadialChart from "../components/RadialChart";
import nextButton from "../images/next-button.png";
import userImg from "../images/combined-shape-copy.png";
import dateImg from "../images/combined-shape.png";
import group2 from "../images/group-2.png";

export default class UserMain extends React.Component {
  state = {
    games: [],
  };

  componentDidMount() {
    this.getGames();
  }

  getGames = () => {
    axios
      .get(`${config.API_URL}/user-main`, { withCredentials: true })
      .then((res) => {
        this.setState({
          games: res.data,
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.props.history.push("/");
        }
      });
  };

  render() {
    if (!this.props.loggedInUser) {
      return <Redirect to="/sign-in" />;
    }
    return (
      <div>
        <Header
          mainText={`Welcome ${this.props.loggedInUser.username}!`}
          secondText={"Discover games around your area"}
          loggedInUser={this.props.loggedInUser}
        />

        {/* MAP */}
        <div>
          <div className="map-div">
            <Map loggedInUser={this.props.loggedInUser} />
          </div>
        </div>

        <div class="page-containers">
          <div className="row">
            <div>
              {/* SHOW GAMES YOU MADE */}
              {this.state.games.length === 0 ? (
                <p className="second-font">
                  You don't have any games, create one below!
                </p>
              ) : null}

              <div>
                <h3
                  className="main-page-headers second-font hide"
                  id="yourGames"
                >
                  Your Games
                </h3>
              </div>

              <div className="game-cards">
                {this.state.games.map((game, index) => {
                  if (game.createdBy === this.props.loggedInUser.username) {
                    document
                      .getElementById("yourGames")
                      .classList.remove("hide");
                    return (
                      <EachCard
                        el={game}
                        loggedInUser={this.props.loggedInUser}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div className="row">
            <div >
              {/* SHOW GAMES YOU JOINED */}

              {this.state.games.slice(0, 1).map((el, index) => {
                if (
                  el.players.includes(this.props.loggedInUser._id) &&
                  el.createdBy !== this.props.loggedInUser.username
                ) {
                  return (
                    <h3 key={index} className="main-page-headers second-font">
                      Your upcoming games
                    </h3>
                  );
                }
              })}
              <div className="game-cards ">
                {this.state.games.map((game, index) => {
                  if (
                    game.players.includes(this.props.loggedInUser._id) &&
                    game.createdBy !== this.props.loggedInUser.username
                  ) {
                    return (
                      <EachCard
                        el={game}
                        loggedInUser={this.props.loggedInUser}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div>
            <Link to="/create-game">
              <hr></hr><button className="card-buttons second-font create-game-btn ">
                Create A Game{" "}
                <img className="next-button" src={nextButton} alt="Next"></img>
              </button>
            </Link>{" "}
          </div>
        </div>
      </div>
    );
  }
}
