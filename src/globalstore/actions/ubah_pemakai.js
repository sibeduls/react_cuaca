export function ubahSemuaTtgUser(objData) {
  return {
    type: 'OnLogin',
    payload: objData,
  };
};

export function ResetUSERApp() {
    return {type: 'USER_RESET', payload:null};
  };
