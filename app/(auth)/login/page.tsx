import React from 'react';
import LoginForm from '../_components/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Core Web Vitals Monitor',
}

const Login = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl md:text-3xl text-center">
        Welcome Back
      </h1>
      <LoginForm />
    </>
  );
};

export default Login;
