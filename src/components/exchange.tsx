import React from "react";
import { Button, Card, Popover } from "antd";
import { TradeEntry } from "./trade";
import { AddToLiquidity } from "./pool/add";
import { Settings } from "./settings";
import { SettingOutlined } from "@ant-design/icons";
import { AppBar } from "./appBar";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ExchangeView = (props: {}) => {
  const { t } = useTranslation();
  const tabStyle: React.CSSProperties = { width: 120 };
  const tabList = [
    {
      key: "trade",
      tab: <div style={tabStyle}>{ t("Trade")}</div>,
      render: () => {
        return <TradeEntry />;
      },
    },
    {
      key: "pool",
      tab: <div style={tabStyle}>{ t("Pool")}</div>,
      render: () => {
        return <AddToLiquidity />;
      },
    }
  ];

  const location = useLocation();
  const history = useHistory();
  const activeTab = location.pathname.indexOf("add") < 0 ? "trade" : "pool";

  const handleTabChange = (key: any) => {
    if (activeTab !== key) {
      if (key === "trade") {
        history.push("/swap/");
      } else {
        history.push("/swap/add");
      }
    }
  };

  return (
    <>
      <AppBar
        right={
          <Popover
            placement="topRight"
            title="Settings"
            content={<Settings />}
            trigger="click"
          >
            <Button
              shape="circle"
              size="large"
              type="text"
              icon={<SettingOutlined />}
            />
          </Popover>
        }
      />
      <Card
        className="exchange-card"
        headStyle={{ padding: 0 }}
        bodyStyle={{ position: "relative" }}
        tabList={tabList}
        tabProps={{
          tabBarGutter: 0,
        }}
        activeTabKey={activeTab}
        onTabChange={(key) => {
          handleTabChange(key);
        }}
      >
        <div className="contentBox">
          {tabList.find((t) => t.key === activeTab)?.render()}
        </div>
      </Card>
    </>
  );
};
