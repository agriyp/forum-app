import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncPopulateUsersAndThread } from '../states/shared/action';
import ThreadsList from '../components/ThreadsList';
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
  toogleDownVoteThreadActionCreator,
  toogleUpVoteThreadActionCreator,
} from '../states/threads/action';
import CategoryThread from '../components/CategoryThread';
import { getUniqueCategory } from '../utils';
import { filterCategoryBy } from '../states/filterCategory/action';

function HomePage() {
  const { threads = [], users = [], authUser, filterCategory } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThread());
  }, [dispatch]);

  const onUpVoteThread = (threadId, isUpVoted, isDownVoted) => {
    if (isUpVoted === false && isDownVoted === false) {
      // inisial vote saat like atau dislike kosong
      dispatch(asyncUpVoteThread({ threadId }));
    } else if (isUpVoted === true && isDownVoted === false) {
      // untuk unvote btn like
      dispatch(toogleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(asyncNeutralVoteThread({ threadId }));
    } else if (isUpVoted === false && isDownVoted === true) {
      // supaya user hanya memilih like atau dislike saja
      dispatch(toogleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(asyncUpVoteThread({ threadId }));
    }
  };
  const onDownVoteThread = (threadId, isDownVoted, isUpVoted) => {
    if (isUpVoted === false && isDownVoted === false) {
      dispatch(asyncDownVoteThread({ threadId }));
    } else if (isDownVoted === true && isUpVoted === false) {
      dispatch(toogleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(asyncNeutralVoteThread({ threadId }));
    } else if (isDownVoted === false && isUpVoted === true) {
      dispatch(toogleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(asyncDownVoteThread({ threadId }));
    }
  };

  const uniqueCategory = getUniqueCategory(threads);
  const onCLickCategory = (event, category) => {
    if (event.target.classList.contains('selected')) {
      // untuk menghapus class selected pada btn yg klik
      event.target.classList.remove('selected');
      dispatch(filterCategoryBy(''));
    } else {
      // untuk menghapus class selected dr semua element btn
      document.querySelectorAll('.list-category-item').forEach((element) => {
        element.classList.remove('selected');
      });
      // untuk menambah class selected
      event.target.classList.add('selected');
      dispatch(filterCategoryBy(category));
    }
  };

  const filteredThreads =
    filterCategory === ''
      ? threads
      : threads.filter((thread) => thread.category === filterCategory);

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <>
      <CategoryThread uniqueCategory={uniqueCategory} onCLickCategory={onCLickCategory} />
      <section className="home-page">
        <Link to="/threads/add" className="btn__add-thread">
          +
        </Link>
        <h2>Diskusi Tersedia</h2>
        <ThreadsList
          threads={threadList}
          onUpVoteThread={onUpVoteThread}
          onDownVoteThread={onDownVoteThread}
        />
      </section>
    </>
  );
}

export default HomePage;
