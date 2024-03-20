import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';

function Navigation({ authUser, signOut }) {
  return (
    <div className="navigation">
      <div>
        <Link to="/threads" className="logo">
          BoX
        </Link>
      </div>
      <nav>
        <Link to="/threads">Threads</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <button type="button" className="btn__logout" onClick={signOut}>
          <span>{authUser.name}</span>
          <IoLogOutOutline />
        </button>
      </nav>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
