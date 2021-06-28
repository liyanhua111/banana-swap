import React from "react";
import { Button, Popover } from "antd";
import { useHistory } from "react-router-dom";
import { useOwnedPools } from "../../utils/pools";
import "./view.less";
import { Settings } from "./../settings";
import { SettingOutlined } from "@ant-design/icons";
import { AppBar } from "./../appBar";
import { useWallet } from "../../context/wallet";
import { PoolCard } from "./card";
import { MigrationModal } from "../migration";

export const PoolOverview = () => {
  const history = useHistory();
  const owned = useOwnedPools();
  const { connect, connected } = useWallet();
  return (
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
      <div className="pool-grid">
        {owned.map((o) => (
          <PoolCard
            key={o.pool.pubkeys.account.toBase58()}
            pool={o.pool}
            account={o.account}
          />
        ))}
        {(!connected || owned.length==0) &&
          <div className="noDataBox">
            <img src={require("../../assets/img/logo2.png")} className="img1" alt=""/>
            <img src={require("../../assets/img/circle.png")} className="img2" alt=""/>
            <div className="noDataInfor">
            {!connected && <><p className="font1">Connect to a wallet to <br /> view your liquidity.</p>
              <Button
                className="add-button"
                type="primary"
                size="large"
                onClick={connect}
              >
                解锁钱包
              </Button></>}
              {(connected && owned.length == 0) && <><p className="font2">暂无数据  <br /> <span className="font3">您暂时还没添加流动性~</span></p>
              <Button className="add-button" type="primary" size="large" onClick={() => history.push({ pathname: "/swap/add" })}>添加流动性 </Button></>}
            </div>
          </div>
        }
      </div>
      <MigrationModal />
    </>
  );
};
