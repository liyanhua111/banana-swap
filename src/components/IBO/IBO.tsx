import React, { useState } from "react";
import { Button, Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AppBar } from "../appBar";
import { useHistory } from "react-router-dom";
import { useTranslation, Trans, Translation } from 'react-i18next'
import './style.less'


export const IBO = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const columns = [
    {
      title: t("IBO4"),
      dataIndex: 'name',
    },
    {
      title: t("IBO5"),
      dataIndex: 'age',
    },
    {
      title: t("IBO6"),
      dataIndex: 'address',
    },
    {
      title: t("IBO7"),
      dataIndex: 'address',
    },
    {
      title: t("IBO8"),
      dataIndex: 'address',
    },
    {
      title: t("IBO9"),
      dataIndex: 'address',
    },
    {
      title: t("IBO10"),
      dataIndex: 'address',
    },
    {
      title: t("IBO11"),
      dataIndex: 'address',
    },
  ];
  const goLaunch =function () {
    history.push({ pathname: "/swap/IBO/launch" })
  }
  interface IData {
    id?: string; 
    name: string;
    age: number;
  }
  const data: Array<IData>= [];
  const IBOPage = (
    <>
      <AppBar/>
    <div className="IBOPage">
        <div className="contentBox contentBox1">
          <div className="tableH">
            <p className="title">{t("IBO1")}</p>
            <Button
              onClick={goLaunch}
              className="myButton"
              type="primary"
              size="large">
              {t("IBO2")}
            </Button>
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

