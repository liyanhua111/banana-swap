import React, { useState } from "react";
import { Button, Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AppBar } from "../appBar";
import { useHistory } from "react-router-dom";
import { useTranslation, Trans, Translation } from 'react-i18next'
import './style.less'
import { ComingSoon } from "../comingSoon";


export const Farm = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const farmPage = (
    <>
      <AppBar/>
      <div className="soonPage farmPage">
        <img src={i18n.language == 'en'?require('../../assets/img/page/3b.jpg'):require('../../assets/img/page/3.jpg')} alt="" className="cardImg" />
        <ComingSoon/>
      </div>
    </>
  );

  return farmPage;
};

