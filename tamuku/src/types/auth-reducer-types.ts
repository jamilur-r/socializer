export interface UserType {
  id?: string;
  username: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
  role: string;
  date_of_birth?: string;
  profile_picture?: string;
  profile_banner?: string;
}

export interface AuthType {
  isAuth: boolean;
  token: string | null;
  user: UserType | null;
}

const SIGNIN = "signin";
const SIGNUP = "signup";
const LOGOUT = "logout";
const ERROR = "error";

interface SignInAction {
  type: typeof SIGNIN;
  payload: AuthType;
}

interface SignUpAction {
  type: typeof SIGNUP;
  payload: AuthType;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface ERRORACTION {
  type: typeof ERROR;
}

export type AuthActions =
  | SignInAction
  | SignUpAction
  | LogoutAction
  | ERRORACTION;
