import { combineReducers } from 'redux';

const INITIAL_STATE = {
  user: {
    isAuthenticated: false,
  },
  meal_item: {},
  restaurant: {
    menu: [],
  },
};

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SETUSER': {
      const user = action.payload;

      const newState = {
        ...state,
        user: {
          get isAuthenticated() {
            if (user.uid) {
              return true;
            }
            return false;
          },
          ...user,
        },
      };
      return newState;
      
    }
    case 'SETRESTAURANT': {
      const restaurant = action.payload;

      const newState = {
        ...state,
        restaurant: { ...state.restaurant, ...restaurant },
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
    case 'ADDMEALITEM': {
      const meal_item = action.payload;

      const newState = {
        ...state,
        meal_item: { ...state.meal_item, ...meal_item },
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
