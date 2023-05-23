import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  tokenValidation = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  render() {
    const questions = JSON.parse(localStorage.getItem('questions'));
    const invalidTokenResponseCode = 3;
    if (questions.response_code === invalidTokenResponseCode) {
      this.tokenValidation();
    } else {
      const { results } = questions;
      const answers = [...results[0].incorrect_answers];
      const correct = results[0].correct_answer;
      answers.splice(Math.floor((answers.length + 1) * Math.random()), 0, correct); // insere a correta em um lugar random
      return (
        <section className="game">
          <Header />
          <h2 data-testid="question-category">{results[0].category}</h2>
          <h2 data-testid="question-text">{results[0].question}</h2>
          <div data-testid="answer-options">
            { answers.map((answer, index) => {
              let testId = `wrong-answer-${index}`;
              if (answer === correct) { testId = 'correct-answer'; }
              return <button data-testid={ testId } key={ index }>{answer}</button>;
            }) }
          </div>
        </section>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

Game.propTypes = ({
  token: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Game);
