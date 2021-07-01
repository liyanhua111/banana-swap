const init = {
  hamburger: false,
};

export default (state = init.hamburger, action) => {
  console.log("aqwe", action);
  switch (action.type) {
    case "changeHamburger":
      return !state;
    default:
      return state;
  }
};
