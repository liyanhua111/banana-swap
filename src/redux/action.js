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
export const toggleCollapsedFunc = (data) => {
  return (dispatch) => {
    (() => {
      dispatch({
        type: "toggleCollapsed",
        data,
      });
    })();
  };
};
