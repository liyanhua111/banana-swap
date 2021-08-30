import React from "react";
import { Button, Col, Popover, Row } from "antd";
import { useTranslation } from "react-i18next";
import { PoolInfo } from "../../models";
import { CopyOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ExplorerLink } from "./../explorerLink";
import { useConnectionConfig } from "../../utils/connection";
import { getTokenName } from "../../utils/utils";

const Address = (props: {
  address: string;
  style?: React.CSSProperties;
  label?: string;
}) => {
  return (
    <Row style={{ width: "300px", ...props.style }}>
      {props.label && <Col span={8} style={{textAlign:'right'}}>{props.label}:</Col>}
      <Col span={14}>
        <ExplorerLink address={props.address} code={true} type="address" />
      </Col>
      <Col span={2} style={{ display: "flex" }}>
        <Button
          shape="round"
          icon={<CopyOutlined />}
          size={"small"}
          style={{ marginLeft: "auto", marginRight: "10px" }}
          onClick={() => navigator.clipboard.writeText(props.address)}
        />
      </Col>
    </Row>
  );
};

export const PoolAddress = (props: {
  pool?: PoolInfo;
  style?: React.CSSProperties;
  showLabel?: boolean;
  label?: string;
}) => {
  const { pool } = props;
  const label = props.label || "Address";
  const { tokenMap } = useConnectionConfig();
  const mint1 = pool?.pubkeys.holdingMints[0];
  const mint2 = pool?.pubkeys.holdingMints[1];
  let aName, bName;
  if (mint1) {
    aName = getTokenName(tokenMap, mint1.toBase58());
  }
  if (mint2) {
    bName = getTokenName(tokenMap, mint2.toBase58());
  }

  if (!pool?.pubkeys.account) {
    return null;
  }

  return (
    <Address
      address={pool.pubkeys.account.toBase58()}
      style={props.style}
      label={aName + "-" + bName}
    />
  );
};

export const AccountsAddress = (props: {
  pool?: PoolInfo;
  poolA?: PoolInfo;
  poolB?: PoolInfo;
  style?: React.CSSProperties;
}) => {
  const { tokenMap } = useConnectionConfig();
  const { pool, poolA, poolB } = props;

  if (!pool && !poolA && !poolB) {
    return null;
  }

  let account1 = pool?.pubkeys.holdingAccounts[0];
  let account2 = pool?.pubkeys.holdingAccounts[1];
  let mint1 = pool?.pubkeys.holdingMints[0];
  if (poolA) {
    mint1 = poolA?.pubkeys.holdingMints[1];
    account1 = poolA?.pubkeys.holdingAccounts[1];
  }
  let mint2 = pool?.pubkeys.holdingMints[1];
  if (poolB) {
    mint2 = poolB?.pubkeys.holdingMints[1];
    account2 =poolB?.pubkeys.holdingAccounts[1];
  }
  let aName, bName;
  if (mint1) {
    aName = getTokenName(tokenMap, mint1.toBase58());
    console.log(aName,"====")
  }
  if (mint2) {
    bName = getTokenName(tokenMap, mint2.toBase58());
    console.log(bName,"====")
  }

  return (
    <>
      {account1 && (
        <Address
          address={account1.toBase58()}
          style={props.style}
          label={aName}
        />
      )}
      {account2 && (
        <Address
          address={account2.toBase58()}
          style={props.style}
          label={bName}
        />
      )}
    </>
  );
};

export const AdressesPopover = (props: {
  pool?: PoolInfo;
  poolA?: PoolInfo;
  poolB?: PoolInfo;
}) => {
  const { t } = useTranslation();
  const { pool, poolA, poolB } = props;

  if (!pool && !poolA && !poolB) {
    return null;
  }
  return (
    <Popover
      placement="topRight"
      title={t("Addresses")}
      trigger="hover"
      content={
        <>
          {poolA && (
            <PoolAddress pool={poolA} showLabel={true} label={"Pool"} />
          )}
          {poolB && (
            <PoolAddress pool={poolB} showLabel={true} label={"Pool"} />
          )}
          {pool && !poolA && !poolB && (
            <PoolAddress pool={pool} showLabel={true} label={"Pool"} />
          )}
          <AccountsAddress pool={pool} poolA={poolA} poolB={poolB} />
        </>
      }
    >
      <Button
        style={{ color: "#FFC000", marginTop: "3px" }}
        shape="circle"
        size="large"
        type="text"
        icon={<InfoCircleOutlined />}
      />
    </Popover>
  );
};
