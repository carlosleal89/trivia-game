import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const rankingData = JSON.parse(localStorage.getItem('ranking')) || [];
    const sortedRanking = rankingData.sort((a, b) => b.score - a.score);
    console.log(sortedRanking);
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ul>
          {sortedRanking.map((player, index) => (
            <li key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${player.hash}` }
                alt="foto de perfil"
                data-testid={ `player-image-${index}` }
              />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </li>
          ))}
        </ul>
        <Link to="/" data-testid="btn-go-home">Go to Home</Link>
      </div>
    );
  }
}

export default Ranking;
