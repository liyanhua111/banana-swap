import S from "./request";

export const setPool = (obj) => S.post("v2/setPool", obj);
