import React from "react";





export default class Header extends React.Component {
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

          {this.props.thirdText}
        </div>
      </div>
    );
  }
}


