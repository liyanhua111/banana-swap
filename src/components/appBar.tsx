import React from "react";
import { Button, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useWallet } from "../context/wallet";
import { AccountInfo } from "./accountInfo";
import { WalletConnect } from "./walletConnect";
import { useHistory, useLocation } from "react-router-dom";
import {changeHamburgerFunc,toggleCollapsedFunc} from '../redux/action'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'


export const AppBar = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const hamburger = useSelector((state: RootStateOrAny) => state.hamburger);
  // const collapsed = useSelector((state:RootStateOrAny)=>state.collapsed);
  const dispatch = useDispatch();
  const { connected } = useWallet();
  const location = useLocation();
  const history = useHistory();

  const TopBar = (
    <div className="App-Bar">
      <div className="App-Bar-left">
        {/* <div  onClick={() => dispatch(toggleCollapsedFunc(!collapsed))}>折叠</div> */}
        <div className="App-logo" onClick={() => history.push({ pathname: "/home" })} />
        {props.left}
      </div>
      <div className="App-Bar-right">
        <WalletConnect>
          <AccountInfo />
        </WalletConnect>
        {connected && (
          <Button
            className={location.pathname==='/swap/pool'?'poolActive':''}
            type="text"
            size="large"
            onClick={() => history.push({ pathname: "/swap/pool" })}
          >
            My Pools
          </Button>
        )}
        <MenuOutlined className="cell-menu" onClick={() => dispatch(changeHamburgerFunc(!hamburger))} />
        {/* {props.right} */}
      </div>
    </div>
  );

  return TopBar;
};

