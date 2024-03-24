import React from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { postedAt } from '../utils';
import CardThread from './styled/CardThread';

function ThreadItem({
  user,
  title,
  body,
  category,
  id,
  createdAt,
  totalComments,
  upVotesBy,
  downVotesBy,
  onUpVoteThread,
  onDownVoteThread,
  authUser,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const upVoteHandler = () => {
    onUpVoteThread(id, isUpVoted, isDownVoted);
  };
  const downVoteHandler = () => {
    onDownVoteThread(id, isDownVoted, isUpVoted);
  };

  return (
    <CardThread>
      <div className="thread-item__header">
        <div className="user-info">
          <img src={user.avatar} alt="" />
          <p>{user.name}</p>
        </div>
        <p className="thread-item__time">{postedAt(createdAt)}</p>
      </div>
      <p className="thread-item__category">{`#${category}`}</p>
      <Link to={`/threads/${id}`} className="thread-item__title">
        {parse(title)}
      </Link>
      <div className="thread-item__body">{parse(body)}</div>
      <div className="thread-item__footer">
        <div className="thread-item__votes">
          <div className="btn__up-vote">
            <button type="button" className="up-vote" onClick={upVoteHandler}>
              {isUpVoted ? <BiSolidLike /> : <BiLike />}
            </button>
            <p>{upVotesBy.length}</p>
          </div>
          <div className="btn__down-vote">
            <button type="button" className="down-vote" onClick={downVoteHandler}>
              {isDownVoted ? <BiSolidDislike /> : <BiDislike />}
            </button>
            <p>{downVotesBy.length}</p>
          </div>
        </div>
        <Link to={`/threads/${id}`}>
          {totalComments > 0 ? `${totalComments} Komentar` : 'Tidak Ada Komentar'}
        </Link>
      </div>
    </CardThread>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  onUpVoteThread: PropTypes.func.isRequired,
  onDownVoteThread: PropTypes.func.isRequired,
};

export { threadItemShape };

export default ThreadItem;
