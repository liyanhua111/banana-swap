import React, { FunctionComponent } from "react";
import { Dropdown, Menu,ConfigProvider } from "antd";
import { useTranslation } from 'react-i18next';
import { useWallet } from "../context/wallet";
import { ExplorerLink } from "./explorerLink";

export const WalletConnect: FunctionComponent = ({ children }) => {
  const { t } = useTranslation();
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || "";

  const menu = (
    <Menu style={{ textAlign: "right" }}>
      {connected && (
        <ExplorerLink
          type="address"
          address={publicKey}
          style={{ padding: 12 }}
        />
      )}
      {connected &&(
        <Menu.Item key="4" onClick={() => navigator.clipboard.writeText(publicKey)}>
          {t("CopyAddress")}
        </Menu.Item>
      )}
      <Menu.Item key="3" onClick={select}>
        <span>{t("ChangeWallet")}</span>
      </Menu.Item>
      {connected && (
        <Menu.Item
          key="2"
          style={{ color: "rgba(255, 0, 0, 0.7)" }}
          onClick={disconnect}
        >
          {t("Disconnect")}
        </Menu.Item>
      )}
    </Menu>
  );

  if (connected) {
    return (
      <Dropdown  overlay={menu} trigger={["hover"]}>
        <div style={{ cursor: "pointer" }}>{children}</div>
      </Dropdown>
    );
  }

  return (
    <ConfigProvider autoInsertSpaceInButton = { false }> 
      <Dropdown.Button onClick={connected ? disconnect : connect} overlay={menu}>
      {connected ? t("Disconnect") : t("Connect")}
      </Dropdown.Button>
    </ConfigProvider>
  );
};
