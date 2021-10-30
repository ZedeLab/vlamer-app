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
import { selectError, notifyError, notifyErrorResolved } from "../store/errors";

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
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(errors);
  const signInWithFacebook = () => {
    console.log("Sing in with Facebook");
  };

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (googleAccount.type === "success") {
        const { email } = googleAccount.user;

        const account = await getUserByEmail(email);
        return account;
      } else {
        notifyError({
          type: "auth",
          message: "Problem authenticating your google account",
        });
      }
    } catch (error) {
      dispatch(
        notifyError({
          type: "auth",
          message: "Problem fetching google account",
        })
      );
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const auth = getAuth();
      const account = await signInWithEmailAndPassword(auth, email, password);
      return account;
    } catch (error) {
      dispatch(
        notifyError({
          type: "auth",
          message: "Wrong credentials",
        })
      );
    }
  };

  const signUpWithEmail = async (firstName, lastName, email, password) => {
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

      if (newAccount) return newAccount;
      else {
        console.log("Problem adding account: ", error);
      }
    } catch (error) {
      console.log("Wrong credentials: ", error);
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
