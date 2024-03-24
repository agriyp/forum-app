import React from 'react';
import PropTypes from 'prop-types';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import parse from 'html-react-parser';
import { postedAt } from '../utils';
import CardThread from './styled/CardThread';

function ThreadDetailItem({
  id,
  title,
  body,
  category,
  upVotesBy,
  downVotesBy,
  owner,
  createdAt,
  authUser,
  onUpVoteDetailThread,
  onDownVoteDetailThread,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const upVoteHandler = () => {
    onUpVoteDetailThread(id, isUpVoted, isDownVoted);
  };
  const downVoteHandler = () => {
    onDownVoteDetailThread(id, isDownVoted, isUpVoted);
  };

  return (
    <CardThread>
      <div className="thread-item__header">
        <div className="user-info">
          <img src={owner.avatar} alt="" />
          <p>{owner.name}</p>
        </div>
        <p className="thread-item__time">{postedAt(createdAt)}</p>
      </div>
      <p className="thread-item__category">{`#${category}`}</p>
      <p className="thread-item__title">{parse(title)}</p>
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
      </div>
    </CardThread>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetailItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  onUpVoteDetailThread: PropTypes.func.isRequired,
  onDownVoteDetailThread: PropTypes.func.isRequired,
};

export default ThreadDetailItem;
