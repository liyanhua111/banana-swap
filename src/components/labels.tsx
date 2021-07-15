import { CurrencyContextState } from "../utils/currencyPair";
import { getTokenName, KnownTokenMap, getPoolName } from "../utils/utils";
import { PoolInfo } from "../models";
import { useTranslation } from 'react-i18next'

export const CREATE_POOL_LABEL = "Create Liquidity Pool";
export const INSUFFICIENT_FUNDS_LABEL = (tokenName: string) =>
  `Insufficient ${tokenName} funds`;
export const POOL_NOT_AVAILABLE = (tokenA: string, tokenB: string) =>
  `Pool ${tokenA}/${tokenB} doesn't exsist`;
export const ADD_LIQUIDITY_LABEL = "Provide Liquidity";
export const SWAP_LABEL = "Swap";
export const CONNECT_LABEL  = () => {
  //  return `${type=='en'?"Connect Wallet":'连接钱包'}` 
   return"Connect Wallet"
};
export const SELECT_TOKEN_LABEL = "Select a token";
export const ENTER_AMOUNT_LABEL = (lang:String) => {
   return `${lang=='en'?"Enter an amount":'输入数量'}` 
};
export const REMOVE_LIQUIDITY_LABEL = "Remove Liquidity";

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
    ? CONNECT_LABEL()
    : !A.mintAddress
    ? SELECT_TOKEN_LABEL
    : !A.amount
    ? ENTER_AMOUNT_LABEL(lang)
    : !B.mintAddress
    ? SELECT_TOKEN_LABEL
    : !B.amount
    ? ENTER_AMOUNT_LABEL(lang)
    : !A.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, A.mintAddress))
    : ignoreToBalance || B.sufficientBalance()
    ? action
    : INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, B.mintAddress));
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
    ? CONNECT_LABEL()
    : !amount
    ? ENTER_AMOUNT_LABEL(lang)
    : !hasSufficientBalance
    ? INSUFFICIENT_FUNDS_LABEL(getPoolName(tokenMap, pool))
    : REMOVE_LIQUIDITY_LABEL;
};

export const generateExactOneLabel = (
  connected: boolean,
  tokenMap: KnownTokenMap,
  lang:String,
  token?: CurrencyContextState
) => {
  return !connected
    ? CONNECT_LABEL()
    : !token
    ? SELECT_TOKEN_LABEL
    : !parseFloat(token.amount || "")
    ? ENTER_AMOUNT_LABEL((lang))
    : !token.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, token.mintAddress))
    : ADD_LIQUIDITY_LABEL;
};
