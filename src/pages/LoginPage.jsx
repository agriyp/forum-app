import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <article className="login-page__main">
        <h2>Login</h2>
        <LoginInput login={onLogin} />
        <p>
          Belum punya akun ? <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
