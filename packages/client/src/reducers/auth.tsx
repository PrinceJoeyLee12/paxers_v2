import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: {
    image: '',
    firstName: '',
    lastName: '',
    mySports: '',
    gender: 'Male',
    myLocation: {
      country: 'Philippines',
      city: '',
      barangay: '',
    },
    events: {},
    birthDate: '',
    contactNumber: '',
    eventsLiked: [],
  },
};

// eslint-disable-next-line
export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      // return {
      //   ...state,
      //   isAuthenticated: true,
      //   loading: false,
      //   user: { ...state.user, ...payload },
      // };
      return {
        ...state,
        ...payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAILURE:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: { ...initialState.user },
      };
    default:
      return state;
  }
}
