import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import { useSlippageConfig } from "./../../utils/connection";
import { NumericInput } from "./../numericInput";
import './style.less'

const MAX_SLIPPAGE = 25.0
const DEFAULT_MIN_SLIPPAGE = 0.1
export const Slippage = () => {
  const { t } = useTranslation();
  const { slippage, setSlippage } = useSlippageConfig();
  const slippagePct = new BigNumber(slippage).times(100).toNumber();
  const [value, setValue] = useState(slippagePct.toString());
  const [errTip,setErrTip] = useState('')
  useEffect(() => {
    setValue(slippagePct.toString());
  }, [slippagePct]);
  
  const isSelected = (val: number) => {
    return val === slippagePct ? "primary" : "default";
  };

  const itemStyle: React.CSSProperties = {
    margin: 5,
  };

  return (
    <>
      <div
        className="slippage-box"
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {[0.1, 0.5, 1.0].map((item) => {
          return (
            <Button
              key={item.toString()}
              style={itemStyle}
              type={isSelected(item)}
              onClick={() => setSlippage(new BigNumber(item).div(100).toNumber())}
              className="sliderBtn"
            >
              {item}%
            </Button>
          );
        })}
        <div className="slippage-input-box">
          <NumericInput
            className="slippage-input"
            size="small"
            placeholder={value}
            value={value}
            maxLength={5}
            style={{
              width: 50,
              fontSize: 14,
              boxShadow: "none",
              borderColor: "transparent",
              outline: "transpaernt",
            }}
            onBlur={() => {
              if (errTip) {
                setSlippage(new BigNumber(MAX_SLIPPAGE).div(100).toNumber());
                setValue(new BigNumber(MAX_SLIPPAGE).toString());
                setErrTip('')
              }
            }}
            onChange={(x: any) => {
              let num = x
              setValue(num);
              // const cappedSlippage = Math.min(parseFloat(x), MAX_SLIPPAGE);
              // const safeCappedSlippage = Number.isNaN(cappedSlippage) ? DEFAULT_MIN_SLIPPAGE.toString() : cappedSlippage.toString();
              // setValue(safeCappedSlippage);
              // const newValue = parseFloat(safeCappedSlippage) / 100.0;
              // if (Number.isFinite(newValue)) {
              //   setSlippage(newValue);
              // }
              if (Number(num) == 0) {
                setErrTip(t('SlipeTip1'))
              } else if (num < DEFAULT_MIN_SLIPPAGE) {
                setErrTip(t('SlipeTip2'))
              } else if (num > MAX_SLIPPAGE) {
                setErrTip(t('SlipeTip3')+`${MAX_SLIPPAGE}%`)
              } else {
                setErrTip('')
                let fixedNum = new BigNumber(num)
                setSlippage(fixedNum.div(100).toNumber());
              }
            }}
          />
          %
        </div>
      </div>
      {errTip && (<p style={{ color: '#f81d22',marginTop:"10px" }}>{ errTip }</p>)}
    </>
  );
};
