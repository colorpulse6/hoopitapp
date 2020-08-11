import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

import axios from "axios";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import config from "./config";

import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import UserMain from "./pages/UserMain";
import CreateGame from "./pages/CreateGame";
import GameDetail from "./pages/GameDetail";
import GameAdmin from "./pages/GameAdmin";
import Profile from "./pages/Profile";

import TeamsInfo from "./pages/TeamsInfo";
import TeamDetail from "./pages/TeamDetail";
import EachTeam from "./pages/EachTeam";
import Nav from "./components/Nav";
import Loading from "./components/Loading";

import "@reach/combobox/styles.css";

class App extends React.Component {
  state = {
    loggedInUser: "",
    games: [],
    users: [],
    location: "",
    city: "",
    lat: null,
    lng: null,
    error: "",
    isLoading: true,
    gmapsLoaded: false,
    imageUrl: "",
  };

  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    });
  };

  getUser() {
    axios
      .get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        this.setState({
          loggedInUser: res.data,
        });
      });
  }

  getUsers() {
    axios
      .get(`${config.API_URL}/users`, { withCredentials: true })
      .then((res) => {
        this.setState({
          users: res.data,
        });
      });
  }

  getGames = () => {
    axios
      .get(`${config.API_URL}/main`, { withCredentials: true })
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

  randomURL = "https://source.unsplash.com/400x250/?basketball,court";
  componentDidMount() {
    this.getGames();
    this.getUsers();
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
    if (!this.state.loggedInUser) {
      this.getUser();
    }
    window.initMap = this.initMap;
    const gmapScriptEl = document.createElement(`script`);
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
    document
      .querySelector(`body`)
      .insertAdjacentElement(`beforeend`, gmapScriptEl);

    axios.get(this.randomURL).then((data) => {
      this.setState({
        imageUrl: data.request.responseURL,
      });
    });
  }

  handleSignUp = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let username = e.target.username.value;
    let password = e.target.password.value;
    let location = this.state.location;
    let lat = this.state.lat;
    let lng = this.state.lng;
    axios
      .post(
        `${config.API_URL}/sign-up`,
        {
          //FROM CONFIG.JS
          email: email,
          username: username,
          password: password,
          location: location,
          lat: lat,
          lng: lng,
        },
        { withCredentials: true }
      ) //CHECKS COOKIES
      .then((res) => {
        this.setState(
          {
            loggedInUser: res.data,
          },
          () => {
            this.props.history.push("/user-main");
          }
        );
      })
      .catch((res) => {
        this.setState({
          error: res.response.data.error,
        });
        console.log("this is error" + this.state.error);
      });
  };

  handleSignIn = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    axios
      .post(
        `${config.API_URL}/sign-in`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        this.setState(
          {
            loggedInUser: res.data,
          },
          () => {
            this.props.history.push("/user-main");
          }
        );
      })
      .catch((res) => {
        this.setState({
          error: res.response.data.error,
        });
        console.log("this is error" + this.state.error);
      });
  };

  handleLogout = () => {
    console.log(document.cookie);
    axios
      .post(`${config.API_URL}/logout`, {}, { withCredentials: true })
      .then((res) => {
        this.setState(
          {
            loggedInUser: null,
          },
          () => {
            this.props.history.push("/");
          }
        );
      });
  };

  handleLocationInput = (obj) => {
    this.setState({
      location: obj.address,
      city: obj.value,
      lat: obj.lat,
      lng: obj.lng,
    });
  };

  handleAddGame = (e) => {
    e.preventDefault();

    let date = e.target.date.value;
    let location = this.state.location;
    let time = e.target.time.value;
    let city = this.state.city;
    let lat = this.state.lat;
    let lng = this.state.lng;
    let maxPlayers = e.target.maxPlayers.value;
    let team;
    let imageUrl = this.state.imageUrl;

    if (e.target.team.value === "No team selected") {
      team = this.state.loggedInUser._id;
    } else {
      team = e.target.team.value.split(",");
    }
    axios
      .post(
        `${config.API_URL}/create-game`,
        {
          date: date,
          time: time,
          location: location,
          city: city,
          lat: lat,
          lng: lng,
          maxPlayers: maxPlayers,
          createdBy: this.state.loggedInUser.username,
          players: team,
          imageUrl: imageUrl,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("GOT GAME");
        this.setState(
          {
            games: [...this.state.games, res.data],
          },
          () => {
            this.props.history.push("/user-main");
          }
        );
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log(err.response.status);
        }
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    const { loggedInUser } = this.state;
    return (
      <div>
        <Nav
          loggedInUser={this.state.loggedInUser}
          onLogout={this.handleLogout}
        />
        <Switch>

          <Route
            exact
            path="/"
            render={() => {
              return (
                <Home
                  games={this.state.games}
                  loggedInUser={this.state.loggedInUser}
                  users={this.state.users}
                  getGames={this.getGames}
                />
              );
            }}
          />
          <Route
            path="/sign-in"
            render={() => {
              return (
                <Signin onSignIn={this.handleSignIn} error={this.state.error} />
              );
            }}
          />
          <Route
            path="/sign-up"
            render={() => {
              return (
                <Signup
                  onSignUp={this.handleSignUp}
                  error={this.state.error}
                  handleLocationInput={this.handleLocationInput}
                />
              );
            }}
          />
          <Route
            exact
            path="/profile"
            render={(routeProps) => {
              return (
                <Profile
                  loggedInUser={loggedInUser}
                  games={this.state.games}
                  users={this.state.users}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            path="/edit-profile"
            render={(routeProps) => {
              return (
                <EditProfile
                  loggedInUser={loggedInUser}
                  games={this.state.games}
                  users={this.state.users}
                  handleLocationInput={this.handleLocationInput}
                  {...routeProps}
                />
              );
            }}
          />
          <Route
            path="/user-main"
            render={() => {
              return (
                <UserMain
                  loggedInUser={loggedInUser}
                  games={this.state.games}
                  users={this.state.users}
                  getGames={this.getGames}
                />
              );
            }}
          />
          <Route
            path="/team-info"
            render={(routeProps) => {
              return (
                <TeamsInfo
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  users={this.state.users}
                  games={this.state.games}
                />
              );
            }}
          />
          <Route
            path="/create-game"
            render={() => {
              return (
                <CreateGame
                  loggedInUser={loggedInUser}
                  onAddGame={this.handleAddGame}
                  useTeam={this.handleUseTeam}
                  handleLocationInput={this.handleLocationInput}
                />
              );
            }}
          />
          <Route
            exact
            path="/game-detail/:gameId"
            render={(routeProps) => {
              return (
                <GameDetail
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  users={this.state.users}
                />
              );
            }}
          />
          <Route
            exact
            path="/:gameId/admin"
            render={(routeProps) => {
              return (
                <GameAdmin
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  users={this.state.users}
                />
              );
            }}
          />
          <Route
            path="/:gameId/admin/team-detail"
            render={(routeProps) => {
              return (
                <TeamDetail
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  users={this.state.users}
                />
              );
            }}
          />

          <Route
            path="/each-team/:teamId"
            render={(routeProps) => {
              return (
                <EachTeam
                  loggedInUser={loggedInUser}
                  {...routeProps}
                  users={this.state.users}
                />
              );
            }}
          />
          
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
