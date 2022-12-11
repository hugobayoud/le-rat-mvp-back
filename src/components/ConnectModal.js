import React, { useState } from 'react';

import Login from './Login';
import SignUp from './SignUp';

function ConnectModal() {
  const [signUp, setSignUp] = useState(true);

  return (
    <div className="connect-modal">
      <div className="header-btn">
        <button
          style={{ background: signUp ? 'rgb(28,28,28)' : 'rgb(83,83,83)' }}
          onClick={() => setSignUp(true)}
        >
          Sign up
        </button>
        <button
          style={{ background: signUp ? 'rgb(83,83,83)' : 'rgb(28,28,28)' }}
          onClick={() => setSignUp(false)}
        >
          Login
        </button>
      </div>
      {signUp ? <SignUp /> : <Login />}
    </div>
  );
}

export default ConnectModal;
