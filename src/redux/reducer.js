import { CHANGEHAMBURGER } from "./constant";
export default function hamburgerReducer(preState = false, action) {
  const { type, data } = action;
  switch (type) {
    case CHANGEHAMBURGER:
      return data;
    default:
      return preState;
  }
}
