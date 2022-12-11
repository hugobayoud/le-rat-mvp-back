import React from 'react';
import { Navigate } from 'react-router-dom';

import ConnectModal from '../components/ConnectModal';
import { useAuthState } from '../utils/firebase.config';

function HomePage() {
  const { user } = useAuthState();

  return (
    <div>
      <div className="app-header">
        {user && (
          <div className="user-infos">
            <span>{user.displayName[0]}</span>
            <h4>{user.displayName}</h4>
          </div>
        )}
        {user ? <Navigate to="/expenses" /> : <ConnectModal />}
      </div>
      <div className="posts-container"></div>
    </div>
  );
}

export default HomePage;
