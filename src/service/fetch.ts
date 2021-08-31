import S from "./request";

export const setPoolHttp = (obj:object) => S.post("v2/setPool", obj);
export const getTickerHttp = (obj:object) => S.get("v2/ticker", obj);
export const getMarketInfoHttp = (obj?:object) => S.get("v2/marketInfo", obj);
export const setTransactions = (obj?:object) => S.get("v2/setTransactions", obj);
