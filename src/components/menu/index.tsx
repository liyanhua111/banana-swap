import React,{useState} from "react";
import { Menu } from "antd";
import { useTranslation, Trans, Translation } from 'react-i18next'
import { Link, useHistory, useLocation } from "react-router-dom";
import './styles.less'
import emitter from "../../utils/ev"

const { SubMenu } = Menu;


export const AppMenu = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const current = location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  emitter.addListener("changeCollapsed",(data)=>{
    setCollapsed(data)
  });
  const LeftMenu = (
    <div className="App-Menu">
      <div className="App-Menu-left">
        <Menu
          inlineCollapsed={collapsed}
          style={{ width: 240 }}
          defaultSelectedKeys={['/']}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
        >
          <Menu.Item key="/swap/index" icon={<img src={require('../../assets/img/nav/nav1.png')} className="navIcon" />}>
              <Link
                  to={{
                    pathname: "/swap/index",
                  }}
            >
                  {t('home')}
              </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<img src={require('../../assets/img/nav/nav2.png')} className="navIcon" />} title={t("Transaction")}>
              <Menu.Item key="/swap/">
                <Link
                  to={{
                    pathname: "/swap/",
                  }}
                >
                  {t('Exchange')}
                </Link>
              </Menu.Item>
              <Menu.Item key="/swap/add">
                <Link
                  to={{
                    pathname: "/swap/add",
                  }}
                >
                  {t("Pools")}
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
            <p className="lang" onClick={()=>i18n.changeLanguage(i18n.language=='en'?'zh':'en')}>
              <img src={require('../../assets/img/nav/lang.png')} alt="" />
              {i18n.language=='en'?'EN':'中文'}
            </p>
          </div>
          <div className="relationBox">
            <a href="https://github.com/bananadefilabs-001/banana">
              <img src={require('../../assets/img/nav/b1.png')} alt=""/>
            </a>
            <a href="">
              <img src={require('../../assets/img/nav/b2.png')} alt=""/>
            </a>
            <a href="https://twitter.com/BananaSwap_net">
              <img src={require('../../assets/img/nav/b3.png')} alt=""/>
            </a>
            <a href="https://bananaswap-net.medium.com/">
              <img src={require('../../assets/img/nav/b4.png')} alt=""/>
            </a>
            <a href="https://t.me/banana_swap">
              <img src={require('../../assets/img/nav/b5.png')} alt=""/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return LeftMenu;
};

