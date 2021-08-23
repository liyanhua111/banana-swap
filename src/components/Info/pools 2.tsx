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

export const PoolsView = React.memo(() => {
  const [totals, setTotals] = useState<Totals>(() => ({
    liquidity: 0,
    volume: 0,
    fees: 0,
  }));
  const { pools } = usePools();
  const enriched = useEnrichedPools(pools);
  console.log(enriched,'enriched')
  // Updates total values
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

  const columns = [
    {
      title: "Pools",
      dataIndex: "name",
      key: "name",
      render(text: string, record: any) {
        return {
          props: {
            style: {},
          },
          children: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <PoolIcon mintA={record.mints[0]} mintB={record.mints[1]} />
              <a href={record.link} target="_blank" rel="noopener noreferrer" className="font1">{text}</a>
              <span className="font4">0.03%</span>
            </div>
          ),
        };
      },
    },
    {
      title: "TVL",
      dataIndex: "Price",
      key: "Price",
      align: 'right' as 'right',
      render(text: string, record: any) {
        return {
          children: (
            <div>
              <div>{formatUSD.format(record.liquidity)}</div>
            </div>
          ),
        };
      },
      // sorter: (a: any, b: any) => a.liquidity - b.liquidity,
      // defaultSortOrder: "descend" as any,
    },
    {
      title: "Volume 24H",
      dataIndex: "liquidity",
      key: "PriceChange",
      align: 'right' as 'right',
      render(text: string, record: any) {
        return {
          props: {
            style: { textAlign: "right" },
          },
          children:(
            <div>
              <div>{formatUSD.format(record.volume24h)}</div>
            </div>
          ),
        };
      },
      // sorter: (a: any, b: any) => a.supply - b.supply,
    },
    {
      title: "Volume7D",
      dataIndex: "fees24h",
      key: "fees24h",
      align: 'right' as 'right',
      render(text: string, record: any) {
        return {
          props: {
            style: { textAlign: "right" },
          },
          children: (
            <div>
              <div>{formatUSD.format(record.fees24h)}</div>
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
              dataSource={enriched.filter(
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
