import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from 'container/LoginContainer/slice';

const Auth = ({ children }) => {
  const dispatch = useDispatch();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOGINUSER));
  } catch (err) {
    console.error('Invalid user data in localStorage:', err);
  }

  // Fix: user.role is directly available at the top level
  const isAuthenticated = user && user.role;

  useEffect(() => {
    if (isAuthenticated && user?.user) {
      dispatch(loginUser(user.user));
    }
  }, [dispatch, isAuthenticated, user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Auth;
