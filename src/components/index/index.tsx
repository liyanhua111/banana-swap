import React from "react";
import { Button, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next'
import { useWallet } from "../../context/wallet";
import { AccountInfo } from "../accountInfo";
import { WalletConnect } from "../walletConnect";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Settings } from "../settings";
import { AppBar } from "../appBar";
import './style.less'
export const IndexPage = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { t } = useTranslation();
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
          <p>{t("IndexTip1")}</p>
        </div>
        <div className="indexPageT">
          <div className="card indexPageL">
            <p className="title">{t("MiningandDeposit")}</p>
            <img src={require("../../assets/img/nav/logo.png")} className="logo" alt="" />
            <p className="font1">{t("Fortheharvest")} Banana:</p>
            <p className="font2">{ t("locked")}</p>
            <p className="font3">~$ 0</p>
            <p className="font1">{t("InWallet")} Banana:</p>
            <p className="font2">{ t("locked")}</p>
            <p className="font3">~$ 0</p>
            {!connected&&<Button
              className="connect-button"
              type="primary"
              size="large"
              onClick={connect}
              style={{ width: "100%" }}
            >
              {connected?t("connected"):t("ConnectWallet")}
            </Button>}
            <img src={require("../../assets/img/logo2.png")} className="bgImg" alt=""/>
          </div>
          <div className="card indexPageR">
            <p className="title">{t("announcement")}</p>
            <p className="line"></p>
            <div className="noticeBox">
              <div className="noticeItem">
                <img src={require("../../assets/img/nav/logo.png")} className="logo" alt="" />
                <div>
                  <p className="font4">BananaSwap #SOL<br /> @BananaSwap</p>
                  <p className="font5">{t("IndexTip2")} <span className="font3">#BananaSwap</span></p>
                  <p className="font5">{t("IndexTip3")}<span className="font3">＃sol  ＃ <br />sol  ＃DEFI  ＃SRM ＃ <br /> YieldFarming  ＃bananaswap  ＃bananaswap</span></p>
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
