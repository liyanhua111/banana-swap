import { combineReducers } from "redux";

const init = {
  hamburger: true,
  collapsed: false,
};

const hamburger = (state = init.hamburger, action) => {
  switch (action.type) {
    case "changeHamburger":
      return !state;
    default:
      return state;
  }
};
const collapsed = (state = init.collapsed, action) => {
  switch (action.type) {
    case "toggleCollapsed":
      return !state;
    default:
      return state;
  }
};

//汇总所有的reducer变为一个总的reducer
export default combineReducers({
  hamburger,
  collapsed,
});
