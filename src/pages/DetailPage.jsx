import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThreadDetailItem from '../components/ThreadDetailItem';
import {
  asyncAddComment,
  asyncDownVoteComment,
  asyncDownVoteDetailThread,
  asyncNeutralVoteComment,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteDetailThread,
  toogleDownVoteCommentActionCreator,
  toogleDownVoteDetailThreadActionCreator,
  toogleUpVoteCommentActionCreator,
  toogleUpVoteDetailThreadActionCreator,
} from '../states/threadDetail/action';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { asyncNeutralVoteThread } from '../states/threads/action';
import Title from '../components/styled/Title';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const addComment = ({ content, threadId }) => {
    dispatch(asyncAddComment({ content, threadId }));
  };

  const onUpVoteDetailThread = (threadId, isUpVoted, isDownVoted) => {
    if (isUpVoted === false && isDownVoted === false) {
      // inisial vote saat like atau dislike kosong
      dispatch(asyncUpVoteDetailThread({ threadId }));
    } else if (isUpVoted === true && isDownVoted === false) {
      // untuk unvote btn like
      dispatch(toogleUpVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(asyncNeutralVoteThread({ threadId }));
    } else if (isUpVoted === false && isDownVoted === true) {
      // supaya user hanya memilih like atau dislike saja
      dispatch(toogleDownVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(asyncUpVoteDetailThread({ threadId }));
    }
  };
  const onDownVoteDetailThread = (threadId, isDownVoted, isUpVoted) => {
    if (isUpVoted === false && isDownVoted === false) {
      dispatch(asyncDownVoteDetailThread({ threadId }));
    } else if (isDownVoted === true && isUpVoted === false) {
      dispatch(toogleDownVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(asyncNeutralVoteThread({ threadId }));
    } else if (isDownVoted === false && isUpVoted === true) {
      dispatch(toogleUpVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(asyncDownVoteDetailThread({ threadId }));
    }
  };

  const onUpVoteComment = (commentId, isUpVoted, isDownVoted) => {
    if (isUpVoted === false && isDownVoted === false) {
      dispatch(asyncUpVoteComment({ commentId }));
    } else if (isUpVoted === true && isDownVoted === false) {
      dispatch(toogleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      dispatch(asyncNeutralVoteComment({ commentId }));
    } else if (isUpVoted === false && isDownVoted === true) {
      dispatch(toogleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      dispatch(asyncUpVoteComment({ commentId }));
    }
  };

  const onDownVoteComment = (commentId, isUpVoted, isDownVoted) => {
    if (isUpVoted === false && isDownVoted === false) {
      dispatch(asyncDownVoteComment({ commentId }));
    } else if (isDownVoted === true && isUpVoted === false) {
      dispatch(toogleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      dispatch(asyncNeutralVoteComment({ commentId }));
    } else if (isDownVoted === false && isUpVoted === true) {
      dispatch(toogleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      dispatch(asyncDownVoteComment({ commentId }));
    }
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <Title>Detail Thread</Title>
      <ThreadDetailItem
        {...threadDetail}
        authUser={authUser.id}
        onUpVoteDetailThread={onUpVoteDetailThread}
        onDownVoteDetailThread={onDownVoteDetailThread}
      />
      <CommentInput addComment={addComment} threadId={id} />
      <CommentList
        comments={threadDetail.comments}
        onUpVoteComment={onUpVoteComment}
        onDownVoteComment={onDownVoteComment}
        authUser={authUser.id}
      />
    </section>
  );
}

export default DetailPage;
