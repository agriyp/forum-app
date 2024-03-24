import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Title from './styled/Title';

function CommentInput({ addComment, threadId }) {
  const [content, handleChangeContent] = useInput('');

  const addCommentHandler = (event) => {
    event.preventDefault();
    addComment({ content, threadId });
  };

  return (
    <section className="thread-input-container">
      <Title>Beri Komentar</Title>
      <form className="thread-input" onSubmit={addCommentHandler}>
        <textarea
          type="text"
          placeholder="Isikan komentar..."
          value={content}
          onChange={handleChangeContent}
          required
        />
        <button type="submit">Tambah</button>
      </form>
    </section>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentInput;
