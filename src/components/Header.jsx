import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { user: { email, name } } = this.props;
    const emailHash = md5(email).toString();
    console.log(emailHash);

    const userProfile = `https://www.gravatar.com/avatar/${emailHash}`;

    return (
      <header>
        <img
          src={ userProfile }
          alt="foto de perfil"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{ name }</h3>
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
