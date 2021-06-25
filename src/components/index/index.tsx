import React from "react";
import { Button, Menu, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useWallet } from "../../context/wallet";
import { AccountInfo } from "../accountInfo";
import { WalletConnect } from "../walletConnect";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Settings } from "../settings";
import { AppBar } from "../appBar";
import './style.less'
export const IndexPage = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { connected } = useWallet();
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
          <div className="card indexPageL"></div>
          <div className="card indexPageR"></div>
        </div>
        <div className="indexPageB">
          <div className="card indexPageL"></div>
          <div className="card indexPageR"></div>
        </div>
      </div>
    </>
  );

  return IndexPage;
};
