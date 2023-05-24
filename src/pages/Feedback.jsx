import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const {
      user: { nameInput, emailInput },
      score,
      history,
    } = this.props;
    const hash = md5(emailInput).toString();
    const valueScore = 3;
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="foto de perfil"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{ nameInput }</h3>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        <div>
          { score >= valueScore ? (<p data-testid="feedback-text">Well Done!</p>)
            : (<p data-testid="feedback-text">Could be better...</p>)}

        </div>
        <div>
          <button
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.login.user,
  score: state.player.score,
});

Feedback.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
