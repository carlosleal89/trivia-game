import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { user: { nameInput, emailInput } } = this.props;
    const hash = md5(emailInput).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="foto de perfil"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{ nameInput }</h3>
        <h3 data-testid="header-score">0</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.login.user,
});

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
