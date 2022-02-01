export {};
declare global {
  interface Action {
    payload: any;
    type: string;
  }

  interface ResponseGenerator {
    data?: any;
    response?: any;
    status?: any;
  }

  interface AppState {
    loading: boolean;
  }

  interface AuthState {
    loading: boolean;
  }
}
