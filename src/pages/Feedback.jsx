import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { user: { nameInput, emailInput, score }, history } = this.props;
    const hash = md5(emailInput).toString();
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
        <div data-testid="feedback-text">
          <p>Could be better...</p>
          {' '}
          :
          {' '}
          <p>Well Done!</p>
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/login') }
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
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.login.user,
});

Feedback.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);