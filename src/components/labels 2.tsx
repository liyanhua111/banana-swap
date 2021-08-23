import { CurrencyContextState } from "../utils/currencyPair";
import { getTokenName, KnownTokenMap, getPoolName } from "../utils/utils";
import { PoolInfo } from "../models";
import { useTranslation } from 'react-i18next'

export const CREATE_POOL_LABEL = (lang: String) => {
  return `${lang=='en'?"Create Liquidity Pool":'创建流动池'}` 
};
export const INSUFFICIENT_FUNDS_LABEL = (lang: String, tokenName: string) => {
  return `${lang=='en'?`Insufficient ${tokenName} funds`:`${tokenName} 资金不足`}` 
}
export const POOL_NOT_AVAILABLE = (lang: String,tokenA: string, tokenB: string) => {
  return `${lang=='en'?`Pool ${tokenA}/${tokenB} doesn't exsist`:`池子 ${tokenA}/${tokenB} 不存在`}` 
}
export const ADD_LIQUIDITY_LABEL =  (lang: String)=> {
  return `${lang=='en'?"Provide Liquidity":"提供流动性"}` 
};
export const SWAP_LABEL  = (lang: String)=> {
  return `${lang=='en'?"Swap":"兑换"}` 
}; 
export const CONNECT_LABEL  = (lang: String) => {
  return `${lang=='en'?"Connect Wallet":'连接钱包'}` 
};
export const SELECT_TOKEN_LABEL = (lang: String) => {
  return `${lang=='en'?"Select a token":"选择一个币种"}`
};
export const ENTER_AMOUNT_LABEL = (lang: String) => {
  // const data:{ [k:string]:string } = {
  //   "en": "Enter an amount",
  //   "zh":"输入数量"
  // }
  //  return data[lang]
   return `${lang=='en'?"Enter an amount":'输入数量'}` 
};
export const REMOVE_LIQUIDITY_LABEL = (lang: String) => {
  return `${lang=='en'?"Remove Liquidity":"移除流动性"}`
};

export const generateActionLabel = (
  lang:String,
  action: string,
  connected: boolean,
  tokenMap: KnownTokenMap,
  A: CurrencyContextState,
  B: CurrencyContextState,
  ignoreToBalance: boolean = false,
) => {
  return !connected
    ? CONNECT_LABEL(lang)
    : !A.mintAddress
    ? SELECT_TOKEN_LABEL(lang)
    : !A.amount
    ? ENTER_AMOUNT_LABEL(lang)
    : !B.mintAddress
    ? SELECT_TOKEN_LABEL(lang)
    : !B.amount
    ? ENTER_AMOUNT_LABEL(lang)
    : !A.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(lang,getTokenName(tokenMap, A.mintAddress))
    : ignoreToBalance || B.sufficientBalance()
    ? action
    : INSUFFICIENT_FUNDS_LABEL(lang,getTokenName(tokenMap, B.mintAddress));
};

export const generateRemoveLabel = (
  lang:String,
  connected: boolean,
  amount: number,
  pool: PoolInfo,
  tokenMap: KnownTokenMap,
  hasSufficientBalance: boolean,
  ignoreToBalance: boolean = false,
) => {
  return !connected
    ? CONNECT_LABEL(lang)
    : !amount
    ? ENTER_AMOUNT_LABEL(lang)
    : !hasSufficientBalance
    ? INSUFFICIENT_FUNDS_LABEL(lang,getPoolName(tokenMap, pool))
    : REMOVE_LIQUIDITY_LABEL(lang);
};

export const generateExactOneLabel = (
  lang:String,
  connected: boolean,
  tokenMap: KnownTokenMap,
  token?: CurrencyContextState
) => {
  return !connected
    ? CONNECT_LABEL(lang)
    : !token
    ? SELECT_TOKEN_LABEL(lang)
    : !parseFloat(token.amount || "")
    ? ENTER_AMOUNT_LABEL((lang))
    : !token.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(lang,getTokenName(tokenMap, token.mintAddress))
    : ADD_LIQUIDITY_LABEL(lang);
};
