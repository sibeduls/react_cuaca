export function ubahLoading(MshLoading,Pesan="") {
    return {type: 'APP_LOADING', payload:{isLoading:MshLoading, Msg:Pesan} };
};

export function ResetLoadingApp() {
  return {type: 'APP_RESET', payload:null};
};  