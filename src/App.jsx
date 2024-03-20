import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navigation from './components/Navigation';
import RegisterPage from './pages/RegisterPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import ThreadInput from './components/ThreadInput';
import DetailPage from './pages/DetailPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const { authUser = null, isPreload = false } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <div className="app-container">
          <main className="auth-page">
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container app-container__dashboard">
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/threads" />} />
            <Route path="/threads" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/threads/add" element={<ThreadInput />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
