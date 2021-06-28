import React from "react";
import { Button, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useWallet } from "../../context/wallet";
import { AccountInfo } from "../accountInfo";
import { WalletConnect } from "../walletConnect";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Settings } from "../settings";
import { AppBar } from "../appBar";
import './style.less'
export const IndexPage = (props: { left?: JSX.Element; right?: JSX.Element }) => {
const { connect, connected } = useWallet();
  // const location = useLocation();
  const history = useHistory();

  const IndexPage = (
    <>
      <AppBar
        right={
          <Popover
            placement="topRight"
            title="Settings"
            content={<Settings />}
            trigger="click"
          >
            <Button
              shape="circle"
              size="large"
              type="text"
              icon={<SettingOutlined />}
            />
          </Popover>
        }
      />
      <div className="indexPageBox">
        <div className="indexTitle">
          <img src={require('../../assets/img/bananaTxt.png')} className="img1" alt="" />
          <p>Solana 上排名第一的 AMM 和收益农场。</p>
        </div>
        <div className="indexPageT">
          <div className="card indexPageL">
            <p className="title">挖矿和质押</p>
            <img src={require("../../assets/img/nav/logo.png")} className="logo" alt="" />
            <p className="font1">待收割的 Banana:</p>
            <p className="font2">已锁定</p>
            <p className="font3">~$ 0</p>
            <p className="font1">钱包中的 Banana:</p>
            <p className="font2">已锁定</p>
            <p className="font3">~$ 0</p>
            {!connected&&<Button
              className="connect-button"
              type="primary"
              size="large"
              onClick={connect}
              style={{ width: "100%" }}
            >
              {connected?'已连接':'解锁钱包'}
            </Button>}
            <img src={require("../../assets/img/logo2.png")} className="bgImg" alt=""/>
          </div>
          <div className="card indexPageR">
            <p className="title">公告</p>
            <p className="line"></p>
            <div className="noticeBox">
              <div className="noticeItem">
                <img src={require("../../assets/img/nav/logo.png")} className="logo" alt="" />
                <div>
                  <p className="font4">BananaSwap #SOL<br /> @BananaSwap</p>
                  <p className="font5">我们正在做一个新的设计 <span className="font3">#BananaSwap</span></p>
                  <p className="font5">如果能留下您的反馈它的赞赏。<span className="font3">＃sol  ＃ <br />sol  ＃DEFI  ＃SRM ＃ <br /> YieldFarming  ＃bananaswap  ＃bananaswap</span></p>
                  <img src={require("../../assets/img/indexBg1.png")} className="noticeImg" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="indexPageB">
          <div className="card indexPageL">
            <p className="font1">平台锁仓量</p>
            <p className="font2">$7,563,329,401</p>
            <p className="font3">Across all Farms and Pools</p>
          </div>
          <div className="card indexPageR">
            <p className="font1">DEX流动性</p>
            <div className="dataItem">
              <p>总流动性</p>
              <p className="font4">$7,563,329,401</p>
            </div>
            <div className="dataItem">
              <p>24小时交易量</p>
              <p className="font4">$7,563,329,401</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return IndexPage;
};
