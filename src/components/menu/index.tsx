import React from "react";
import { Menu } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useHistory, useLocation } from "react-router-dom";
import './styles.less'
const { SubMenu } = Menu;


export const AppMenu = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  // const location = useLocation();
  // const history = useHistory();
  const handleClick =()=>{
    
  }
  const LeftMenu = (
    <div className="App-Menu">
      <div className="App-Menu-left">
        <Menu
          onClick={handleClick}
          style={{ width: 240 }}
          defaultSelectedKeys={['/']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <Menu.Item key="1" icon={<img src={require('../../assets/img/nav/nav1.png')} className="navIcon" />}>
              <Link
                  to={{
                    pathname: "/home",
                  }}
            >
                  首页
              </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<img src={require('../../assets/img/nav/nav2.png')} className="navIcon" />} title="交易">
              <Menu.Item key="/swap">
                <Link
                  to={{
                    pathname: "/swap/",
                  }}
                >
                  兑换
                </Link>
              </Menu.Item>
              <Menu.Item key="/swap/add">
                <Link
                  to={{
                    pathname: "/swap/add",
                  }}
                >
                  流动性
                </Link>
              </Menu.Item>
          </SubMenu>
        </Menu>
        <div className="bottomBox">
          <div className="infor">
            <p className="logoImg">
              <img src={require('../../assets/img/nav/logo.png')} alt="" />
              $18.356
            </p>
            <p className="lang">
              <img src={require('../../assets/img/nav/lang.png')} alt="" />
              EN
            </p>
          </div>
          <div className="relationBox">
            <a href="">
              <img src={require('../../assets/img/nav/b1.png')} alt=""/>
            </a>
            <a href="">
              <img src={require('../../assets/img/nav/b2.png')} alt=""/>
            </a>
            <a href="">
              <img src={require('../../assets/img/nav/b3.png')} alt=""/>
            </a>
            <a href="">
              <img src={require('../../assets/img/nav/b4.png')} alt=""/>
            </a>
            <a href="">
              <img src={require('../../assets/img/nav/b5.png')} alt=""/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return LeftMenu;
};

