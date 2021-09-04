import React from "react";
import {  CopyOutlined } from "@ant-design/icons";

export const Addressmodule = (props: { address: string, goUrl?: boolean, copy?: boolean,color?:string }) => {
  const {address,goUrl,copy,color}=props
  let addressFilter = `${address.substring(0, 6)}...${address.substr(address.length - 4,address.length)}`
  if (!goUrl) {
    return (
      <>
        {addressFilter}
      </>
    )
  } else {
    return( <>
      <p className="addressModule">
        <a>
          <span style={{color:color}}>{addressFilter}</span>
          <img src={require("../../assets/img/goUrl.png")} className="img2" alt="" />
          {copy&&<CopyOutlined onClick={() => navigator.clipboard.writeText(props.address)} />}
        </a>
      </p>
    </>)
  }
}

