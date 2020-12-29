import React, { Dispatch, useEffect, useMemo, useReducer } from "react";

import { AuthActions, Auth, AuthDefaults } from "../CustomTypes/Auth.d";

const initialDispatch: Dispatch<AuthActions> = (value: AuthActions): void => {};

export const AuthStateContext = React.createContext(AuthDefaults);
export const AuthDispatchContext = React.createContext(initialDispatch);

const AuthContextProvider = (props: any) => {
  const { children } = props;
  const [authState, authDispatch] = useReducer(authReducer, AuthDefaults);

  // Initial load of auth
  useEffect(() => {
    const localToken: string = localStorage.getItem("token") || "";
    console.log("initial load of auth: token: ", localToken);
    authDispatch({ token: localToken });
  }, []);

  const context = useMemo(() => {
    return { authState: authState, authDispatch: authDispatch };
  }, [authState, authDispatch]);

  return (
    <AuthStateContext.Provider value={context.authState}>
      <AuthDispatchContext.Provider value={authDispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthContextProvider;

const authReducer = (state: Auth, action: AuthActions): any => {
  switch (action.type) {
    case "SET_TOKEN": {
      localStorage.setItem("token", action.token);
      return action.token;
    }
    default: {
      localStorage.setItem("token", action.token);
      return action.token;
    }
  }
};
