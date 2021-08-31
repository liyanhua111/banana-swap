import React, {
  useEffect,
  useState,
} from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Table,
  Tooltip,
} from "antd";
import { AppBar } from "./../appBar";
import {
  SettingOutlined,
  TableOutlined,
  OneToOneOutlined,
} from "@ant-design/icons";
import { PoolIcon } from "../tokenIcon";
import "./style.less";
import {
  formatUSD,
} from "../../utils/utils";
import { PoolAddress } from "../pool/address";
import { PoolCard } from "./../pool/card";
import { StepView } from "./step"
import { PoolCurrencyInput } from "../currencyInput";

export const Transaction= (props: {}) => {
  const [IBOType, setIBOType] = useState('A');

  const IBOTypeChange=function(type:string) {
    setIBOType(type)
  }
  useEffect(() => {
    
  }, []);
  return (
    <div className="launch">
      <p className="tite">设置参数</p>
      <p className="subTitle">01 设置众筹类型</p>
     <div className="tabBox">
        <p onClick={()=>{IBOTypeChange('A')}} className={`tabTitle ${IBOType=='A'?'tabActive':null}`}>定价众筹</p>
        <p onClick={()=>{IBOTypeChange('B')}} className={`tabTitle ${IBOType=='B'?'tabActive':null}`}>升价众筹</p>
      </div>
      <div className="subTitle"><span>02 设置众筹代币</span><p>余额：0<span className="font3">Max</span></p></div>
    </div>
  )

};




export const launchView = React.memo(() => {
  const [IBOType, setIBOType] = useState('A');
  const IBOTypeChange=function(type:string) {
    setIBOType(type)
  }
  useEffect(() => {
    
  }, []);
  return (
    <div className="launchPage">
      <p className="titleBox">发起 <span className="font1">/ 发起众筹建池</span></p>
      <div className="launchContent">
        <div className="launchL">
          <StepView/>
        </div>
        <div className="launchR">
          <Transaction/>
        </div>
      </div>
    </div>
  )

});