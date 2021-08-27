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

export const TransactionsView = React.memo(() => {
  const tab = ['All','Swaps','Adds','Removes']
  const [tabIndex, setTabIndex] = useState(0)
  const changeTab = function (index:number) {
    setTabIndex(index)
  }
  const columns = [
    {
      title: <p className="columnsTab">
        {tab.map((item,index) => (
          <span className={`font2 ${tabIndex == index ? 'font1' : ''}`}  key={item} onClick={() => changeTab(index)}>{item}</span>
        ))}
      </p>,
      dataIndex: "name",
      key: "name",
      render(text: string, record: any) {
        return {
          props: {
            style: {},
          },
          children: (
            <div>
              <div className="font3">Swap ETH for DCMC</div>
            </div>
          ),
        };
      },
    },
    {
      title: "Total Value",
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
      title: "Token Amount",
      dataIndex: "liquidity",
      key: "PriceChange",
      align: 'right' as 'right',
      render(text: string, record: any) {
        return {
          props: {
            style: { textAlign: "right" },
          },
          children: (
            <div>
              <div>{formatUSD.format(record.volume24h)}</div>
            </div>
          ),
        };
      },
      // sorter: (a: any, b: any) => a.supply - b.supply,
    },
    {
      title: "Token Amount",
      dataIndex: "volume",
      key: "volume",
      align: 'right' as 'right',
      render(text: string, record: any) {
        return {
          props: {
            style: { textAlign: "right" },
          },
          children: (
            <div>
              <div>{formatUSD.format(record.volume24h)}</div>
            </div>
          ),
        };
      },
      // sorter: (a: any, b: any) => a.volume24h - b.volume24h,
    },
    {
      title: "Account",
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
              {/* {record.raw.substring(0,5)+'...'+record.raw.substring(record.raw.length-3,record.raw.length)} */}
              <div className="font3">{ record.fees24h}</div>
            </div>
          ),
        };
      },
      // sorter: (a: any, b: any) => a.fees24h - b.fees24h,
    },
    {
      title: "Time",
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
      sorter: (a: any, b: any) => a.fees24h - b.fees24h,
    }
  ];
  return (
    <>
      <AppBar/>
      <div className="content">
        <div className="titleBox">
          <p className="titleL">Transactions</p>
        </div>
        <div className="tableBox">
          {/* <Table
              dataSource={enriched.filter(
                (row) => true
              )}
              columns={columns}
              pagination={{ pageSize: 4,position:['bottomCenter'],showLessItems:true }}
          /> */}
        </div>
      </div>
    </>
  );
});
