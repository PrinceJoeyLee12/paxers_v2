declare module State {
  interface Root extends RouterRootState {
    admin: Admin;
    user: User;
  }

  interface User {
    data: UserData;
    token: string | null;
    error: string | null;
    loading: boolean;
  }

  interface UserData {
    firstName: string;
    lastName: string;
  }

  interface Admin {
    adminAuthStatus: AdminStatus;
    error: string | null;
    loading: boolean;
  }

  interface AdminStatus {
    isAdmin: boolean;
  }
}
