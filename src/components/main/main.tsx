import React,{useState} from "react";
import "./style.less";
import { Routes } from "../../routes";
import { AppMenu,AppMenuCell } from '../../components/menu'

function Main() {
  const [clientWidth, setClientWidth] = useState(0);
  // setClientWidth(document.body.clientWidth)
  // window.addEventListener('resize', () => setClientWidth(document.body.clientWidth));
  return (
    <div className="main-content">
      {clientWidth<=600?<AppMenuCell></AppMenuCell>:<AppMenu></AppMenu>}
      <div className="main-body">
        <Routes />
      </div>
    </div>
  );
}

export default Main;
