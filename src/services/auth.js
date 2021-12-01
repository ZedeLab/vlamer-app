import React, { useState, useEffect, useContext, createContext } from 'react';
import { v4 as uuid } from 'uuid';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';

import * as Google from 'expo-google-app-auth';
import { GOOGLE_ANDROID_CLIENT_ID } from '@env';
import { addNewUser } from '../db/queries/user';

import { notifyError } from '../store/errors';
import {
  resetCurrentUserConnections,
  setCurrentUserVolt,
  resetCurrentUser,
  resetCurrentUserVolt,
} from '../store/actors';
import { notifyLoadingFinish, notifyLoadingStart } from '../store/loading';

import { useStaticData } from './staticURLs';
import { getUserByEmail } from '../db/queries/user';
import { addNewUserVolt, getUserVolt } from '../db/queries/user/volt';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const { getRandomAvatar, getRandomCoverImage } = useStaticData();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const signInWithFacebook = () => {
    console.log('Sing in with Facebook');
  };

  useEffect(async () => {
    const auth = getAuth();
    const unsubscribe = await onAuthStateChanged(auth, async (user) => {
      dispatch(notifyLoadingStart({ type: 'auth' }));

      if (user) {
        const [account, error] = await getUserByEmail(user.email);
        const [volt, voltError] = await getUserVolt(account.id);

        // const [likes, likesError] = await getVlamLikesByUserId(account.id);
        if (account && volt) {
          setUser(account);
          dispatch(setCurrentUserVolt(volt));
          // dispatch(setCurrentUserLikes(likes));
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
        dispatch(resetCurrentUser());
        dispatch(resetCurrentUserVolt());
      }
      dispatch(notifyLoadingFinish());
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const googleAccount = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (googleAccount.type === 'success') {
        const { email } = googleAccount.user;

        const account = await getUserByEmail(email);
        setUser(account);
        return account;
      } else {
        dispatch(
          notifyError({
            type: 'auth',
            message: 'Problem authenticating your google account',
          })
        );
      }
    } catch (error) {
      dispatch(
        notifyError({
          type: 'auth',
          message: 'Problem fetching google account',
        })
      );
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const auth = getAuth();
      const account = await signInWithEmailAndPassword(auth, email, password);
      setUser(account.user);
      return account.user;
    } catch (error) {
      dispatch(
        notifyError({
          type: 'auth',
          message: 'Wrong credentials',
        })
      );
    }
  };

  const signUpWithEmail = async (firstName, lastName, email, password) => {
    try {
      const auth = getAuth();
      const account = await createUserWithEmailAndPassword(auth, email, password);

      const [newAccount, error] = await addNewUser({
        id: account.user.uid,
        username: firstName + uuid().substr(0, 4),
        firstName: firstName,
        lastName: lastName,
        email: account.user.email,
        emailVerified: account.user.emailVerified,
        lastLoginAt: account.user.metadata.lastSignInTime,
        createdAt: account.user.metadata.creationTime,
        phoneNumber: null,
        avatarURL: getRandomAvatar().url,
        coverImageURL: getRandomCoverImage().url,
        gender: null,
      });

      if (newAccount) {
        const [newVoltAccount, accountVoltError] = await addNewUserVolt(account.user.uid);

        if (newVoltAccount) {
          setUser(newAccount);
          return newAccount;
        } else {
          console.log('\naccountVoltError: ', accountVoltError);
        }
      } else {
        console.log('newAccountError: ', error);
        dispatch(
          notifyError({
            type: 'auth',
            message: 'Account already exist',
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    const auth = getAuth();
    return await signOutFirebase(auth);
  };

  return {
    user,
    signOut,
    signUpWithEmail,
    signInWithEmail,
    signInWithFacebook,
    signInWithGoogle,
  };
}
