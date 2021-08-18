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
import { HistoricalLiquidity, HistoricalVolume } from "./historical";
import {TokensView} from "./tokens"
import {PoolsView} from "./pools"
import {TransactionsView} from "./transactions"

export const InfoView = React.memo(() => {
  return (
    <div className="infoPage">
    
      <TokensView />
      <PoolsView />
    </div>
  )

});
