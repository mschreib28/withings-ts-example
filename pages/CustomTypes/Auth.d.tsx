export interface Auth {
  token: string;
  expires?: string;
  [key: string]: any;
}

export const AuthDefaults: Auth = {
  token: "",
  expires: "",
};

export interface AuthDispatch {
  authDispatch?: any;
}

export interface AuthActions {
  type?: string;
  token: string;
}
