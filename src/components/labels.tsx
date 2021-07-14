import { CurrencyContextState } from "../utils/currencyPair";
import { getTokenName, KnownTokenMap, getPoolName } from "../utils/utils";
import { PoolInfo } from "../models";
import { useTranslation } from 'react-i18next'

export const CREATE_POOL_LABEL  = () => {
  const { i18n } = useTranslation();
  return `${i18n.language=='en'?"Create Liquidity Pool":'创建流动池'}` 
};
export const INSUFFICIENT_FUNDS_LABEL = (tokenName: string) => {
  const { i18n } = useTranslation();
  return `${i18n.language=='en'?`Insufficient ${tokenName} funds`:`${tokenName} 资金不足`}` 
}
   
export const POOL_NOT_AVAILABLE = (tokenA: string, tokenB: string) => {
  const { i18n } = useTranslation();
  return `${i18n.language=='en'?`Pool ${tokenA}/${tokenB} doesn't exsist`:`池子 ${tokenA}/${tokenB} 不存在`}` 
}
export const ADD_LIQUIDITY_LABEL = ()=> {
  const { i18n } = useTranslation();
  return `${i18n.language=='en'?"Provide Liquidity":"提供流动性"}` 
};
export const SWAP_LABEL  = ()=> {
  const { i18n } = useTranslation();
  return `${i18n.language=='en'?"Swap":"兑换"}` 
}; 
export const CONNECT_LABEL  = () => {
  const { i18n } = useTranslation();
  return `${i18n.language=='en'?"Connect Wallet":'连接钱包'}` 
};
export const SELECT_TOKEN_LABEL = () => {
  const { i18n } = useTranslation();
  return `${i18n.language=='en'?"Select a token":"选择一个币种"}`
};
export const ENTER_AMOUNT_LABEL = () => {
  const { i18n } = useTranslation();
  return `${i18n.language=='en'?"Enter an amount":"输入数量"}`
};
export const REMOVE_LIQUIDITY_LABEL = () => {
  const { i18n } = useTranslation();
  return `${i18n.language=='en'?"Remove Liquidity":"移除流动性"}`
};

export const generateActionLabel = (
  action: string,
  connected: boolean,
  tokenMap: KnownTokenMap,
  A: CurrencyContextState,
  B: CurrencyContextState,
  ignoreToBalance: boolean = false
) => {
  return !connected
    ? CONNECT_LABEL()
    : !A.mintAddress
    ? SELECT_TOKEN_LABEL()
    : !A.amount
    ? ENTER_AMOUNT_LABEL()
    : !B.mintAddress
    ? SELECT_TOKEN_LABEL()
    : !B.amount
    ? ENTER_AMOUNT_LABEL()
    : !A.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, A.mintAddress))
    : ignoreToBalance || B.sufficientBalance()
    ? action
    : INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, B.mintAddress));
};

export const generateRemoveLabel = (
  connected: boolean,
  amount: number,
  pool: PoolInfo,
  tokenMap: KnownTokenMap,
  hasSufficientBalance: boolean,
  ignoreToBalance: boolean = false
) => {
  return !connected
    ? CONNECT_LABEL()
    : !amount
    ? ENTER_AMOUNT_LABEL()
    : !hasSufficientBalance
    ? INSUFFICIENT_FUNDS_LABEL(getPoolName(tokenMap, pool))
    : REMOVE_LIQUIDITY_LABEL();
};

export const generateExactOneLabel = (
  connected: boolean,
  tokenMap: KnownTokenMap,
  token?: CurrencyContextState
) => {
  return !connected
    ? CONNECT_LABEL()
    : !token
    ? SELECT_TOKEN_LABEL()
    : !parseFloat(token.amount || "")
    ? ENTER_AMOUNT_LABEL()
    : !token.sufficientBalance()
    ? INSUFFICIENT_FUNDS_LABEL(getTokenName(tokenMap, token.mintAddress))
    : ADD_LIQUIDITY_LABEL();
};
