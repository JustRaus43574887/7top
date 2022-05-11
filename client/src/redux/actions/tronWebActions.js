export const setTronWeb = (state = null) => (dispatch) => {
  dispatch({ type: "TRON_WEB", payload: state });
};
