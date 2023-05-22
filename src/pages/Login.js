import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/';
import { addUser, fetchToken } from '../redux/actions/index';

class Login extends Component {
  state = {
    emailInput: '',
    nameInput: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handlePlay = () => {
    const { dispatch } = this.props;
    dispatch(addUser({ ...this.state }));
    dispatch(fetchToken());
  };

  render() {
    const { token, history } = this.props;
    const { emailInput, nameInput } = this.state;
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (token) { history.push('/game'); }
    return (
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
        <Link to="/settings">
          <button data-testid="btn-settings">Settings</button>
        </Link>
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
