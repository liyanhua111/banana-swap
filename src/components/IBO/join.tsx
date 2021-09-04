import React, { useState,useEffect,useRef } from "react";
import { Button, Input,Progress } from "antd";
import { WarningOutlined,SearchOutlined,ArrowUpOutlined } from "@ant-design/icons";
import { AppBar } from "../appBar";
import { PoolIcon } from "../tokenIcon";
import { useHistory } from "react-router-dom";
import { useTranslation, Trans, Translation } from 'react-i18next'
import { DisclaimerModel } from "./disclaimerModel";
import './style.less'




export const IBOJoinView = React.memo((props) => {
  const history = useHistory();
  const fromRef = useRef();
  const [mints, setIMints] = useState(['4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW', '5WyDJwxFmYQX4wiTZGf9bnKxVVkubduVR2zfxo5dhmmf']);
  const joinFunc=function () {
    if (!localStorage.getItem('disclaimerState')) {
      if (fromRef.current !== null) {
        // @ts-ignore
        fromRef.current.showModal()
        return
      }
    }
    history.push({ pathname: "/swap/IBO/joinDetail" })
  }
  useEffect(() => {
    
  }, []);
  return (
    <>
      <AppBar />
      <DisclaimerModel fromRef={fromRef}/>
      <DisclaimerModel/>
      <div className="joinPage">
        <p className="title">输入想要参与的合约地址，参与众筹建池，公平获得代币</p>
        <div className="subTitle">
          <p><WarningOutlined /> 请仔细甄别代币，建议与官方确认代币合约地址后，再参与众筹。</p>
          <span>点击了解详情</span>
        </div>
        <div className="searchBox">
          <Input placeholder="搜索众筹建池的地址或代币地址" prefix={<SearchOutlined />} className="searchInput" />
          <p className="searchBtn">搜索</p>
        </div>
        <div className="joinContent">
          <p className="joinTip">找到 1 记录</p>
          <div className="projectBox">
          <div className="itemP">
              <div className="itemT">
                <div><PoolIcon mintA={mints[0]} mintB={mints[1]} className="PoolIconBox" /></div>
                <div className="itemTR">
                  <div>
                    <p className="font1">0x354a...69b2</p>
                    <p className="font2">43564 usdt</p>
                  </div>
                  <p className="type">定价众筹</p>
                </div>
              </div>
              <div className="itemM">
                <span className="font3">500,000</span>
                <span className="font4">USDT</span>
              </div>
              <div className="timeBox">
                <p className="waitingBtn">等待中</p>
                <p className="font2">距离开始 01d : 13h : 06m : 33s</p>
              </div>
              <div className="itemB">
                <div className="itemBItem">
                  <p className="font2">众筹价格</p>
                  <p>1 <span className="font2">USDC</span> = 13455 USDT</p>
                </div>
                <div className="itemBItem">
                  <p className="font2">众筹进度</p>
                  <p>0 USDT</p>
                </div>
                <div className="itemBItem">
                  <div className="ProgressBox">
                    <Progress percent={50} showInfo={false} strokeColor="#0BFFDB" />
                    <div className="ProgressInfo">
                      <span className="font5">0%</span>
                      <p>0.0002 <span className="font2">USDT</span></p>
                    </div>
                  </div>
                </div>
                <div className="itemBItem">
                  <p className="font2">我的份额</p>
                  <p>- BUSD</p>
                </div>
                <div className="itemBItem">
                  <p className="font2">预期获得</p>
                  <p>- USDC</p>
                </div>
              </div>
              <div className="itemBB">
                <p onClick={joinFunc}>参与</p>
              </div>
            </div>
            {/* <div className="itemP">
              <div className="itemT">
                <div><PoolIcon mintA={mints[0]} mintB={mints[1]} className="PoolIconBox" /></div>
                <div className="itemTR">
                  <div>
                    <p className="font1">0x354a...69b2</p>
                    <p className="font2">43564 usdt</p>
                  </div>
                  <p className="type">定价众筹</p>
                </div>
              </div>
              <div className="itemM">
                <span className="font3">500,000</span>
                <span className="font4">USDT</span>
              </div>
              <div className="timeBox">
                <p className="waitingBtn">等待中</p>
                <p className="font2">距离开始 01d : 13h : 06m : 33s</p>
              </div>
              <div className="itemB">
                <div className="itemBItem">
                  <p className="font2">实时价格</p>
                  <p>13455 USDT</p>
                </div>
                <div className="itemBItem">
                  <p className="font2">涨幅比例</p>
                  <p className="font5"><ArrowUpOutlined/>0%</p>
                </div>
                <div className="itemBItem">
                  <p className="font2">众筹进度</p>
                  <p>0 USDT</p>
                </div>
                <div className="itemBItem">
                  <p className="font2">竞拍硬顶价格</p>
                  <p>3 USDT</p>
                </div>
                <div className="itemBItem">
                  <p className="font2">我的份额</p>
                  <p>- USDT</p>
                </div>
                <div className="itemBItem">
                  <p className="font2">预期获得</p>
                  <p>99696 USDT</p>
                </div>
              </div>
              <div className="itemBB">
                <p>参与</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )

});