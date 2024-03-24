import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentShape } from './CommentItem';
import Title from './styled/Title';

function CommentList({ comments, onUpVoteComment, onDownVoteComment, authUser }) {
  return (
    <div className="threads-list threads-list__comment">
      <Title>{`Komentar (${comments.length})`}</Title>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          onUpVoteComment={onUpVoteComment}
          onDownVoteComment={onDownVoteComment}
          authUser={authUser}
        />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};

export default CommentList;
