import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/';

class Login extends React.Component {
  state = {
    emailInput: '',
    nameInput: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handlePlay = async () => {
    const { emailInput } = this.state;
    const { dispatch, history } = this.props;

    dispatch(fetch);
    // history.push('/game')
  };

  render() {
    const { emailInput, nameInput } = this.state;
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

export default connect()(Login);
