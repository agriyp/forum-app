import React from 'react';
import PropTypes from 'prop-types';
import CardUser from './styled/CardUser';

function UserItem({ user, score, authUser }) {
  return (
    <CardUser>
      <div className="user-info">
        <img src={user.avatar} alt="" />
        <p className="">{user.id === authUser ? `${user.name} (Anda)` : user.name}</p>
      </div>
      <p className="user-item__score">{score}</p>
    </CardUser>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const userItemShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

UserItem.propTypes = {
  ...userItemShape,
  authUser: PropTypes.string.isRequired,
};

export { userItemShape };

export default UserItem;
