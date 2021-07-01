export const changeHamburgerFunc = (data) => {
  return (dispatch) => {
    (() => {
      dispatch({
        type: "changeHamburger",
        data,
      });
    })();
  };
};
