import React, {
  useEffect,
  useState,
  useImperativeHandle
} from "react";
import { useHistory } from "react-router-dom";
import {
  Modal,Radio, Space ,Checkbox 
} from "antd";
import { TokenIcon } from "../tokenIcon";

export const DisclaimerModel = (props: any) => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value1, setValue1] = React.useState();
  const [value2, setValue2] = React.useState();
  const [value3, setValue3] = React.useState();
  const [agree, setAgree] = React.useState(false);
  const [result,setRresult] = React.useState(false);
  useImperativeHandle(props.fromRef, () => ({
    showModal
  }));
  
  const showModal = () => {
    setIsModalVisible(true);
  }
  const handleOk = () => {
    setIsModalVisible(false);
    localStorage.setItem('disclaimerState', 'true')
    history.push({ pathname: "/swap/IBO/joinDetail" })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange = (e: any, type: any) => {
    if (type == 1) {
      setValue1(e.target.value);
    } else if (type == 2) {
      setValue2(e.target.value);
    } else if (type == 3) {
      setValue3(e.target.value);
    }
  };
  const onChange2 = (e:any) => {
    setAgree(e.target.checked);
  }
  useEffect(() => {
    if (value1 == 2 && value2 == 3 && value3 == 2) {
      setRresult(true)
    } else {
      setRresult(false)
    }
  }, [value1,value2,value3]);
  return (
    <Modal title="初始免责声明" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  cancelText="取消" okText="确认" okButtonProps={{disabled: !agree||!result }} width="690px">
      <div className="disclaimerModel">
        <p className="font1">
          wap以及其合作伙伴或其关联公司在其网站、其平台或公共出版物上提供的任何信息均不构成对您进行任何投资或交易的要约或要约邀请。如果有任何疑问，您可以参考我们的用户使用协议，咨询独立理财顾问的意见， 或者最好不要参与其中。
        </p>
        <p className="font2">您必须准确回答以下问题才能继续使用此功能</p>
        <div className="issueBox">
          <div className="issue">
            <p className="title">1、如何判断一个代币是否为假币?</p>
            <Radio.Group onChange={(e) => { onChange(e, 1) }} value={value1} className={value1&&value1 != 2?'errRadio':''}>
              <Space direction="vertical">
                <Radio value={1}>看代币的名称</Radio>
                <Radio value={2}>与项目方核对代币地址</Radio>
                <Radio value={3}>听朋友介绍</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="issue">
            <p className="title">2、如果参与众筹建池后出现经济损失，谁要承担赔偿责任？</p>
            <Radio.Group onChange={(e) => { onChange(e, 2) }} value={value2} className={value1&&value2 != 3?'errRadio':''}>
              <Space direction="vertical">
                <Radio value={1}>DODO</Radio>
                <Radio value={2}>项目方</Radio>
                <Radio value={3}>我自己</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="issue">
            <p className="title">3、参与众筹建池最大可能会产生多大的损失？</p>
            <Radio.Group onChange={(e) => { onChange(e, 3) }} value={value3} className={value1&&value3 != 2?'errRadio':''}>
              <Space direction="vertical">
                <Radio value={1}>50%以下</Radio>
                <Radio value={2}>50%以上</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="checkBox">
          <Checkbox onChange={onChange2} checked={agree}>我确认我已阅读、理解并同意</Checkbox>
        </div>
      </div>
    </Modal>
  )
}

export const ShareModel = (props: any) => {
  const {address} = props
  const [isShareModalVisible, setShareIsModalVisible] = useState(true);
  useImperativeHandle(props.fromRef, () => ({
    showModal
  }));
  
  const showModal = () => {
    setShareIsModalVisible(true);
  }
  const handleOk = () => {
    setShareIsModalVisible(false);
  };

  const handleCancel = () => {
    setShareIsModalVisible(false);
  };

  useEffect(() => {

  }, []);
  return (
    <Modal title="邀请社区" footer={[]} visible={isShareModalVisible} onOk={handleOk} onCancel={handleCancel}  cancelText="取消" okText="确认" width="400px" wrapClassName="shareModel">
      <div className="shareContent">
        <div className="shareContentTop">
          <div className="TokenIcon">
            <TokenIcon mintAddress={address} /><span className="font1">4 USDC</span>
          </div>
          <p>距离USD Coin(USDC) 众等建池结束</p>
          <p>还有 <span className="font2">1</span>天</p>
          <p>份额只剩</p>
          <p> <span className="font2">1</span>个</p>
          <p>扫码上车</p>
        </div>
        <div className="QRCode">
        <img src={require("../../assets/img/launch2.png")} alt="" />
        </div>
        <div className="shareContentB">bananaSwap.com</div>
      </div>
      <div className="shareFooter">
        <p className="copyImg"><img src={require("../../assets/img/launch3.png")} alt="" /></p>
        <p className="font3">复制链接</p>
      </div>
    </Modal>
  )
}