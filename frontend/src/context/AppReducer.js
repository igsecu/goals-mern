export const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
      };
    }
    case "LOADED": {
      return {
        ...state,
        loaded: action.payload,
      };
    }
    case "POST_LOW": {
      return {
        ...state,
        low: action.payload,
      };
    }
    case "POST_MEDIUM": {
      return {
        ...state,
        medium: action.payload,
      };
    }
    case "POST_HIGH": {
      return {
        ...state,
        high: action.payload,
      };
    }
    case "POST_COMPLETED": {
      return {
        ...state,
        completed: action.payload,
      };
    }
    case "UPDATE_GOAL": {
      return {
        ...state,
        low: state.low.map((l) =>
          l._id === action.payload._id ? action.payload : l
        ),
      };
    }
    default:
      return state;
  }
};
