import React from "react";
import axios from "axios";
import config from "../config";
import nextButton from "../images/next-button.png";
import SearchCity from "../components/SearchCity";

export default class EditProfile extends React.Component {
  state = {
    loggedInUser: "",
    location: "",
  };

  componentDidMount() {
    this.getUser();
  }

  handleLocationInput = (obj) => {
    this.setState({
      location: obj.address,
      city: obj.value,
      lat: obj.lat,
      lng: obj.lng,
    });
  };

  getUser() {
    axios
      .get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        this.setState({
          loggedInUser: res.data,
          profilePic: res.data.imageUrl,
        });
      });
  }

  uploadImage = (e) => {
    let imageUrl = e.target.file.files[0];
    let uploadData = new FormData();
    uploadData.append("imageUrl", imageUrl);
    axios
      .post(`${config.API_URL}/upload-img`, uploadData)
      .then((res) => {
        let profileImg = res.data.secure_url;
        console.log(profileImg);
        axios
          .patch(
            `${config.API_URL}/edit-profile-pic`,
            { profileImg },
            { withCredentials: true }
          )
          .then(() => {
            this.setState({
              profileImg: res.data.secure_url,
            });
            window.location.reload(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  reload = () => {
    window.location.reload(true);
  };
  //!!!!!!!!!!!!!!
  handleEditProfile = (e) => {
    e.preventDefault();
    let username = e.target.changeName.value;
    let location = this.state.location;
    let imageUrl = e.target.file.files[0];
    let email = e.target.changeEmail.value;
    let id = this.props.loggedInUser._id;
    let lat = this.state.lat;
    let lng = this.state.lng;
    if (username && !location && !imageUrl) {
      username = e.target.changeName.value;
      location = this.props.loggedInUser.location;
    } else if (!username && location && !imageUrl) {
      username = this.props.loggedInUser.username;
      location = this.state.location;
    } else if (!username && !location && imageUrl) {
      username = this.props.loggedInUser.username;
      location = this.props.loggedInUser.location;
      this.uploadImage(e);
    } else if (!username && location && imageUrl) {
      username = this.props.loggedInUser.username;
      location = this.state.location;
      this.uploadImage(e);
    } else if (username && !location && imageUrl) {
      username = e.target.changeName.value;
      location = this.props.loggedInUser.location;
      this.uploadImage(e);
    } else if (!username && !location && !imageUrl) {
      username = this.props.loggedInUser.username;
      location = this.props.loggedInUser.location;
    } else {
      username = e.target.changeName.value;
      location = this.state.location;
    }

    axios
      .post(
        `${config.API_URL}/edit-profile/${id}`,
        {
          username: username,
          location: location,
          email: email,
          lat: lat,
          lng: lng,
        },
        { withCredentials: true }
      )
      .then((res) => {
        this.setState(
          {
            loggedInUser: res.data,
          },
          () => {
            this.props.history.push(`/profile`);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  showText = (e) => {
    var element = document.getElementById("imageUploaded");
    element.classList.remove("hide");
  };

  render() {
    return (
      <div className="page-containers">
        <div>
          <h3 class="second-font edit-profile-header">Edit Profile</h3>
        </div>

        <img
          className="edit-profile-page-image profile-image"
          src={this.props.loggedInUser.imageUrl}
          alt="Profile"
        ></img>

        <form
          className="form-container"
          onSubmit={this.handleEditProfile}
        >
          <div class="form-group">
            <label for="changeName"></label>
            <input
              type="text"
              class="second-font form-control"
              id="changeName"
              aria-describedby="changeName"
              placeholder={this.state.loggedInUser.username}
              name="changeName"
            ></input>
            <small id="emailHelp" class="form-text text-muted"></small>
          </div>
          <div class="form-group">
            <label for="location" className="second-font"></label>
            {/* <input type="text" class="second-font form-control" id="changeCity" placeholder={this.state.loggedInUser.location} name="changeCity"></input> */}
            <SearchCity panTo={this.handleLocationInput} />
          </div>
          <div class="form-group">
            <label for="changeEmail"></label>
            <input
              type="text"
              class="second-font form-control"
              id="changeEmail"
              placeholder={this.state.loggedInUser.email}
              name="changeEmail"
            ></input>
          </div>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            class="uploader "
            onChange={this.showText}
          />
          <label className="second-font " htmlFor="file">
            Upload Image
          </label>{" "}
          <p className="second-font image-uploaded hide" id="imageUploaded">
            Image Uploaded!
          </p>
          <button type="submit" class="card-buttons">
            Save<img className="next-button" src={nextButton}></img>
          </button>
        </form>
      </div>
    );
  }
}
