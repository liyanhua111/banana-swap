import React,{useState,useEffect} from "react";
import { Button, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next'
import { useWallet } from "../../context/wallet";
import { Settings } from "../settings";
import { AppBar } from "../appBar";
import { useEnrichedPools } from "../../context/market";
import { usePools } from "../../utils/pools";
import {
  formatUSD
} from "../../utils/utils";
import './style.less'

interface Totals {
  liquidity: number;
  volume: number;
  fees: number;
}
export const IndexPage = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { t } = useTranslation();
  const { connect, connected } = useWallet();
  const [totals, setTotals] = useState<Totals>(() => ({
    liquidity: 0,
    volume: 0,
    fees: 0,
  }));
  const { pools } = usePools();
  const enriched = useEnrichedPools(pools);
  useEffect(() => {
    setTotals(
      enriched.reduce(
        (acc, item) => {
          acc.liquidity = acc.liquidity + item.liquidity;
          acc.volume = acc.volume + item.volume24h;
          acc.fees = acc.fees + item.fees;
          return acc;
        },
        { liquidity: 0, volume: 0, fees: 0 } as Totals
      )
    );
  }, [enriched]);
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
          <img src={require('../../assets/img/home/2.png')} className="img1" alt="" /><br/> 
          {/* <p>{t("IndexTip1")}</p> */}
        </div>
        <div className="indexPageT">
          <div className="card indexPageL">
            <p className="title">{t("MiningandDeposit")}</p>
            {/* <img src={require("../../assets/img/nav/logo.png")} className="logo" alt="" /> */}
            <p className="font1">{t("Fortheharvest")} Banana:</p>
            <p className="font2 locked">{ t("locked")}</p>
            <p className="font3">~$ 0</p>
            <p className="font1">{t("InWallet")} Banana:</p>
            <p className="font2 locked">{ t("locked")}</p>
            <p className="font3" style={{marginBottom:'15px'}}>~$ 0</p>
            {!connected&&<Button
              className="connect-button"
              type="primary"
              size="large"
              onClick={connect}
              style={{ width: "100%" }}
            >
              {connected?t("connected"):t("ConnectWallet")}
            </Button>}
            <img src={require("../../assets/img/homeSubBg1.png")} className="bgImg" alt=""/>
          </div>
          <div className="indexPageB">
            <div className="card indexPageL">
              <p className="font1">{t("TVL")}</p>
              <p className="font2">{formatUSD.format(totals.liquidity)}</p>
              <p className="font3">Across all Farms and Pools</p>
            </div>
            <div className="card indexPageR">
              <p className="font1">{t("DEX")}</p>
              <div className="dataItem" style={{marginTop:"22px",fontWeight: 600}}>
                <p className="font4">{t("TotalLiquidity")}</p>
                <p className="font4">{formatUSD.format(totals.liquidity)}</p>
              </div>
              {/* <div className="dataItem">
                <p>24小时交易量</p>
                <p className="font4">{formatUSD.format(totals.volume)}</p>
              </div> */}
            </div>
          </div>
          {/* <div className="card indexPageR">
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
          </div> */}
        </div>
      </div>
    </>
  );

  return IndexPage;
};
