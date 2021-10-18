import React, { useState } from "react";
import { Switch,Tooltip, Button, Modal, Input } from "antd";
import { SearchOutlined,QuestionCircleOutlined } from "@ant-design/icons";
import { AppBar } from "../appBar";
import { useHistory } from "react-router-dom";
import { useTranslation, Trans, Translation } from 'react-i18next'
import { useWallet } from "../../context/wallet";
import './style.less'


export const Farm = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const [pledgedChecked, setPledgedChecked] = useState(false)
  const [tabActive, setTabActive] = useState(0)
  const [isModalVisible1, setIsModalVisible1] = useState(true)
  const [isModalVisible2, setIsModalVisible2] = useState(false)
  const [isModalVisible3, setIsModalVisible3] = useState(false)
  const [tableData, setTableData] = useState([{inforArrowState:false},{inforArrowState:false},{inforArrowState:false},{inforArrowState:false},{inforArrowState:false}])
  const history = useHistory();
  const { connect, connected } = useWallet();
  const { t, i18n } = useTranslation();
  const pledgedCheckedChange = function (checked: boolean) {
    console.log(checked,'checked')
    setPledgedChecked(checked)
  }
  const tabChange = function (type:number) {
    setTabActive(type)
  }
  const inforArrowStateChange = function (index: number) {
    let data = tableData.map((item,x) => {
      if (index == x) {
        tableData[x].inforArrowState = tableData[x].inforArrowState ? false : true;
      }
      return item
    })
    setTableData(data)
  }
  const showModal = (type:number) => {
    if (type == 1) {
      setIsModalVisible1(true);
    } else if (type == 2) {
      setIsModalVisible2(true);
    } else if (type == 3) {
      setIsModalVisible3(true);
    } 
  };
  const handleCancel = function (type:number) {
    if (type == 1) {
      setIsModalVisible1(false);
    } else if (type == 2) {
      setIsModalVisible2(false);
    } else if (type == 3) {
      setIsModalVisible3(false);
    } 
  }
  const farmPage = (
    <>
      <AppBar/>
      <div className="farmPage">
        <div className="farmHeader">
          <div><Switch checked={pledgedChecked} onChange={pledgedCheckedChange} />已质押</div>
          <div className="tabBox">
            <p className={tabActive==0?'active':''} onClick={()=>{tabChange(0)}}>有效</p>
            <p className={tabActive==1?'active':''} onClick={()=>{tabChange(1)}}>停用</p>
          </div>
        </div>
        <div className="farmCardBox">
          {
            tableData.map((item,index) => {
              return <div className="subCard">
                <div className="subHeader">
                  <div className="iconCurrencyBox">
                    <img src={require('../../assets/img/farm/bana.png')} className="img1" />
                    <img src={require('../../assets/img/farm/icon.png')} className="img2" />
                  </div>
                  <div className="subHeaderR">
                    <p className="font1">BANA-usdc</p>
                    <div className="subHeaderRB">
                      <p className="label">
                        <img src={require('../../assets/img/farm/label1.png')} />
                        不收费
                      </p>
                      <p className="font2">40X</p>
                    </div>
                  </div>
                </div>
                <div className="inforBox">
                  <div className="subInfor">
                    <p>年化利率:</p>
                    <p className="val"><img src={require('../../assets/img/farm/calculate.png')} alt="" className="calculate" onClick={()=>showModal(1)}/>283.37%</p>
                  </div>
                  <div className="subInfor">
                    <p>赚取:</p>
                    <p className="val">BANA</p>
                  </div>
                  <div className="subInfor">
                    <p>质押手续费:</p>
                    <p className="val">0%</p>
                  </div>
                  <div className="subInfor">
                    <p>收获锁定:
                      <Tooltip placement="top" title={'how soon can you harvest or compound again.'}>
                        <QuestionCircleOutlined className="color1" />
                      </Tooltip>
                    </p>
                    <p className="val">2 小时</p>
                  </div>
                  <div className="subInfor">
                    <p>LP类型:</p>
                    <p className="val">BANA-LP</p>
                  </div>
                  <div className="subInfor">
                    <div>
                      <p className="font1"><span className="color2">BANA</span> 已赚取</p>
                      <p className="font2">0.000</p>
                    </div>
                    <p className="hanlerBtn hanlerBtnDisable">收成</p>
                  </div>
                  <div className="subInfor">
                    <div>
                      <p className="font1"><span className="color2">bana-BNB LP</span> 已质押</p>
                      <p className="font2">0.000</p>
                    </div>
                    <p className="hanlerBtn">质押LP</p>
                  </div>
                  <div className="subInfor">
                    <p>banana-USDC LP <span className="color1">STAKED</span></p>
                  </div>
                  <div className="subInfor">
                    {!connected &&
                      <Button
                        className="add-button"
                        type="primary"
                        size="large"
                        onClick={connect}
                      >
                        {t("ConnectWallet")}
                      </Button>}
                      {connected && <Button className="add-button" type="primary" size="large" onClick={() => history.push({ pathname: "/swap/add" })}>同意合约</Button>}
                  </div>
                  <p className={`detailed ${item.inforArrowState ? 'active' : ''}`} onClick={()=>{inforArrowStateChange(index)}}>详细信息</p>
                  <div className={`inforBox ${item.inforArrowState ? 'show' : 'hide'}`}>
                    <div className="subInfor">
                      <p>入金:</p>
                      <p className="val">Banana-usdc LP<img src={require('../../assets/img/farm/share.png')} alt="" className="calculate"/></p>
                    </div>
                    <div className="subInfor">
                      <p>总流动性:</p>
                      <p className="val">$10,088,803</p>
                    </div>
                    <div className="subInfor">
                      <p>LP价值:</p>
                      <p className="val">$1.347</p>
                    </div>
                    <div className="watch">
                      <a href="" className="color2">在 BscScan 上查看</a>
                    </div>
                  </div>
                </div> 
              </div>
            })
          }
        </div>
      </div>
      <Modal
        title="投资回报率"
        visible={isModalVisible1}
        centered
        onCancel={()=>{handleCancel(1)}}
        footer={null}
        width="420px"
      >
        <div className="earningsContent">
          <div className="rowContentBox">
            <div className="rowContent">
              <p className="title">大体时间</p>
              <p>1天</p>
              <p>7天</p>
              <p>30天</p>
              <p>365天(APY)</p>
            </div>
            <div className="rowContent">
              <p className="title">投资回报率</p>
              <p>1.49 %</p>
              <p>1.49 %</p>
              <p>1.49 %</p>
              <p>1.49 %</p>
            </div>
            <div className="rowContent">
              <p className="title">每 1000 美元的香蕉</p>
              <p>74.58</p>
              <p>74.58</p>
              <p>74.58</p>
              <p>74.58</p>
            </div>
          </div>
          <div className="tip">
            根据当前费率计算。每天复合一次。费率仅为方便起见而提
            供的估计值，绝不代表保证回报。
          </div>
          <div className="watch">
            获取banana-sol LP
            <img src={require('../../assets/img/farm/share.png')} alt="" />
          </div>
        </div>
      </Modal>
    </>
  );

  return farmPage;
};

