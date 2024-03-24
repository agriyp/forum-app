import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import UserList from '../components/UserList';
import Title from '../components/styled/Title';

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
      <Title>Klasemen Pengguna Aktif</Title>
      <UserList leaderboards={leaderboards} authUser={authUser.id} />
    </section>
  );
}

export default LeaderboardPage;
