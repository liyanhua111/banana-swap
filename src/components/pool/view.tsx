import React from "react";
import { Button, Popover,Spin } from "antd";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useOwnedPools } from "../../utils/pools";
import "./view.less";
import { Settings } from "./../settings";
import { SettingOutlined } from "@ant-design/icons";
import { AppBar } from "./../appBar";
import { useWallet } from "../../context/wallet";
import { PoolCard } from "./card";
import { MigrationModal } from "../migration";

export const PoolOverview = () => {
  const { t } = useTranslation();
  const myPoolsLoading = useSelector((state: RootStateOrAny) => state.myPoolsLoading);
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
        {(!connected || owned.length == 0) &&
          <Spin tip="Loading..." spinning={myPoolsLoading}>
            <div className="noDataBox">
              <img src={require("../../assets/img/logo2.png")} className="img1" alt=""/>
              <img src={require("../../assets/img/circle.png")} className="img2" alt=""/>
              <div className="noDataInfor">
              {!connected && <><p className="font1">{t("ConnectTip")}</p>
                <Button
                  className="add-button"
                  type="primary"
                  size="large"
                  onClick={connect}
                >
                  {t("ConnectWallet")}
                </Button></>}
                {(connected && owned.length == 0) && <><p className="font2">{t("Nodata")}  <br /> <span className="font3">{t("Nofluidity")}~</span></p>
                <Button className="add-button" type="primary" size="large" onClick={() => history.push({ pathname: "/swap/add" })}>{t("AddLiquidity")} </Button></>}
              </div>
            </div>
          </Spin>
        }
      </div>
      <MigrationModal />
    </>
  );
};
