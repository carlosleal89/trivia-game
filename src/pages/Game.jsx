import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Game.css';

const timer = 30000;
const oneSec = 1000;

class Game extends Component {
  state = { remaining: 30, timerStarted: false, answersArr: [] };

  tokenValidation = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  startTimer = () => {
    const tick = setInterval(() => {
      const { remaining } = this.state;
      this.setState({ remaining: remaining - 1 });
    }, oneSec);
    setTimeout(() => { clearInterval(tick); }, timer);
    this.setState({ timerStarted: true });
  };

  checkAnswer = () => {
    const answers = document.querySelectorAll('.answer');
    answers.forEach((el) => {
      const correctAnswer = document
        .querySelector('button[data-testid="correct-answer"]');
      if (el === correctAnswer) {
        el.className = 'correct-answer';
      } else el.className = 'incorrect-answer';
    });
  };

  render() {
    const questions = JSON.parse(localStorage.getItem('questions'));
    const invalidTokenResponseCode = 3;
    if (questions.response_code === invalidTokenResponseCode) {
      this.tokenValidation();
    } else {
      const { remaining, timerStarted, answersArr } = this.state;
      const { results } = questions;
      const answers = [...results[0].incorrect_answers];
      const correct = results[0].correct_answer;
      if (!timerStarted) {
        answers.splice(Math.floor((answers.length + 1) * Math.random()), 0, correct);
        this.setState({ answersArr: [...answers] });
        this.startTimer();
      }
      return (
        <section className="game">
          <Header />
          <h2>{remaining}</h2>
          <h2 data-testid="question-category">{results[0].category}</h2>
          <h2 data-testid="question-text">{results[0].question}</h2>
          <div data-testid="answer-options">
            { answersArr.map((answer, index) => {
              let testId = `wrong-answer-${index}`;
              if (answer === correct) { testId = 'correct-answer'; }
              return (
                <button
                  disabled={ remaining === 0 }
                  className="answer"
                  data-testid={ testId }
                  key={ index }
                  onClick={ this.checkAnswer }
                >
                  {answer}
                </button>
              );
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
