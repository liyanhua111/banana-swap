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
export const myPoolsLoadingFunc = (data) => {
  return (dispatch) => {
    (() => {
      dispatch({
        type: "myPoolsLoading",
        data,
      });
    })();
  };
};
