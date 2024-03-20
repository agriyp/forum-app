import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import UserList from '../components/UserList';

function LeaderboardPage() {
  const { leaderboards = null, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (!leaderboards) {
    return null;
  }

  return (
    <section className="leaderboard-page">
      <h2>Klasemen Pengguna Aktif</h2>
      <UserList leaderboards={leaderboards} authUser={authUser.id} />
    </section>
  );
}

export default LeaderboardPage;
