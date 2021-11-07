import React, { useState, useEffect, useContext, createContext } from 'react';
import { v4 as uuid } from 'uuid';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';

import * as Google from 'expo-google-app-auth';
import { GOOGLE_ANDROID_CLIENT_ID } from '@env';
import { addNewUser, addNewUserConnection, getUserByEmail, getUserConnections } from './db';
import { selectError, notifyError } from '../store/errors';
import {
  resetCurrentUserConnections,
  setCurrentUserConnections,
  setCurrentUser,
  resetCurrentUser,
} from '../store/actors';
import { notifyLoadingFinish, notifyLoadingStart, selectLoading } from '../store/loading';

import { useStaticData } from './staticURLs';

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

        if (account) {
          const [connections, connectionsError] = await getUserConnections(account.id);

          if (connections) {
            dispatch(setCurrentUserConnections(connections));
            dispatch(setCurrentUser(account));
            setUser(account);
          } else {
            console.log(connectionsError);
            dispatch(
              notifyError({
                type: 'auth',
                message: 'Problem fetching account connections',
              })
            );
          }
        } else {
          dispatch(
            notifyError({
              type: 'auth',
              message: 'Problem fetching account',
            })
          );
        }
      } else {
        setUser(null);
        dispatch(resetCurrentUser());
        dispatch(resetCurrentUserConnections());
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
        username: account.user.displayName,
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
        const [newConnectionAccount, accountConnectionError] = await addNewUserConnection({
          id: uuid(),
          ownerAccountId: account.user.uid,
          connections: [],
        });

        if (newConnectionAccount) {
          return newAccount;
        }
      } else {
        console.log('Problem adding account: ', error);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        notifyError({
          type: 'auth',
          message: 'Account already exist',
        })
      );
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
