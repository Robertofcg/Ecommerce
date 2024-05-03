// En un nuevo archivo llamado withAuth.js
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const auth = (Component) => {
  const AuthComponent = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
      const token = localStorage.getItem('token');
      setToken(token);
    }, []);

    if (!token) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default auth;
