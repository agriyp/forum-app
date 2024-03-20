import React from 'react';
import PropTypes from 'prop-types';
import UserItem, { userItemShape } from './UserItem';

function UserList({ leaderboards, authUser }) {
  return (
    <div className="user-list">
      <div className="user-list__header">
        <h3>Pengguna</h3>
        <h3>Skor</h3>
      </div>
      {leaderboards.map((leaderboard) => (
        <UserItem key={leaderboard.user.id} {...leaderboard} authUser={authUser} />
      ))}
    </div>
  );
}

UserList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(userItemShape)).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default UserList;
