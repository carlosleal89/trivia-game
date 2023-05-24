import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Game.css';
import { addScore } from '../redux/actions';

const timer = 30000;
const oneSec = 1000;
const maxQuestions = 4;

let tick;
let timeOut;

class Game extends Component {
  state = {
    questionIndex: 0,
    remaining: 30,
    timerStarted: false,
    answersArr: [],
    answered: false,
  };

  tokenValidation = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  startTimer = () => {
    tick = setInterval(() => {
      const { remaining } = this.state;
      this.setState({ remaining: remaining - 1 });
    }, oneSec);
    timeOut = setTimeout(() => {
      clearInterval(tick);
      this.setState({ answered: true });
    }, timer);
    this.setState({ timerStarted: true });
  };

  checkAnswer = (testid) => {
    // Revelando respostas
    const answers = document.querySelectorAll('.answer');
    const correctId = 'correct-answer';
    answers.forEach((el) => {
      const correctAnswer = document
        .querySelector('button[data-testid="correct-answer"]');
      if (el === correctAnswer) {
        el.className = correctId;
      } else el.className = 'incorrect-answer';
    });
    this.setState({ answered: true });

    // Calculando score e enviando para o redux
    const difficulties = { hard: 3, medium: 2, easy: 1 };
    const minimumScore = 10;
    const { user, dispatch } = this.props;
    const { remaining, questionIndex } = this.state;
    const questions = JSON.parse(localStorage.getItem('questions'));
    const { results } = questions;
    const { difficulty } = results[questionIndex];
    if (testid === correctId) {
      dispatch(addScore(minimumScore + (remaining * difficulties[difficulty]), user));
    }

    // Zerando timer
    this.resetTimer();
  };

  nextQuestion = () => {
    const { history } = this.props;
    const { questionIndex } = this.state;
    if (questionIndex === maxQuestions) {
      history.push('/feedback');
    } else {
      this.resetTimer();
      this.setState({
        questionIndex: questionIndex + 1,
        remaining: 30,
        timerStarted: false,
        answersArr: [],
        answered: false,
      });
    }
  };

  resetTimer = () => {
    clearInterval(tick);
    clearTimeout(timeOut);
  };

  render() {
    const questions = JSON.parse(localStorage.getItem('questions'));
    const invalidTokenResponseCode = 3;
    if (questions.response_code === invalidTokenResponseCode) {
      this.tokenValidation();
    } else {
      const { questionIndex, remaining, timerStarted,
        answersArr, answered } = this.state;
      const { results } = questions;
      const answers = [...results[questionIndex].incorrect_answers];
      const correct = results[questionIndex].correct_answer;
      if (!timerStarted) {
        this.startTimer();
        answers.splice(Math.floor((answers.length + 1) * Math.random()), 0, correct);
        this.setState({ answersArr: [...answers] });
      }
      return (
        <section className="game">
          <Header />
          <h2>{remaining}</h2>
          <h2 data-testid="question-category">{results[questionIndex].category}</h2>
          <h2 data-testid="question-text">{results[questionIndex].question}</h2>
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
                  onClick={ () => this.checkAnswer(testId) }
                >
                  {answer}
                </button>
              );
            }) }
          </div>
          { answered && (
            <button
              data-testid="btn-next"
              onClick={ () => this.nextQuestion() }
            >
              Next
            </button>
          )}

        </section>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  user: state.login.user,
});

Game.propTypes = ({
  token: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Game);
