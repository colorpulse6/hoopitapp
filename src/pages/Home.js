import React from 'react';
import MainRender from '../components/MainRender'


export default class Home extends React.Component {

  render() {
    return (
      <div>
      <MainRender 
        mainText={'JOIN A BASKETBALL GAME ANYWHERE YOU ARE'}
        secondText={'Discover games around your area'}
        thirdText={'Take part in one of the games played near you, get to meet your team for the match of the day'}
        games={this.props.games}
      />
        
      </div>
    );
  }
}
