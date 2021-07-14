import { useContext, createContext, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../../gql/UserQueries';
import {
  CHANGE_PASSWORD,
  LOGIN,
  CHANGE_PASSWORD_REQUEST,
  SIGNUP,
} from '../../gql/AuthMutations';

interface Context {
  user: { email: string; isCompany: boolean } | null;
  login: (email: string, password: string) => Promise<void>;
  userIsLoading: boolean;
  signup: (
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  changePasswordRequest: (email: string) => Promise<void>;
  changePassword: (
    newPassword: string,
    changePasswordToken: string
  ) => Promise<void>;
}

const UserContext = createContext<Context>(null);

export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }): JSX.Element => {
  const { refetch, data, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });
  const [loginMutation] = useMutation(LOGIN);

  const [signupMutation] = useMutation(SIGNUP);
  const [changePasswordRequestMutation] = useMutation(CHANGE_PASSWORD_REQUEST);
  const [changePasswordMutation] = useMutation(CHANGE_PASSWORD);

  const login = useCallback((email: string, password: string) => {
    return loginMutation({
      variables: {
        email,
        password,
      },
    }).then(
      (res) => {
        if (res.data.login.error) {
          return Promise.reject(res.data.login.error);
        }
        refetch();
        localStorage.setItem('token', res.data.login.token);
        return Promise.resolve();
      },
      (err) => {
        return Promise.reject(err.toString());
      }
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    refetch();
  }, []);

  const signup = useCallback(
    (email: string, phoneNumber: string, password: string) => {
      return signupMutation({
        variables: {
          email,
          phoneNumber,
          password,
        },
      }).then(
        (res) => {
          if (res.data.signup.error) {
            return Promise.reject(res.data.signup.error);
          }
          refetch();
          localStorage.setItem('token', res.data.signup.token);
          return Promise.resolve();
        },
        (err) => {
          return Promise.reject(err.toString());
        }
      );
    },
    []
  );

  const changePasswordRequest = useCallback(async (email: string) => {
    const res = await changePasswordRequestMutation({
      variables: {
        email,
      },
    });
    if (res.data.changePasswordRequest.error) {
      return Promise.reject(res.data.changePasswordRequest.error);
    }
  }, []);

  const changePassword = useCallback(
    async (newPassword: string, changePasswordToken: string) => {
      const res = await changePasswordMutation({
        variables: {
          newPassword,
          changePasswordToken,
        },
      });
      if (res.data.changePassword.error) {
        return Promise.reject(res.data.changePassword.error);
      }
    },
    []
  );

  return (
    <UserContext.Provider
      value={{
        user: data ? data.user : null,
        userIsLoading: loading,
        login,
        logout,
        signup,
        changePasswordRequest,
        changePassword,
      }}>
      {children}
    </UserContext.Provider>
  );
};
