import React, { useState } from "react";
import { Button, Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AppBar } from "../appBar";
import { useHistory } from "react-router-dom";
import { useTranslation, Trans, Translation } from 'react-i18next'
import './style.less'


export const IDO = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const columns = [
    {
      title: t("IDO4"),
      dataIndex: 'name',
    },
    {
      title: t("IDO5"),
      dataIndex: 'age',
    },
    {
      title: t("IDO6"),
      dataIndex: 'address',
    },
    {
      title: t("IDO7"),
      dataIndex: 'address',
    },
    {
      title: t("IDO8"),
      dataIndex: 'address',
    },
    {
      title: t("IDO9"),
      dataIndex: 'address',
    },
    {
      title: t("IDO10"),
      dataIndex: 'address',
    },
    {
      title: t("IDO11"),
      dataIndex: 'address',
    },
  ];
  const data= [];
  const IDOPage = (
    <>
      <AppBar/>
    <div className="IDOPage">
        <div className="contentBox contentBox1">
          <div className="tableH">
            <p className="title">{t("IDO1")}</p>
            <Button
            className="myButton"
            type="primary"
              size="large">
              {t("IDO2")}
            </Button>
          </div>
          <Input className="searchBox" size="large" placeholder={t("IDO3")} prefix={<SearchOutlined className="color" />} />
          <Table columns={columns} dataSource={data} scroll={{ x: 680 }} />
        </div>
        <div className="contentBox">
          <div className="typeBox">
            <div className="typeItem">
              <img src={require('../../assets/img/IDO1.png')} alt="" />
              <div className="font1">{t("IDO12")}</div>
              <div className="font2">{t("IDO14")}</div>
            </div>
            <div className="typeItem">
              <img src={require('../../assets/img/IDO2.png')} alt="" />
              <div className="font1">{t("IDO13")}</div>
              <div className="font2">{t("IDO15")}</div>
            </div>
          </div>
          <div className="buttonBox">
           <Button
            className="myButton"
            type="primary"
              size="large">
              {t("IDO2")}
            </Button>
          </div>
        </div>
    </div>
    </>
  );

  return IDOPage;
};

