const initialState = {
  nama: '',
  email: '',
  sdh_daftar: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OnLogin':
      return Object.assign({}, state, action.payload);
    case 'USER_RESET':
      return {...state, sdh_daftar: false} ;
    default:
      return state;
  }
};
