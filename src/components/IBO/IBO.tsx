import React, { useState } from "react";
import { Button, Table, Input,Progress, Menu, Dropdown } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import BigNumber from "bignumber.js";
import { AppBar } from "../appBar";
import { useHistory } from "react-router-dom";
import { useTranslation, Trans, Translation } from 'react-i18next'
import { Addressmodule } from "./tools"
import { TokenIcon } from "../tokenIcon";
import './style.less'


export const IBO = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const goDetail = function (row:any) {
    history.push({ pathname: `/swap/IBO/launchDetail/${row.address1}` })
  }
  const data: Array<any> = [
    {
      type: 1,
      address1: '4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW',
      address2: '5WyDJwxFmYQX4wiTZGf9bnKxVVkubduVR2zfxo5dhmmf',
      tokenAmount: 10,
      sellPrice: 2,
      symbol: 'ABC',
      sellSymbol: 'SOL',
      allSupply: '40',
      protectDays: '30',
      raised: 2,
      state:1
    },
    {
      type: 1,
      address1: '5WyDJwxFmYQX4wiTZGf9bnKxVVkubduVR2zfxo5dhmmf',
      address2: '4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW',
      tokenAmount: 20,
      sellPrice: 5,
      symbol: 'XYZ',
      sellSymbol: 'ABC',
      allSupply: '100',
      protectDays: '60',
      raised: 15,
      state:2
    },
    {
      type: 1,
      address1: '5WyDJwxFmYQX4wiTZGf9bnKxVVkubduVR2zfxo5dhmmf',
      address2: '4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW',
      tokenAmount: 20,
      sellPrice: 5,
      symbol: 'XYZ',
      sellSymbol: 'ABC',
      allSupply: '100',
      protectDays: '60',
      raised: 18,
      state:3
    }
  ];
  const columns = [
    {
      title: t("IBO4"),
      dataIndex: 'address1',
      render: (text: any) => (
        <div>
          <Addressmodule address={text} goUrl={true} color="#222" />
          <p className="typeBox">定价众筹</p>
        </div>
      )
    },
    {
      title: t("IBO5"),
      dataIndex: 'age',
      render: (text: any, row: any) => <p>{1 +''+ row.symbol}={ new BigNumber(row.sellPrice || 0).div(row.tokenAmount)+''+row.sellSymbol}</p>
    },
    {
      title: t("IBO6"),
      dataIndex: 'allSupply',
      render: (text: any, row: any) => <p>{ text+row.symbol}</p>
    },
    {
      title: t("IBO7"),
      dataIndex: 'address',
      width:130,
      render: (text: any, row: any) => (
        <div>
          <p className="mrgB"><TokenIcon mintAddress={row.address1} /><span className="font1">{row.tokenAmount + row.symbol}</span></p>
          <p><TokenIcon mintAddress={row.address2} /><span className="font1">{row.sellPrice + row.sellSymbol}</span></p>
        </div>
      )
    },
    {
      title: t("IBO8"),
      dataIndex: 'protectDays',
      render: (text: any, row: any) => <p>{ text} 天</p>
    },
    {
      title: t("IBO9"),
      dataIndex: 'address',
      render: (text: any, row: any) => (
        <div>
          <Progress percent={new BigNumber(row.raised).div(row.tokenAmount).times(100).toNumber()} showInfo={false} strokeColor="#0BFFDB" size="small" />
        </div>
      )
    },
    {
      title: t("IBO10"),
      dataIndex: 'state',
      render: (text: any, row: any) => {
        return  (text==1 ?<p className="state state1">等待中</p>:text==2?<p className="state state2">进行中</p>:<p className="state state3">结束</p>)
      }
    },
    {
      title: t("IBO11"),
      dataIndex: 'address',
      render: (text: any, row: any) => {
        return <p className="goDetail" onClick={function () { goDetail(row) } }>详情</p>
      }
    },
  ];
  const goLaunch =function () {
    history.push({ pathname: "/swap/IBO/launch" })
  }
  const goJoin =function () {
    history.push({ pathname: "/swap/IBO/join" })
  }
  // const handleMenuClick = function(e:any) {
  //   if (e.key === '3') {

  //   }
  // };
  // const menu = (
  //   <Menu onClick={handleMenuClick}>
  //     <Menu.Item key="1">参与</Menu.Item>
  //     <Menu.Item key="2">众筹</Menu.Item>
  //   </Menu>
  // );
  const IBOPage = (
    <>
      <AppBar/>
      <div className="IBOPage">
        {/* <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            IDO <DownOutlined />
          </a>
        </Dropdown> */}
        <div className="contentBox contentBox1">
          <div className="tableH">
            <p className="title">{t("IBO1")}</p>
            <div>
              <Button
                onClick={goLaunch}
                className="myButton"
                type="primary"
                size="large">
                {t("IBO2")}
              </Button>
              <Button
                style={{marginLeft:'20px'}}
                onClick={goJoin}
                className="myButton"
                type="primary"
                size="large">
                参与众筹
              </Button>
            </div>
          </div>
          <Input className="searchBox" size="large" placeholder={t("IBO3")} prefix={<SearchOutlined className="color" />} />
          <Table columns={columns} dataSource={data} scroll={{ x: 680 }} />
        </div>
        <div className="contentBox">
          <div className="typeBox">
            <div className="typeItem">
              <img src={require('../../assets/img/IDO1.png')} alt="" />
              <div className="font1">{t("IBO12")}</div>
              <div className="font2">{t("IBO14")}</div>
            </div>
            <div className="typeItem">
              <img src={require('../../assets/img/IDO2.png')} alt="" />
              <div className="font1">{t("IBO13")}</div>
              <div className="font2">{t("IBO15")}</div>
            </div>
          </div>
          <div className="buttonBox">
            <Button
              onClick={goLaunch}
              className="myButton"
              type="primary"
              size="large">
              {t("IBO2")}
            </Button>
          </div>
        </div>
    </div>
    </>
  );

  return IBOPage;
};

