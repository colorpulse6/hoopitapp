import React from 'react';
import Header from '../components/Header'
import EachCard from "../components/EachCard";


export default class Home extends React.Component {

  render() {
    return (
      <div>
      <Header 
        mainText={'JOIN A BASKETBALL GAME ANYWHERE YOU ARE'}
        secondText={'Discover games around your area'}
        thirdText={<p class="second-font take-part-text">'Take part in one of the games played near you, get to meet your team for the match of the day'</p>}
        
      />
      <div className="game-cards">
        {
          //SHUFFLE GAMES AND GET THE FIRST 3
          this.props.games
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map((game, index) => {
            return <EachCard
              el={game}
              
            />
            
          })
        }
      </div>
      
      
        
      </div>
    );
  }
}
