import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from "firebase/auth";

import * as Google from "expo-google-app-auth";
import { GOOGLE_ANDROID_CLIENT_ID } from "@env";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signInWithFacebook = () => {
    console.log("Sing in with Facebook");
  };

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      // dispatch(setSignInError('Wrong credentials'));
      // setLoading(false);
      console.log("Wrong credentials: ", error);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const auth = getAuth();
      const account = await signInWithEmailAndPassword(auth, email, password);
      console.log(account);
      return account;
    } catch (error) {
      // dispatch(setSignInError('Wrong credentials'));
      // setLoading(false);
      console.log("Wrong credentials: ", error);
    }
  };

  const signUpWithEmail = async (email, password) => {
    try {
      const account = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(account);
      return account;
    } catch (error) {
      // dispatch(setSignInError('Wrong credentials'));
      // setLoading(false);
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
