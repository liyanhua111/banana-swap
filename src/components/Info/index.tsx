import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Table,
  Tooltip,
} from "antd";
import { AppBar } from "./../appBar";
import {
  SettingOutlined,
  TableOutlined,
  OneToOneOutlined,
} from "@ant-design/icons";
import { PoolIcon } from "../tokenIcon";
import "./styles.less";
import echarts from "echarts";
import { useEnrichedPools } from "../../context/market";
import { usePools } from "../../utils/pools";
import {
  formatNumber,
  formatPct,
  formatUSD,
  useLocalStorageState,
} from "../../utils/utils";
import { TVLChart, VolumeChart } from "./historical";
import {TokensView} from "./tokens"
import {PoolsView} from "./pools"
import { TransactionsView } from "./transactions"
import {getMarketInfoHttp} from "../../service/fetch"

interface OverviewInfo {
  date: string;
  tvl: string;
  vol: string;
}
interface PoolsInfo {
  address: string;
  symbol: string;
  tvl: string;
  vol7d: Number;
  vol24: Number;
}
export const InfoView = React.memo(() => {
  const [TVLTime, setTVLTime] = useState<string[]>([])
  const [TVLData, setTVLData] = useState<Number[]>([])
  const [VolData, setVolData] = useState<Number[]>([])
  const [Loading, setLoading] = useState(true)
  const [PoolsData, setPoolsData] = useState<any[]>([])
  const [TokensData, setTokensData] = useState<any[]>([])
  useEffect(() => {
    (async function myFunction() {
      let res = await getMarketInfoHttp();
       // @ts-ignore
      if (res && res.data.length > 0) {
        // @ts-ignore
        const { Overview, Pools, Tokens } = res.data[0]
        const TVLTime = Overview.map((x:any)=>x.date)
        const TVLData = Overview.map((x:any) =>Number(x.tvl))
        const VolData = Overview.map((x:any) =>Number(x.vol))
        setTVLTime(TVLTime)
        setTVLData(TVLData)
        setVolData(VolData)
        setLoading(false)
        setPoolsData(Pools)
        setTokensData(Tokens)
      }
    })();
  },[]);
  return (
    <div className="infoPage">
      <div className="chartsBox">
        <div className="titleBox">
          <p className="titleL">Overview</p>
        </div>
        <div className="chartsContent">
          <div>
            <TVLChart time={TVLTime} data={TVLData} loading={Loading}  />
          </div>
          <div>
            <VolumeChart time={TVLTime} data={VolData} loading={Loading} />
          </div>
        </div>
      </div>
      <TokensView data={TokensData} />
      <PoolsView data={PoolsData} />
      <TransactionsView />
    </div>
  )

});
