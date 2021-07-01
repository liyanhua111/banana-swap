import React from "react";
import { Select } from "antd";
import { useTranslation } from 'react-i18next'
import { ENDPOINTS, useConnectionConfig } from "../utils/connection";
import { Slippage } from "./slippage";

export const Settings = () => {
  const { t } = useTranslation();
  const { endpoint, setEndpoint } = useConnectionConfig();

  return (
    <>
      <div>
        <span style={{ display: "inline-block", fontSize: '16px', marginBottom: '10px' }}>{t("TransactionsSettings")}</span>
        <div>
          <span style={{ fontSize: '14px' }}>{t("Slippage")}</span>
          <Slippage />
        </div>
      </div>
      <div style={{ display: "grid" }}>
       {t("Network")}
        <Select
          onSelect={setEndpoint}
          value={endpoint}
          style={{ marginRight: 8 }}
        >
          {ENDPOINTS.map(({ name, endpoint }) => (
            <Select.Option value={endpoint} key={endpoint}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </>
  );
};
