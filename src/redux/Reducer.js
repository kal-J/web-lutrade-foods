import { combineReducers } from 'redux';

const INITIAL_STATE = {
  user: {
    isAuthenticated: false,
  },
};

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SETUSER': {
      const user = action.payload;

      const newState = {
        ...state,
        user: { isAuthenticated: true, ...user },
      };
      return newState;
    }
    case 'SETLOADING': {
      const value = action.payload;

      const newState = {
        ...state,
        loading: value,
      };
      return newState;
    }
    case 'SETERROR': {
      const error = action.payload;

      const newState = {
        ...state,
        error: error,
      };
      return newState;
    }

    default:
      return state;
  }
};

export default combineReducers({
  reducer: mainReducer,
});
