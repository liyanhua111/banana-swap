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
import BigNumber from "bignumber.js";
import moment from 'moment';
const { RangePicker } = DatePicker;
export const Transaction = (props: {}) => {
  const { connected } = useWallet();
  // 众筹类型
  const [IBOType, setIBOType] = useState('A');
  // 众筹代币
  const [currency, setCurrency] = useState('');
  const [tokenMint, setTokenMint] = useState();
  const [symbol, setSymbol] = useState('');
  const [currencyBalance, setCurrencyBalance] = useState();
  // 众筹代币数量
  const [tokenAmount, setTokenAmount] = useState();
  // 众筹销售代币
  const [sellCurrency, setSellCurrency] = useState();
  const [sellSymbol, setSellSymbol] = useState('');
  // 众筹销售价格
  const [sellPrice, setSellPrice] = useState();
  // 众筹比例
  const [ratio, setRatio] = useState();
  // 众筹开始时间
  const [startTime, setStartTime] = useState();
  // 众筹结束时间
  const [endTime, setEndTime] = useState();
  const [value, setValue] = useState('');
  // 流动性保护天数
  const [protectDays, setProtectDays] = useState(30);
  // 错误提示
  const [errTip, setErrTip] = useState('');
  
  // 修改众筹类型
  const IBOTypeChange=function(type:string) {
    setIBOType(type)
  }
  // 修改流动性保护天数
  const protectDaysChange=function(type:number) {
    setProtectDays(type)
  }
  const onStartChange =function(value:any, dateString:any) {
    setStartTime(dateString)
  }
  const onEndChange = function (value: any, dateString: any) {
    setEndTime(dateString)
  }
  const range = function(start:any, end:any) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  const disabledDate1 = function (current:any) {
    // Can not select days before today and today
    return current && current < moment().subtract(1, "days")
  }
  const disabledDate2 = function (current:any) {
    // Can not select days before today and today
    return current && current < moment(startTime)
  }
  const disabledDateTime1 = function() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  const errTipFunc = function () {
    console.log(Number(currencyBalance))
    console.log(Number(tokenAmount))
    console.log(Number(currencyBalance) < Number(tokenAmount))
    console.log(startTime,'555555')
      console.log(endTime,'333333')
    if (!currency) {
      setErrTip('请选择众筹代币')
    } else if (!tokenAmount) {
      setErrTip('请输入众筹代币数量')
    } else if (Number(currencyBalance) < Number(tokenAmount)) {
      setErrTip(`余额至少需要${tokenAmount}`+symbol)
    } else if (!ratio) {
      setErrTip('请输入众筹比例')
    } else if (!sellCurrency) {
      setErrTip('请选择众筹销售代币')
    } else if (!sellPrice) {
      setErrTip('请输入众筹销售价格')
    } else if (!startTime) {
      setErrTip('请选择众筹开始时间')
    } else if (!endTime) {
      console.log(startTime,'555555')
      console.log(endTime,'333333')
      setErrTip('请选择众筹结束时间')
    } else if (startTime && endTime) {
      // @ts-ignore
      if (new Date(startTime).getTime()>new Date(endTime).getTime()) {
        setErrTip('众筹结束时间不得早于开始时间')
      } else {
        setErrTip('')
      }
    } else {
      setErrTip('')
    }
  }
  const MaxFunc = function () {
    setTokenAmount(currencyBalance)
  }
  const goLaunch =function() {
  }
  
  useEffect(() => {
    console.log({ IBOType, currency, symbol, currencyBalance, sellCurrency, tokenAmount, ratio, sellPrice, startTime, endTime, protectDays })
    errTipFunc()
  }, [IBOType,currency,currencyBalance,sellCurrency,tokenAmount,ratio,sellPrice,startTime,endTime,protectDays]);
  return (
    <div className="launch">
      <p className="tite">设置参数</p>
      <p className="subTitle">01 设置众筹类型</p>
     <div className="tabBox">
        <p onClick={()=>{IBOTypeChange('A')}} className={`tabTitle ${IBOType=='A'?'tabActive':''}`}>定价众筹</p>
        <p onClick={()=>{IBOTypeChange('B')}} className={`tabTitle ${IBOType=='B'?'tabActive':''}`}>升价众筹</p>
      </div>
      <div className="subTitle"><span>02 设置众筹代币</span>{(connected&&currency) && <p>余额：{currencyBalance}<span className="font3" onClick={MaxFunc}>Max</span></p>}</div>
      <div className="inputItem inputItem3">
        <CurrencySelect
          onMintChange={(item: any) => {
            console.log(item)
            setCurrency(item.address);
            setTokenMint(item.tokenMint);
            setSymbol(item.symbol);
            setCurrencyBalance(item.balance.toFixed(6));
          }}
        />
        
        <NumericInput
          style={{marginLeft:'10px'}}
          className="launch-input"
          size="small"
          placeholder={''}
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
        <p className="valTip">{(Number(tokenAmount)>0&&Number(ratio)>0)?new BigNumber(tokenAmount||0).times(ratio||0).div(100).toNumber():'-'}  <span>{symbol}</span></p>
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
            value={sellPrice}
            maxLength={15}
            onBlur={() => {
            }}
            onChange={(x: any) => {
              setSellPrice(x);
            }}
        />
        <CurrencySelect
          onMintChange={(item: any) => {
            setSellCurrency(item.address);
            setSellSymbol(item.symbol);
          }}
        />
      </div>
      <div className="inputItem inputItem2">
        <p className="label">目标筹集资金
        </p>
        <p className="valTip">{(Number(tokenAmount)>0&&Number(ratio)>0&&Number(sellPrice)>0)?new BigNumber(tokenAmount||0).times(sellPrice||0).times(ratio||0).div(100).toNumber():'-'}  <span>{sellSymbol}</span></p>
      </div>
      <div className="subTitle marginT"><span>03 设置众筹参数</span></div>
      <div className="inputItem">
        <p className="label">* 众筹开始时间
          <Tooltip placement="top" title={'众筹建池开始后,用户才能参与'}>
            <QuestionCircleOutlined className="tipIcon" />
          </Tooltip>
        </p>
        <DatePicker showTime onChange={onStartChange} disabledDate={disabledDate1} className="DatePickerInput" />
      </div>
      <div className="inputItem">
        <p className="label">* 众筹结束时间
          <Tooltip placement="top" title={'用户在众筹建池结束后可获得代币'}>
            <QuestionCircleOutlined className="tipIcon" />
          </Tooltip>
        </p>
        <DatePicker showTime onChange={onEndChange} disabledDate={disabledDate2} className="DatePickerInput" />
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
      {errTip&&<div className="errTipBtn">{errTip}</div>}
        <Button
          className="add-button goLaunch"
          type="primary"
          size="large"
          onClick={() => goLaunch()}
          disabled={
            !connected || errTip!==''
          }
        >发起</Button>
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