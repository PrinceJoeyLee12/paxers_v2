declare module State {
  interface Root extends RouterRootState {
    user: User;
  }

  interface User {
    data: UserData;
    token: string;
    error: string | null;
    loading: boolean;
  }

  interface UserData {
    firstName: string;
    lastName: string;
  }
}
