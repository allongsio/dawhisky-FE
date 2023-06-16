import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from 'styled-components';
import { Layout } from '../../components';

const LoginOauth = () => {
  const navigate = useNavigate();
  const AUTH_CODE = window.location.search.split('=')[1];

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login/user`, { code: AUTH_CODE })
      .then((response) => {
        localStorage.setItem('authorization', response.data.authorization);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', response.data.user);
        alert(response.data.message);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <Layout>
      <EmptyDiv>{''}</EmptyDiv>
    </Layout>
  );
};

export default LoginOauth;

const EmptyDiv = styled.div``;
