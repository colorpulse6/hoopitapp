import React from 'react';
import {Link} from 'react-router-dom'
import nextButton from '../images/next-button.png'
import userImg from '../images/combined-shape-copy.png'
import dateImg from '../images/combined-shape.png'
import group2 from '../images/group-2.png'
import RadialChart from '../components/RadialChart'


export default class Home extends React.Component {

  render() {
    return (
      <div>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h4>{this.props.mainText}</h4>
            <p class="lead"></p>
          </div>
        </div>

        <div className=" page-containers">
          <h3 class="user-main-header second-font near-you-text">
            {this.props.secondText}
          </h3>
          <p class="lead"></p>

          <p class="second-font take-part-text">
            {this.props.thirdText}
          </p>
          <p class="lead"></p>

          <div className="game-cards">
            {
              //SHUFFLE GAMES AND GET THE FIRST 3
              this.props.games
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map((el, index) => {
                  return (
                    <div class="card each-card">
                      <div key={index} id="game">
                        <img
                          class="card-img-top"
                          src={el.imageUrl}
                          alt="..."
                        ></img>
                        <div className="card-content">
                          <div className="card-text">
                            <p className="second-font created-by-name">
                              <img src={userImg} alt="User"></img>
                              {el.createdBy}
                            </p>
                            <p className="second-font">
                              <img src={dateImg} alt="Date"></img>
                              {el.date}
                            </p>
                            <p className="second-font location-text">
                              <img src={group2} alt="Location Marker"></img>
                              {el.location}
                            </p>
                          </div>

                          <div className="chart-div">
                            <RadialChart
                              progress={
                                (el.players.length / el.maxPlayers) * 100
                              }
                              color="#C9082A"
                              number={el.players.length + "/" + el.maxPlayers}
                              text={
                                el.players.length + 2 === el.maxPlayers ||
                                el.players.length + 1 === el.maxPlayers
                                  ? "Almost Full"
                                  : "Full"
                              }
                            />
                          </div>
                        </div>
                        <br></br>
                      </div>
                      <Link
                        to={
                          this.props.loggedInUser
                            ? `/${el._id}/admin`
                            : `/sign-up`
                        }
                      >
                        <button className=" card-buttons">
                          View Details
                          <img className="next-button" src={nextButton} alt="Next"></img>
                        </button>
                      </Link>
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>
    );
  }
}