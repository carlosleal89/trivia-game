import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser, fetchToken, fetchQuestions, clearScore } from '../redux/actions/index';
import Loading from '../components/Loading';
import './Login.css';

class Login extends Component {
  state = {
    emailInput: '',
    nameInput: '',
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handlePlay = async () => {
    this.setState({ isLoading: true });
    const { dispatch, history } = this.props;
    const { token } = await fetchToken();
    localStorage.setItem('token', token);
    const { nameInput, emailInput } = this.state;
    dispatch(addUser({ nameInput, emailInput }));
    await dispatch(fetchQuestions(token));
    this.setState({ isLoading: false });
    dispatch(clearScore());
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { emailInput, nameInput, isLoading } = this.state;
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (
      <div className="main-div">
        {
          isLoading
            ? <Loading /> : (
              <div>
                <label htmlFor="inputname">
                  Nome:
                  <input
                    type="name"
                    name="nameInput"
                    value={ nameInput }
                    id="inputName"
                    data-testid="input-player-name"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputEmail">
                  E-mail:
                  <input
                    type="email"
                    name="emailInput"
                    value={ emailInput }
                    id="inputEmail"
                    data-testid="input-gravatar-email"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  disabled={ !(emailValidation.test(emailInput) && nameInput.length > 0) }
                  data-testid="btn-play"
                  onClick={ () => this.handlePlay() }
                >
                  Play
                </button>
                <button
                  data-testid="btn-settings"
                  onClick={ () => history.push('/settings') }
                >
                  Settings
                </button>
              </div>)
        }
      </div>
    );
  }
}

Login.propTypes = ({
  dispatch: PropTypes.func,
}).isRequired;

const mapStateToProps = (state) => ({
  token: state.login.token,
});

export default connect(mapStateToProps)(Login);
