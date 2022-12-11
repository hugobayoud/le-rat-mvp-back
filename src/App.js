import {
  Route,
  Routes,
  Outlet,
  Navigate,
  BrowserRouter,
} from 'react-router-dom';
import React from 'react';

import HomePage from './routes/HomePage';
import ErrorPage from './routes/ErrorPage';
import ExpensesPage from './routes/ExpensesPage';
import { AuthContextProvider, useAuthState } from './utils/firebase.config';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/expenses" element={<AuthenticatedOutlet />}>
            <Route path="" element={<ExpensesPage />} />
          </Route>

          <Route path="*" element={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

function AuthenticatedOutlet() {
  const { isAuthenticated } = useAuthState();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default App;
