import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useSlippageConfig } from "./../../utils/connection";
import { NumericInput } from "./../numericInput";
import './style.less'

const MAX_SLIPPAGE = 25.0
const DEFAULT_MIN_SLIPPAGE = 0.1

export const Slippage = () => {
  const { slippage, setSlippage } = useSlippageConfig();
  const slippagePct = slippage * 100;
  const [value, setValue] = useState(slippagePct.toString());

  useEffect(() => {
    setValue(slippagePct.toString());
  }, [slippage, slippagePct]);

  const isSelected = (val: number) => {
    return val === slippagePct ? "primary" : "default";
  };

  const itemStyle: React.CSSProperties = {
    margin: 5,
  };

  return (
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
            onClick={() => setSlippage(item / 100.0)}
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
          style={{
            width: 50,
            fontSize: 14,
            boxShadow: "none",
            borderColor: "transparent",
            outline: "transpaernt",
          }}
          onChange={(x: any) => {
            const cappedSlippage = Math.min(parseFloat(x), MAX_SLIPPAGE);
            const safeCappedSlippage = Number.isNaN(cappedSlippage) ? DEFAULT_MIN_SLIPPAGE.toString() : cappedSlippage.toString();
            setValue(safeCappedSlippage);
            const newValue = parseFloat(safeCappedSlippage) / 100.0;
            if (Number.isFinite(newValue)) {
              setSlippage(newValue);
            }
          }}
        />
        %
      </div>
    </div>
  );
};
