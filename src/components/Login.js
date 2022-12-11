import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

function Login() {
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [error, setError] = useState(false);
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPassword.current.value
      );
    } catch (error) {
      console.error(error.message);
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Login</h3>
        <form className="form-login" onSubmit={(e) => handleLogin(e)}>
          <span>{error && 'Email or password invalid!'}</span>
          <input
            type="email"
            placeholder="Email"
            name="login email"
            id="login-email"
            ref={loginEmail}
          />
          <input
            type="password"
            placeholder="Password"
            name="login password"
            id="login-password"
            ref={loginPassword}
          />
          <input
            type="submit"
            placeholder="Log In now"
            name="login submit"
            id="login-submit"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
