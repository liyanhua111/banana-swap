import React from "react";
import { useHistory } from "react-router-dom";
import './style.less'


export const ComingSoon = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const history = useHistory();
  const ComingSoon = (
    <div className="ComingSoonPage">
      <div className="ComingSoon">
        <div className="logoBox">
          <img src={require("../../assets/img/comingSoon/logo.png")} alt=""/>
        </div>
        <p className="font1">COMING SOON </p>
        <p className="font2">contact us </p>
        <div className="relativeBox">
          <a href="https://twitter.com/BananaSwap_net" target="_blank" ><img src={require("../../assets/img/comingSoon/1.png")} alt="" /></a>
          <a href="https://discord.gg/AWmXjCECgm" target="_blank"><img src={require("../../assets/img/comingSoon/2.png")} alt=""/></a>
          <a href="https://github.com/bananadefilabs-001/banana" target="_blank"><img src={require("../../assets/img/comingSoon/3.png")} alt=""/></a>
          <a href="contact@bananaswap.net" target="_blank"><img src={require("../../assets/img/comingSoon/4.png")} alt=""/></a>
          <a href="https://www.facebook.com/BananaSwap" target="_blank"><img src={require("../../assets/img/comingSoon/5.png")} alt=""/></a>
          <a href="https://t.me/banana_swap" target="_blank"><img src={require("../../assets/img/comingSoon/6.png")} alt=""/></a>
          <a href="https://bananaswap-net.medium.com/" target="_blank"><img src={require("../../assets/img/comingSoon/7.png")} alt=""/></a>
        </div>
      </div>
    </div>
  );

  return ComingSoon;
};

