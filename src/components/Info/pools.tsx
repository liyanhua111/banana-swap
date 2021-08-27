import React, {
  useEffect,
  useState,
} from "react";
import {
  Table,
  Typography,
} from "antd";
import { AppBar } from "./../appBar";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { PoolIcon } from "../tokenIcon";
import "./styles.less";
import { useEnrichedPools } from "../../context/market";
import { usePools } from "../../utils/pools";
import {
  formatNumber,
  formatPct,
  formatUSD,
} from "../../utils/utils";

const FlashText = (props: { text: string; val: number }) => {
  const [activeClass, setActiveClass] = useState("");
  useEffect(() => {
    setActiveClass(props.val > 0 ? "flash-positive" : "flash-negative");
  }, [props.text, props.val]);

  return (
    <span className={activeClass}>
      {props.val > 0?<ArrowUpOutlined />:<ArrowDownOutlined />}
      {props.text} %
    </span>
  );
};

interface Totals {
  liquidity: number;
  volume: number;
  fees: number;
}

export const PoolsView = React.memo((props:{data:any[]}) => {
  useEffect(() => {
    
  }, [props.data]);
  const columns = [
    {
      title: "Pools",
      dataIndex: "symbol",
      key: "symbol",
      render(text: string, record: any) {
        return {
          props: {
            style: {},
          },
          children: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <PoolIcon mintA={record.address} mintB={record.address} />
              <a href={record.link} target="_blank" rel="noopener noreferrer" className="font1">{text}</a>
              <span className="font4">0.03%</span>
            </div>
          ),
        };
      },
    },
    {
      title: "TVL",
      dataIndex: "tvl",
      key: "tvl",
      align: 'right' as 'right',
      render(text: string, record: any) {
        return {
          children: (
            <div>
              <div>{formatUSD.format(record.tvl)}</div>
            </div>
          ),
        };
      },
      // sorter: (a: any, b: any) => a.liquidity - b.liquidity,
      // defaultSortOrder: "descend" as any,
    },
    {
      title: "Volume 24H",
      dataIndex: "vol24",
      key: "vol24",
      align: 'right' as 'right',
      render(text: string, record: any) {
        return {
          props: {
            style: { textAlign: "right" },
          },
          children:(
            <div>
              <div>{formatUSD.format(record.vol24)}</div>
            </div>
          ),
        };
      },
      // sorter: (a: any, b: any) => a.supply - b.supply,
    },
    {
      title: "Volume7D",
      dataIndex: "vol7d",
      key: "vol7d",
      align: 'right' as 'right',
      render(text: string, record: any) {
        return {
          props: {
            style: { textAlign: "right" },
          },
          children: (
            <div>
              <div>{formatUSD.format(record.vol7d)}</div>
            </div>
          ),
        };
      },
      // sorter: (a: any, b: any) => a.fees24h - b.fees24h,
    }
  ];

  return (
    <>
      <AppBar/>
      <div className="content">
        <div className="titleBox">
          <p className="titleL">Top Pools</p>
          <p className="titleR">Explore</p>
        </div>
        <div className="tableBox">
          <Table
              dataSource={props.data.filter(
                (row) => true
              )}
              columns={columns}
              pagination={{ pageSize: 4,position:['bottomCenter'],showLessItems:true }}
          />
        </div>
      </div>
    </>
  );
});
