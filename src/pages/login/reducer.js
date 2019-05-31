
const defaultState = {
    loginError:{}
};

export default (state = {}, action) => {
    switch (action.type) {

      case 'LOGIN:DO_LOGIN':
        return { ...state, defaultState }

      case 'LOGIN:DO_LOGIN:FAIL':
        return { ...state, loginError: action.error }
        
      default:
        return state;
    }
  };