import React, { useState,useEffect,useRef } from "react";
import { Button, Input,Progress,Tooltip,Tabs  } from "antd";
import { ArrowRightOutlined,QuestionCircleOutlined,CopyOutlined,ShareAltOutlined } from "@ant-design/icons";
import { AppBar } from "../appBar";
import { PoolIcon } from "../tokenIcon";
import { useHistory } from "react-router-dom";
import { useTranslation, Trans, Translation } from 'react-i18next'
import { CurrencySelect } from "../currencyInput";
import { NumericInput } from "./../numericInput";
import { useWallet } from "../../context/wallet";
import { ShareModel } from "./disclaimerModel";
import {Addressmodule} from "./tools"
import './style.less'

const { TabPane } = Tabs;

export const JoinDetailView = React.memo(() => {
  const fromRef = useRef();
  const history = useHistory();
  const { connected } = useWallet();
  const [mints, setIMints] = useState(['4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW', '5WyDJwxFmYQX4wiTZGf9bnKxVVkubduVR2zfxo5dhmmf']);
  const [tabVal, setTabVal] = useState('1')
  const [currencyBalance, setCurrencyBalance] = useState();
  const [tokenAmount, setTokenAmount] = useState();
  const [currency, setCurrency] = useState('');
  const [symbol, setSymbol] = useState('');
  const [timeState,seTimeState] = useState(true);
  // 是否参与了
  const [joinState, setJoinState] = useState(true);
  // 错误提示
  const [errTip, setErrTip] = useState('请输入代币数量');
  const tabChange=function (key:string) {
    setTabVal(key)
  }
  const MaxFunc = function () {
    setTokenAmount(currencyBalance)
  }
  const errTipFunc = function () {
    console.log(Number(currencyBalance))
    console.log(Number(tokenAmount))
    console.log(Number(currencyBalance) < Number(tokenAmount))
    if (!tokenAmount) {
      setErrTip('请输入代币数量')
    } else if (!currencyBalance||Number(currencyBalance) < Number(tokenAmount)) {
      setErrTip(`余额至少需要${tokenAmount}`+symbol)
    } else {
      setErrTip('')
    }
  }
  const handlerFunc = function () {
    // 参与
    if (tabVal == '1') {
      
    } else if (tabVal == '2') {
      // 退出
    }
  }
  const goUrlFunc = function (path:any) {
    history.push({ pathname: path })
  }
  const goDetail = function (id:string) {
    history.push({ pathname: `/swap/IBO/launchDetail` })
  }
  const shareFunc=function () {
    if (fromRef.current !== null) {
      // @ts-ignore
      fromRef.current.showModal()
      return
    }
  }
  useEffect(() => {
    errTipFunc()
  }, [tokenAmount]);
  return (
    <>
      <AppBar />
      <ShareModel fromRef={fromRef} address={ mints[0]}/>
      <div className="joinDetailPage">
        <div className="titleBox"><p>参与 <span className="font1">/ <Addressmodule address={'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'} /></span></p></div>
        <div className="joinDetailContent">
          <div className="joinDetailL">
            <div className="joinT">
              <div className="joinTL">
                <div><span>定价众筹</span>
                  <Addressmodule address={'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'} goUrl={true} />
                </div>
                <a onClick={()=>goDetail(mints[0])}>查看详情<ArrowRightOutlined /></a></div>
              <p className="priceBox"><span className="font1">2</span><span className="font2">USDC</span></p>
              <div className="ProgressBoxBox">
                <p>1 <span className="font3">USDC</span>=0.0001<span className="font3">BUSD</span>/0<span className="font3">BUSD</span></p>
                <div className="ProgressBox">
                  <Progress percent={50} showInfo={false} strokeColor="#0BFFDB" />
                  <div className="ProgressInfo">
                    <span className="font5">0%</span>
                    <p>0.0002 <span className="font2">USDT</span></p>
                  </div>
                </div>
              </div>
              <div className="joinM">
                <div className="joinML">
                  <p className="titleTxt">众等建池信息</p>
                  <div className="parameterBox">
                    <div className="parameterItem">
                      <p>
                        流动性保护天数
                        <Tooltip placement="top" title={'众筹流动性保护期结束后，可提取全部资金'}>
                          <QuestionCircleOutlined className="tipIcon" />
                        </Tooltip>
                      </p>
                      <p>30天</p>
                    </div>
                    <div className="parameterItem">
                      <p>众筹开始时间</p>
                      <p>2021/09/03 19:00</p>
                    </div>
                    <div className="parameterItem">
                      <p>众筹结束时间</p>
                      <p>2021/09/04 18:48</p>
                    </div>
                    <div className="parameterItem">
                      <p>创建者</p>
                      <div>
                      <Addressmodule address={'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'} goUrl={true} copy={true} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="joinMR">
                <p className="titleTxt">众筹代币信息</p>
                  <div className="parameterBox">
                    <div className="parameterItem">
                      <p>众筹代币名称</p>
                      <p>USDC(USD Coin)</p>
                    </div>
                    <div className="parameterItem">
                      <p>众筹代币地址</p>
                      <div>
                       <Addressmodule address={'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'} goUrl={true} copy={true} />
                      </div>
                    </div>
                    <div className="parameterItem">
                      <p>众筹数量</p>
                      <p>2</p>
                    </div>
                    <div className="parameterItem">
                      <p>建池数量</p>
                      <p>4</p>
                    </div>
                    <div className="parameterItem">
                      <p>总供应量</p>
                      <p>1,778,999,999.999999</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="joinDetailR">
            <div className="joinDetailRT">
              <p className="tool" onClick={shareFunc}><ShareAltOutlined /></p>
            </div>
            {
              timeState ?
                (
                  <Tabs defaultActiveKey="1" onChange={tabChange}>
                    <TabPane tab="参与" key="1">
                    </TabPane>
                    <TabPane tab="退出" key="2">
                    </TabPane>
                  </Tabs>
                ) :
                (
                  <Tabs defaultActiveKey="3" onChange={tabChange}>
                    <TabPane tab="众筹建池已结束" key="3">
                    </TabPane>
                  </Tabs>
                )
            }
            <div className="tabContent">
              {
                timeState&&
                <div>
                  <div className="balanceBox">
                  {(connected) && <p className="currencyBalance">余额：{currencyBalance}<span className="font3" onClick={MaxFunc}>Max</span></p>}
                  </div>
                  <div className="inputItemBox">
                    <CurrencySelect
                      mint={mints[0]}
                      hideSelect={true}
                      onMintChange={(item: any) => {
                        console.log(item)
                      }}
                    />
                    <NumericInput
                      style={{marginLeft:'10px'}}
                      className="launch-input"
                      size="small"
                      placeholder={0}
                      value={tokenAmount}
                      maxLength={15}
                      onBlur={() => {
                      }}
                      onChange={(x: any) => {
                        setTokenAmount(x);
                      }}
                    />
                  </div>
                </div>
              }
              <div className="infoContent">
                <div className="infoItem marginB">
                  <p>1 <span className="font4">USDC = </span>0.0001 <span className="font4">BUSD </span></p>
                  <p className="waitingIcon">等待中</p>
                </div>
                {
                  timeState&&
                  <div className="infoItem">
                    <p className="font5">
                      认购额度
                      <Tooltip placement="top" title={'是您能最多能参与认购的资金数量'}>
                        <QuestionCircleOutlined className="tipIcon" />
                      </Tooltip>
                    </p>
                    <p className="font6">无限制</p>
                  </div>
                }
                {joinState&&<div className="infoItem">
                  <p className="font5">我的份额</p>
                  <p className="font8">1USDT</p>
                </div>}
                {/* 已结束 */}
                {
                  !timeState&&
                  <div className="infoItem">
                    <p className="font5">流动性保护期</p>
                    <p className="font5">23h:24m:34s</p>
                  </div>
                }
                {/* 已结束 */}
                {
                  !timeState&&
                  <div className="infoItem">
                    <p className="font5">收入</p>
                    <p className="font5">1USDT</p>
                  </div>
                }
                {
                  timeState&&
                  <div className="infoItem">
                    <p className="font5">距离开始</p>
                    <p className="font5">23h:24m:34s</p>
                  </div>
                }
                {timeState&&joinState&&<div className="infoItem">
                  <p className="font5">预期获得</p>
                  <p className="font5">1USDT</p>
                </div>}
              </div>
              {
                timeState &&
                <div>
                  <div className="infoItem">
                    <p className="font4">手续费
                      <Tooltip placement="top" title={'参与众筹建池将收取参与金额一定比例的手续费'}>
                          <QuestionCircleOutlined className="tipIcon" />
                      </Tooltip>
                    </p>
                    <p className="font7">免费</p>
                  </div>
                  {errTip && <div className="errTipBtn">{errTip}</div>}
                  <Button
                    className="add-button goLaunch"
                    type="primary"
                    size="large"
                    onClick={() => handlerFunc()}
                    disabled={
                      !connected || errTip!==''
                    }
                  >{tabVal == '1' ? '参与' : '退出'}</Button>
                </div>
              }
              {
                !timeState &&
                <div className="goLaunchBox">
                  <Button
                    className="add-button goLaunch"
                    size="large"
                    onClick={() => goUrlFunc('/swap/')}
                  >前往做市</Button>
                  <Button
                    className="add-button goLaunch"
                    type="primary"
                    size="large"
                    onClick={() => goUrlFunc('/swap/add')}
                  >前去交易</Button>
                </div>
              }
              <p className="font4 marginT">
              当参与众筹的资金超过100%，将根据资金占比分配额度,多余的资金将会退还。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )

});