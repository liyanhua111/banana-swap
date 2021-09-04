import React, { useState,useEffect,useRef } from "react";
import { Button, Table,Progress,Tooltip,Tabs  } from "antd";
import { ArrowRightOutlined,QuestionCircleOutlined,CopyOutlined,ShareAltOutlined } from "@ant-design/icons";
import { AppBar } from "../appBar";
import { PoolIcon } from "../tokenIcon";
import { useHistory } from "react-router-dom";
import { useTranslation, Trans, Translation } from 'react-i18next'
import { CurrencySelect } from "../currencyInput";
import { NumericInput } from "./../numericInput";
import {Addressmodule} from "./tools"
import { useWallet } from "../../context/wallet";
import { TokenIcon } from "../tokenIcon";
import './style.less'

const { TabPane } = Tabs;

export const LaunchDetailView = React.memo(() => {
  const { connected } = useWallet();
  const [mints, setIMints] = useState(['4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW', '5WyDJwxFmYQX4wiTZGf9bnKxVVkubduVR2zfxo5dhmmf']);
  const [tabVal, setTabVal] = useState('1')
  const [currencyBalance, setCurrencyBalance] = useState();
  const [tokenAmount, setTokenAmount] = useState();
  const [currency, setCurrency] = useState('');
  const [symbol, setSymbol] = useState('');
  // 是否参与了
  const [joinState, setJoinState] = useState(true);
  const tabChange=function (key:string) {
    setTabVal(key)
  }
  const handlerFunc = function () {
    // 参与
    if (tabVal == '1') {
      
    } else if (tabVal == '2') {
      // 退出
    }
  }
  useEffect(() => {

  }, [tokenAmount]);
  const dealColumns = [
    {
      title: 'Signature',
      dataIndex: 'address',
      render: (text:any) => <Tooltip placement="top" title={text}><div style={{width:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{text}</div></Tooltip>
    },
    {
      title: 'Block',
      dataIndex: 'age',
    },
    {
      title: 'Time',
      dataIndex: 'name',
    },
    {
      title: 'Instructions',
      dataIndex: 'age',
    },
    {
      title: 'By',
      dataIndex: 'address',
      render: (text:any) => <Tooltip placement="top" title={text}><div style={{width:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{text}</div></Tooltip>
    },
    {
      title: 'Fee (SOL)',
      dataIndex: 'age',
    }
  ];
  const dealData: Array<any> = [
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
  ];
  const partInColumns = [
    {
      title: '参与者',
      dataIndex: 'address',
      render: (text:any) => <Addressmodule address={text} goUrl={true} color="#222" />
    },
    {
      title: '总支付',
      dataIndex: 'age',
      render: (text:any) => <div>{text +'USDC'}</div>
    },
    {
      title: '价值（美元）',
      dataIndex: 'name',
    },
    {
      title: '份额',
      dataIndex: 'age',
    }
  ];
  const partInData: Array<any> = [
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
    {name:'22',age:45,address:'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'},
  ];
  return (
    <>
      <AppBar />
      <div className="launchDetailPage">
        <div className="titleBox">
          <p>发起 <span className="font1">/ <Addressmodule address={'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'} /></span></p>
          <p className="joinBtn"><ShareAltOutlined /> 邀请好友</p>
        </div>
        <div className="joinDetailContent">
          <div className="joinDetailL">
            <Tabs defaultActiveKey="1" onChange={tabChange}>
              <TabPane tab="参数" key="2">
                <div className="tabContent1">
                  <div className="infoItem">
                    <p className="font1">流动性保护天数</p>
                    <p>30天</p>
                  </div>
                  <div className="infoItem">
                    <p className="font1">开始时间</p>
                    <p>2021/09/03 16 12:00:00</p>
                  </div>
                  <div className="infoItem">
                    <p className="font1">结束时间</p>
                    <p>2021/09/03 16 12:00:00</p>
                  </div>
                  <div className="infoItem">
                    <p className="font1">流动性保护期</p>
                    <p>2021/09/03 16 12:00:00</p>
                  </div>
                  <div className="infoItem">
                    <p className="font1">创建者</p>
                    <Addressmodule address={'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'} goUrl={true} />
                  </div>
                  <div className="infoItem">
                    <p className="font1">创建时间</p>
                    <p>2021/09/03 16 12:00:00</p>
                  </div>
                  <div className="infoItem">
                    <p className="font1">众筹代币名称</p>
                    <p>USDC(USD Coin)</p>
                  </div>
                  <div className="infoItem">
                    <p className="font1">众筹代币地址</p>
                    <Addressmodule address={'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'} goUrl={true} />
                  </div>
                  <div className="infoItem">
                    <p className="font1">总供应量</p>
                    <p>1778999999.999999997504281044</p>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="交易记录" key="3">
                <div className="tabContent1">
                  <Table columns={dealColumns} dataSource={dealData} scroll={{ y: 500 }} />
                </div>
              </TabPane>
              <TabPane tab="参与者" key="4">
                 <Table columns={partInColumns} dataSource={partInData} scroll={{ y: 500 }} />
              </TabPane>
            </Tabs>
          </div>
          <div className="joinDetailR">
            <div className="joinDetailRT">
              <Addressmodule address={'4k9s5D7b3LWQ3ByyGiFhRqRi47NjsrjEYrT8XWGyuiDW'} goUrl={true} copy={true} color={'#222'} />
              <p className="waitingIcon">等待中</p>
            </div>
            <div className="ProgressBox">
              <p><span className="font2">0%</span><span className="font1">进度</span></p>
              <Progress percent={50} showInfo={false} strokeColor="#0BFFDB" />
            </div>
            <div className="crowdfunding">
              <div className="subCrowdfunding">
                <p className="imgBox"><img src={require("../../assets/img/launch2.png")} alt="" /></p>
                <div>
                  <p className="font3">0</p>
                  <p className="font1">参与人数</p>
                </div>
              </div>
              <div className="subCrowdfunding">
                <p className="imgBox"><img src={require("../../assets/img/launch1.png")} alt="" /></p>
                <div>
                  <p className="font3">0</p>
                  <p className="font1">众筹金额(BUSD)</p>
                </div>
              </div>
            </div>
            <div className="infoContent">
              <div className="infoItem">
                <p className="font1">建池总供应量</p>
                <div>
                  <TokenIcon mintAddress={mints[0]} />
                  4 USDC
                </div>
              </div>
              <div className="infoItem">
                <p className="font1">众筹价格</p>
                <p>1 USDC =  0.00001 BUSD</p>
              </div>
              <div className="infoItem">
                <p className="font1">众筹募集数量</p>
                <div>
                  <TokenIcon mintAddress={mints[0]} />
                  4 USDC
                </div>
              </div>
              <div className="infoItem">
                <p className="font1">众筹数量</p>
                <div>
                  <TokenIcon mintAddress={mints[0]} />
                  4 USDC
                </div>
              </div>
              <div className="infoItem">
                <p className="font1">用来众筹的比例</p>
                <p>50%</p>
              </div>
            </div>
            <Button
              className="add-button goLaunch"
              type="primary"
              size="large"
              onClick={() => handlerFunc()}
              disabled={!connected}
            >{'创建流动池'}</Button>
          </div>
        </div>
      </div>
    </>
  )

});