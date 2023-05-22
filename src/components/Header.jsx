import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { user: { email, name } } = this.props;
    const emailHash = ;

    const userProfile = `https://www.gravatar.com/avatar/${emailHash}`;

    return (
      <header>
        <img src={ userProfile } alt="foto de perfil" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h3 data-testid="header-score">0</h3>
        
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.login.user
});

export default connect(mapStateToProps)(Header);
