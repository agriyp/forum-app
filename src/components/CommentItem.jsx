import React from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import parse from 'html-react-parser';
import { postedAt } from '../utils';
import CardThread from './styled/CardThread';

function CommentItem({
  id,
  content,
  createdAt,
  downVotesBy,
  upVotesBy,
  owner,
  onUpVoteComment,
  onDownVoteComment,
  authUser,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const upVoteHandler = () => {
    onUpVoteComment(id, isUpVoted, isDownVoted);
  };

  const downVoteHandler = () => {
    onDownVoteComment(id, isUpVoted, isDownVoted);
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
      <div className="thread-item__body comment__body">{parse(content)}</div>
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

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentShape,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};

export { commentShape };

export default CommentItem;
