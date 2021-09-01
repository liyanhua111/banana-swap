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
  DatePicker,
  Tooltip,
} from "antd";
import { AppBar } from "./../appBar";
import {
  QuestionCircleOutlined,
  SettingOutlined,
  TableOutlined,
  OneToOneOutlined,
} from "@ant-design/icons";
import { useWallet } from "../../context/wallet";
import { PoolIcon } from "../tokenIcon";
import "./style.less";
import {
  formatUSD,
} from "../../utils/utils";
import { PoolAddress } from "../pool/address";
import { PoolCard } from "./../pool/card";
import { StepView } from "./step"
import { CurrencySelect } from "../currencyInput";
import { NumericInput } from "./../numericInput";

export const Transaction = (props: {}) => {
  const { connected } = useWallet();
  // 众筹类型
  const [IBOType, setIBOType] = useState('A');
  // 众筹代币
  const [currency, setCurrency] = useState();
  // 众筹销售代币
  const [sellCurrency, setSellCurrency] = useState();
  // 众筹代币数量
  const [tokenAmount, setTokenAmount] = useState();
  // 众筹比例
  const [ratio, setRatio] = useState();

  const [currencyBalance, setCurrencyBalance] = useState();
  const [value, setValue] = useState('');
  // 流动性保护天数
  const [protectDays, setProtectDays] = useState(30);
  // 修改众筹类型
  const IBOTypeChange=function(type:string) {
    setIBOType(type)
  }
  // 修改流动性保护天数
  const protectDaysChange=function(type:number) {
    setProtectDays(type)
  }
  const onChange =function(value:any, dateString:any) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  const onOk =function(value:any) {
    console.log('onOk: ', value);
  }
  useEffect(() => {
    
  }, []);
  return (
    <div className="launch">
      <p className="tite">设置参数</p>
      <p className="subTitle">01 设置众筹类型</p>
     <div className="tabBox">
        <p onClick={()=>{IBOTypeChange('A')}} className={`tabTitle ${IBOType=='A'?'tabActive':''}`}>定价众筹</p>
        <p onClick={()=>{IBOTypeChange('B')}} className={`tabTitle ${IBOType=='B'?'tabActive':''}`}>升价众筹</p>
      </div>
      <div className="subTitle"><span>02 设置众筹代币</span>{connected && <p>余额：{currencyBalance}<span className="font3">Max</span></p>}</div>
      <div className="inputItem inputItem3">
        <CurrencySelect
          onMintChange={(item: any) => {
            setCurrency(item);
          }}
          onBalanceChange={(item: any) => {
            console.log(item)
            setCurrencyBalance(item);
          }}
        />
        
        <NumericInput
          style={{marginLeft:'10px'}}
          className="launch-input"
          size="small"
          placeholder={'0-50'}
          value={tokenAmount}
          maxLength={15}
          onBlur={() => {
          }}
          onChange={(x: any) => {
            setTokenAmount(x);
          }}
        />
      </div>
      <div className="inputItem">
        <p className="label">* 众筹比例(%)
          <Tooltip placement="top" title={'众筹售卖的代币比例上限'}>
            <QuestionCircleOutlined className="tipIcon" />
          </Tooltip>
        </p>
        <NumericInput
            className="launch-input"
            size="small"
            placeholder={'0-50'}
            value={ratio}
            maxLength={15}
            onBlur={() => {
            }}
            onChange={(x: any) => {
              setRatio(x);
            }}
          />
      </div>
      <div className="inputItem inputItem2">
        <p className="label">众筹代币数
          <Tooltip placement="top" title={'社区可以购买到的代币总数'}>
            <QuestionCircleOutlined className="tipIcon" />
          </Tooltip>
        </p>
        <p className="valTip"><span></span> <span>{currency}</span></p>
      </div>
      <div className="inputItem">
        <p className="label">* 众筹销售价格
          <Tooltip placement="top" title={'众筹单价'}>
            <QuestionCircleOutlined className="tipIcon" />
          </Tooltip>
        </p>
        <NumericInput
            className="launch-input"
            size="small"
            style={{marginRight:'8px',textAlign:"left"}}
            placeholder={'0.0000000000'}
            value={value}
            maxLength={15}
            onBlur={() => {
            }}
            onChange={(x: any) => {
              setValue(x);
            }}
        />
        <CurrencySelect
          onMintChange={(item: any) => {
            setSellCurrency(item);
          }}
        />
      </div>
      <div className="inputItem inputItem2">
        <p className="label">目标筹集资金
        </p>
        <NumericInput
            className="launch-input"
            size="small"
            placeholder={'0-50'}
            value={value}
            maxLength={15}
            onBlur={() => {
            }}
            onChange={(x: any) => {
              setValue(x);
            }}
          />
      </div>
      <div className="subTitle marginT"><span>03 设置众筹参数</span></div>
      <div className="inputItem">
        <p className="label">* 众筹开始时间
          <Tooltip placement="top" title={'众筹建池开始后,用户才能参与'}>
            <QuestionCircleOutlined className="tipIcon" />
          </Tooltip>
        </p>
        <DatePicker showTime onChange={onChange} onOk={onOk} className="DatePickerInput" />
      </div>
      <div className="inputItem">
        <p className="label">* 众筹结束时间
          <Tooltip placement="top" title={'用户在众筹建池结束后可获得代币'}>
            <QuestionCircleOutlined className="tipIcon" />
          </Tooltip>
        </p>
        <DatePicker showTime onChange={onChange} onOk={onOk} className="DatePickerInput" />
      </div>
      <div className="inputItem">
        <p className="label">* 流动性保护天数
          <Tooltip placement="top" title={'众筹流动性保护期结束后，可提取全部资金'}>
            <QuestionCircleOutlined className="tipIcon" />
          </Tooltip>
        </p>
        {[30,90,180].map((item) => {
          return (
            <p onClick={()=>{protectDaysChange(item)}} className={`btnSelect ${protectDays==item?'btnSelectActive':''}`}>{item}天</p>
          );
        })}
      </div>
      <div className="errTipBtn">选择需要众筹的代币</div>
      <div className="goLaunch">发起</div>
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
    <>
      <AppBar/>
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
      </>
  )

});