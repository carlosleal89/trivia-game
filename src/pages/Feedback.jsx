import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearScore } from '../redux/actions';

class Feedback extends Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(clearScore());
  };

  render() {
    const {
      user: { nameInput, emailInput },
      score,
      assertions,
      history,
    } = this.props;
    const hash = md5(emailInput).toString();
    const goodAssertion = 3;
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
          { assertions >= goodAssertion ? (<p data-testid="feedback-text">Well Done!</p>)
            : (<p data-testid="feedback-text">Could be better...</p>)}
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h3 data-testid="feedback-total-question">{ assertions }</h3>
        </div>
        <div>
          <button
            data-testid="btn-play-again"
            onClick={ this.playAgain }
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
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
