import React, { useRef } from 'react';
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

function SignUp() {
  const registerEmail = useRef();
  const registerPassword = useRef();
  const registerPseudo = useRef();
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail.current.value,
        registerPassword.current.value
      );

      await updateProfile(auth.currentUser, {
        displayName: registerPseudo.current.value,
      });

      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <h3>Sign up</h3>
        <form onSubmit={async (e) => await handleRegister(e)}>
          <input
            type="text"
            placeholder="Pseudo"
            required
            ref={registerPseudo}
          />
          <input
            type="email"
            placeholder="Email"
            required
            ref={registerEmail}
          />
          <input
            type="password"
            placeholder="Password"
            required
            ref={registerPassword}
          />
          <input type="submit" value="Sign up now" />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
