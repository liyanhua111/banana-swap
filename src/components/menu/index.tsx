import React,{useEffect} from "react";
import { Menu, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation, Trans, Translation } from 'react-i18next'
import { Link, useHistory, useLocation } from "react-router-dom";
import {changeHamburgerFunc,toggleCollapsedFunc} from '../../redux/action'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import './styles.less'

const { SubMenu } = Menu;


export const AppMenu = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const collapsed = useSelector((state: RootStateOrAny) => state.collapsed);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  let current = location.pathname;
  let pathSplit = location.pathname.split('/')
  if (pathSplit.length > 3) {
    pathSplit.splice(pathSplit.length - (pathSplit.length-3),pathSplit.length-3)
    current = pathSplit.join('/')
  }
  // const handleClick = function (data: any) {
    // if (data.key.indexOf('developing')>-1) {
    //   message.info(t('developing'))
    // }
  // }
  useEffect(()=>{
    dispatch(changeHamburgerFunc(true))
	},[location])
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
          <SubMenu key="sub1" icon={<img src={require('../../assets/img/nav/nav3.png')} className="navIcon" />} title={t("Trade")}>
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
                  {t("Liquidity")}
                </Link>
              </Menu.Item>
          </SubMenu>
          <Menu.Item key="/swap/Trading" icon={<img src={require('../../assets/img/nav/nav2.png')} className="navIcon" />}>
            <Link
              to={{
                pathname: "/swap/Trading",
              }}
            >
              Trading
            </Link>
          </Menu.Item>
          <Menu.Item key="/swap/farm" icon={<img src={require('../../assets/img/nav/nav4.png')} className="navIcon" />}>
            <Link
              to={{
                pathname: "/swap/farm",
              }}
            >
              {t("farm")}
            </Link>
          </Menu.Item>
          <Menu.Item key="/swap/pool" icon={<img src={require('../../assets/img/nav/nav5.png')} className="navIcon" />}>
            <Link
              to={{
                pathname: "/swap/pool",
              }}
            >
              {t("pool")}
            </Link>
          </Menu.Item>
          <Menu.Item key="/swap/Jungles" icon={<img src={require('../../assets/img/nav/nav6.png')} className="navIcon" />}>
            <Link
              to={{
                pathname: "/swap/Jungles",
              }}
            >
              Jungles
            </Link>
          </Menu.Item>
          <Menu.Item key="/swap/IBO" icon={<img src={require('../../assets/img/nav/nav7.png')} className="navIcon" />}>
            <Link
                  to={{
                    pathname: "/swap/IBO",
                  }}
            >
                  IBO
            </Link>
          </Menu.Item>
          <Menu.Item key="/swap/Info" icon={<img src={require('../../assets/img/nav/nav8.png')} className="navIcon" />}>
            <Link
                  to={{
                    pathname: "/swap/Info",
                  }}
            >
                  {t('Info')}
            </Link>
          </Menu.Item>
        </Menu>
        <div className="bottomBox">
          <div className="infor">
            <p className="logoImg">
              <img src={require('../../assets/img/nav/logo.png')} alt="" />
              $0
            </p>
            <p className="lang" onClick={()=>i18n.changeLanguage(i18n.language=='en'?'zh':'en')}>
              <img src={require('../../assets/img/nav/lang.png')} alt="" />
              {i18n.language=='en'?'EN':'中文'}
            </p>
          </div>
          <div className="relationBox">
            <a href="https://github.com/bananadefilabs-001">
              <img src={require('../../assets/img/nav/b1.png')} alt=""/>
            </a>
            {/* <a href="">
              <img src={require('../../assets/img/nav/b2.png')} alt=""/>
            </a> */}
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

export const AppMenuCell = () => {
  const hamburger = useSelector((state:RootStateOrAny)=>state.hamburger);
  const dispatch = useDispatch();
  
  const LeftMenu = (
    <div className="navBox">
      <div className="nav-Box-m">
        <div className={`overlay ${hamburger?'fadeOut':'fadeIn'}`} onClick={() => dispatch(changeHamburgerFunc(!hamburger))}></div>
        <div  className={`popup-right ${hamburger?'fadeOut':'fadeIn'}`}>
          <div>
            <div className="closeBox">
              <CloseOutlined onClick={() => dispatch(changeHamburgerFunc(!hamburger))} className="closeIcon" />
            </div>
            <div className="NavPc">
              <AppMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  )


  return LeftMenu;
};

