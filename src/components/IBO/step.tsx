import React, {
  useEffect,
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
  ArrowRightOutlined,
} from "@ant-design/icons";
import { PoolIcon } from "../tokenIcon";
import "./style.less";
import {
  formatUSD,
} from "../../utils/utils";
import { PoolAddress } from "../pool/address";
import { PoolCard } from "./../pool/card";

export const StepView = (props: {}) => {
  const [totals, setTotals] = useState(0);
  useEffect(() => {
    
  }, []);
  return (
    <div className="stepView">
      <p className="tite">发起众筹建池</p>
      <p className="font1">发起众筹建池，帮助您和社区共建代币流动性，仅需以下几步操作。</p>
      <div className="stepContent">
        <div className="stepItem">
          <p className="index">1</p>
          <p className="font2">邀请社区</p>
          <p className="font3">设置众筹建池相关参数，即可一键发起。发起后可以邀请社区成员关注、参与众筹。</p>
        </div>
        <ArrowRightOutlined className="ArrowRight" />
        <div className="stepItem">
          <p className="index">2</p>
          <p className="font2">参与众筹</p>
          <p className="font3">社区通过参与众筹建池可以公平获得代币份额，当超募发生时会按照投入的资金比例分配份额，多余资金会退回。</p>
        </div>
        <ArrowRightOutlined className="ArrowRight" />
        <div className="stepItem">
          <p className="index">3</p>
          <p className="font2">领取份额</p>
          <p className="font3">参与者根据资金比例获得代币份额，项目方的代币和众筹获得资金将会创建一个流动性资金池。项目方可以在流动性保护期之后取出池子里的资金。</p>
        </div>
      </div>
      <img src={require("../../assets/img/homeSubBg1.png")} className="bgImg" alt=""/>
    </div>
  )
};
