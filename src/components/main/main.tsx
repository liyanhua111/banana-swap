import React from "react";
import "./style.less";
import { Routes } from "../../routes";
import { AppMenu } from '../../components/menu'
function Main() {
  return (
    <div className="main-content">
      <AppMenu></AppMenu>
      <div className="main-body">
        <Routes />
      </div>
    </div>
  );
}

export default Main;
