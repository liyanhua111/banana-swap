import { CHANGEHAMBURGER } from "./constant";

//同步action，就是指action的值为Object类型的一般对象
export const changeHamburgerAction = (data) => ({
  type: CHANGEHAMBURGER,
  data,
});
