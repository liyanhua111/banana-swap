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
import { PoolAddress } from "../pool/address";
import { PoolCard } from "./../pool/card";
import { TVLChart, VolumeChart } from "./historical";
import {TokensView} from "./tokens"
import {PoolsView} from "./pools"
import { TransactionsView } from "./transactions"

interface Totals {
  liquidity: number;
  volume: number;
  fees: number;
}
export const InfoView = React.memo(() => {
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
  return (
    <div className="infoPage">
      <div className="chartsBox">
        <div className="titleBox">
          <p className="titleL">Overview</p>
        </div>
        <div className="chartsContent">
          <div>
            <TVLChart current={formatUSD.format(totals.liquidity)} />
          </div>
          <div>
            <VolumeChart current={formatUSD.format(totals.liquidity)} />
          </div>
        </div>
      </div>
      <TokensView />
      <PoolsView />
      <TransactionsView />
    </div>
  )

});
