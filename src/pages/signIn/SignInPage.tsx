import React from 'react';
import styles from './SignInPage.module.css'
import { UserLayout } from '../../layouts/userLayout';
import { SignInForm } from './SigninFrom';

export const SignInPage: React.FC = (props) => {
  // console.log(props);
  
  return (
    <UserLayout>
      <SignInForm/>
    </UserLayout>
  )
}