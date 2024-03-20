import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList({ threads, onUpVoteThread, onDownVoteThread }) {
  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          onUpVoteThread={onUpVoteThread}
          onDownVoteThread={onDownVoteThread}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  onUpVoteThread: PropTypes.func.isRequired,
  onDownVoteThread: PropTypes.func.isRequired,
};

export default ThreadsList;
