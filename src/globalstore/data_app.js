const initialState = {
  isLoading:false,
  Msg:"",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APP_LOADING':
      return action.payload;
    case 'APP_RESET':
      return state  ;
    default:
      return state;
  }
};
