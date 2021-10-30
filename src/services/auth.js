import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

import * as Google from "expo-google-app-auth";
import { GOOGLE_ANDROID_CLIENT_ID } from "@env";
import { addNewUser, getUserByEmail } from "./db";
import { selectError, notifyError } from "../store/errors";
import {
  notifyLoadingFinish,
  notifyLoadingStart,
  selectLoading,
} from "../store/loading";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const errors = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const signInWithFacebook = () => {
    console.log("Sing in with Facebook");
  };

  const signInWithGoogle = async () => {
    dispatch(notifyLoadingStart({ type: "auth" }));
    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (googleAccount.type === "success") {
        const { email } = googleAccount.user;

        const account = await getUserByEmail(email);
        dispatch(notifyLoadingFinish());
        return account;
      } else {
        dispatch(
          notifyError({
            type: "auth",
            message: "Problem authenticating your google account",
          })
        );
      }
    } catch (error) {
      dispatch(
        notifyError({
          type: "auth",
          message: "Problem fetching google account",
        })
      );
    }
    dispatch(notifyLoadingFinish());
  };

  const signInWithEmail = async (email, password) => {
    dispatch(notifyLoadingStart({ type: "auth" }));
    try {
      const auth = getAuth();
      const account = await signInWithEmailAndPassword(auth, email, password);
      dispatch(notifyLoadingFinish());
      return account;
    } catch (error) {
      dispatch(notifyLoadingFinish());
      dispatch(
        notifyError({
          type: "auth",
          message: "Wrong credentials",
        })
      );
    }
  };

  const signUpWithEmail = async (firstName, lastName, email, password) => {
    dispatch(notifyLoadingStart({ type: "auth" }));
    try {
      const auth = getAuth();
      const account = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const [newAccount, error] = await addNewUser({
        firstName,
        lastName,
        email,
      });

      dispatch(notifyLoadingFinish());
      if (newAccount) return newAccount;
      else {
        console.log("Problem adding account: ", error);
      }
    } catch (error) {
      dispatch(
        notifyError({
          type: "auth",
          message: "Account already exist",
        })
      );
      dispatch(notifyLoadingFinish());
    }
  };

  return {
    user,
    signUpWithEmail,
    signInWithEmail,
    signInWithFacebook,
    signInWithGoogle,
  };
}
