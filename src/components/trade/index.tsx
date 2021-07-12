import { Button, Card, Popover, Spin, Typography, Modal } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useConnection,
  useConnectionConfig,
  useSlippageConfig,
  sendTransaction,
} from "../../utils/connection";
import { useWallet } from "../../context/wallet";
import { CurrencyInput } from "../currencyInput";
import {
  LoadingOutlined,
  SwapOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  swap,
  usePoolForBasket,
  PoolOperation,
  calculateDependentAmount,
  LIQUIDITY_PROVIDER_FEE,
} from "../../utils/pools"; // @ts-ignore
import { useAccountByMint } from "../../utils/accounts";
import { notify } from "../../utils/notifications";
import {
  useCurrencyPairState,
  CurrencyContextState,
} from "../../utils/currencyPair";
import { generateActionLabel, POOL_NOT_AVAILABLE, SWAP_LABEL } from "../labels";
import "./trade.less";
import { colorWarning, getTokenName } from "../../utils/utils";
import { AdressesPopover } from "../pool/address";
import { PoolInfo } from "../../models";
import { useEnrichedPools } from "../../context/market";
import { AppBar } from "../appBar";
import { Settings } from "../settings";
import { MigrationModal } from "../migration";
import { PublicKey } from "@solana/web3.js";

const { Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const TradeEntry = () => {
  const { t } = useTranslation();
  const { wallet, connect, connected } = useWallet();
  const connection = useConnection();
  const [pendingTx, setPendingTx] = useState(false);
  const [toInfo, setToInfo] = useState({});
  const [fromInfo, setFromInfo] = useState({});
  const {
    A,
    B,
    setLastTypedAccount,
    setPoolOperation,
  } = useCurrencyPairState();

  const pool = usePoolForBasket([A?.mintAddress, B?.mintAddress]);
  const routeAddress = "So11111111111111111111111111111111111111112";
  const routeAccount = useAccountByMint(routeAddress);
  const poolA = usePoolForBasket([A?.mintAddress, routeAddress]);
  const poolB = usePoolForBasket([routeAddress, B?.mintAddress]);
  let swapList: any[] = [];
  const { slippage } = useSlippageConfig();
  const { tokenMap } = useConnectionConfig();
  const swapAccounts = () => {
    const tempMint = A.mintAddress;
    const tempAmount = A.amount;
    A.setMint(B.mintAddress);
    A.setAmount(B.amount);
    B.setMint(tempMint);
    B.setAmount(tempAmount);
    // @ts-ignore
    setPoolOperation((op: PoolOperation) => {
      switch (+op) {
        case PoolOperation.SwapGivenInput:
          return PoolOperation.SwapGivenProceeds;
        case PoolOperation.SwapGivenProceeds:
          return PoolOperation.SwapGivenInput;
        case PoolOperation.Add:
          return PoolOperation.SwapGivenInput;
      }
    });
  };

  const handleSwap = async () => {
    if (A.account && B.mintAddress) {
      try {
        setPendingTx(true);
        const components = [
          {
            account: A.account,
            mintAddress: A.mintAddress,
            amount: A.convertAmount(),
          },
          {
            mintAddress: B.mintAddress,
            amount: B.convertAmount(),
          },
        ];
        // sessionStorage.setItem("solAccount", JSON.stringify(A.account));
        console.log(components, "components-----");
        if (!pool) {
          // @ts-ignore
          await swap(connection, wallet, components, slippage, pool, swapList);
          return;
        }
        await swap(connection, wallet, components, slippage, pool);
      } catch {
        notify({
          description:
            "Please try again and approve transactions from your wallet",
          message: "Swap trade cancelled.",
          type: "error",
        });
      } finally {
        setPendingTx(false);
      }
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getToInfoResult = async () => {
    // @ts-ignore
    const pool: PoolInfo = poolA;
    if (!pool) {
      return;
    }
    const independent = A.mintAddress; // @ts-ignore  froma ddress
    const poolOperation = 1; // @ts-ignore
    const amount: number = A.amount;
    const result = await calculateDependentAmount(
      connection,
      independent,
      amount,
      pool,
      poolOperation
    );
    const componentsRoutA = {
      components: [
        {
          account: A.account,
          mintAddress: A.mintAddress,
          amount: A.convertAmount(),
        },
        {
          mintAddress: routeAddress,
          amount: result,
        },
      ],
      pool,
    };

    swapList.push(componentsRoutA);
    const result1 = await calculateDependentAmount(
      connection,
      routeAddress, // @ts-ignore
      result,
      poolB,
      poolOperation
    ); // @ts-ignore
    toInfo.setAmount(result1);
    // setLastTypedAccount(fromInfo.mintAddress);
     // @ts-ignore
    // const routeAccount = JSON.parse(sessionStorage.getItem("solAccount"))
    const componentsRoutB = {
      components: [
        {
          account: routeAccount,
          mintAddress: routeAddress,
          amount: result,
        },
        {
          mintAddress: B.mintAddress,
          amount: result1,
        },
      ],
      pool: poolB,
    };
    swapList.push(componentsRoutB);
  };
  useEffect(() => {
    if (!pool) {
      getToInfoResult();
    }
    // @ts-ignore
    setFromInfo(A);
    // @ts-ignore
    setToInfo(B);
  });

  return (
    <>
      <Modal
        title={t("Settings")}
        visible={isModalVisible}
        centered
        onCancel={handleCancel}
        footer={null}
      >
        <Settings />
      </Modal>
      <div className="input-card">
        <div className="desBox">
          <div className="desL">
            <div className="font1">{t("Exchange")}</div>
            <div className="font2">{t("ExchangeTokens")}</div>
          </div>
          <div className="desR">
            <img
              src={require("../../assets/img/icon1.png")}
              onClick={showModal}
              className="img1"
              style={{ marginRight: 0 }}
              alt=""
            />
            {/* <img src={require('../../assets/img/icon2.png')} alt="" /> */}
            <AdressesPopover pool={pool} />
          </div>
        </div>
        <CurrencyInput
          title="Input"
          onInputChange={async (val: any) => {
            setPoolOperation(PoolOperation.SwapGivenInput); // @ts-ignore
            if (fromInfo.amount !== val) { // @ts-ignore
              setLastTypedAccount(fromInfo.mintAddress);
            } // @ts-ignore
            fromInfo.setAmount(val);
          }} // @ts-ignore
          amount={fromInfo.amount} // @ts-ignore
          mint={fromInfo.mintAddress}
          onMintChange={(item) => {
            // @ts-ignore
            fromInfo.setMint(item);
          }}
        />
        <Button type="primary" className="swap-button" onClick={swapAccounts}>
          ⇅
        </Button>
        <CurrencyInput
          title="To (Estimate)"
          onInputChange={(val: any) => {
            setPoolOperation(PoolOperation.SwapGivenProceeds); // @ts-ignore
            if (toInfo.amount !== val) {
              // @ts-ignore
              setLastTypedAccount(toInfo.mintAddress); // @ts-ignore
            } // @ts-ignore
            toInfo.setAmount(val);
          }} // @ts-ignore
          amount={toInfo.amount} // @ts-ignore
          mint={toInfo.mintAddress} // @ts-ignore
          onMintChange={(item) => {
            // @ts-ignore
            toInfo.setMint(item);
          }}
        />
      </div>
      <Button
        className="trade-button"
        type="primary"
        size="large"
        onClick={connected ? handleSwap : connect}
        style={{ width: "100%" }}
        disabled={
          connected &&
          (pendingTx ||
            !A.account ||
            !B.mintAddress ||
            A.account === B.account ||
            !A.sufficientBalance())
          // ||
          // !pool && !poolA && !poolA
        }
      >
        {generateActionLabel(
          !pool
            ? POOL_NOT_AVAILABLE(
              getTokenName(tokenMap, A.mintAddress),
              getTokenName(tokenMap, B.mintAddress)
            )
            : SWAP_LABEL,
          connected,
          tokenMap,
          A,
          B,
          true
        )}
        {pendingTx && <Spin indicator={antIcon} className="add-spinner" />}
      </Button>
      <TradeInfo pool={pool} />
    </>
  );
};

export const TradeInfo = (props: { pool?: PoolInfo }) => {
  const { t } = useTranslation();
  const { A, B } = useCurrencyPairState();
  const { pool } = props;
  const { slippage } = useSlippageConfig();
  const pools = useMemo(() => (pool ? [pool] : []), [pool]);
  const enriched = useEnrichedPools(pools);

  const [amountOut, setAmountOut] = useState(0);
  const [priceImpact, setPriceImpact] = useState(0);
  const [lpFee, setLpFee] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [priceAccount, setPriceAccount] = useState("");

  useEffect(() => {
    if (!pool || enriched.length === 0) {
      return;
    }
    if (B.amount) {
      const minAmountOut = parseFloat(B?.amount) * (1 - slippage);

      setAmountOut(minAmountOut);
    }
    const liqA = enriched[0].liquidityA;
    const liqB = enriched[0].liquidityB;
    const supplyRatio = liqA / liqB;
    // We need to make sure the order matched the pool's accounts order
    const enrichedA = A.mintAddress === enriched[0].mints[0] ? A : B;
    const enrichedB = enrichedA.mintAddress === A.mintAddress ? B : A;
    const calculatedRatio =
      parseFloat(enrichedA.amount) / parseFloat(enrichedB.amount);
    // % difference between pool ratio and  calculated ratio
    setPriceImpact(Math.abs(100 - (calculatedRatio * 100) / supplyRatio));
    console.log(amountOut, "minAmountOut===");
    // 6 decimals without trailing zeros
    const lpFeeStr = (parseFloat(A.amount) * LIQUIDITY_PROVIDER_FEE).toFixed(6);
    setLpFee(parseFloat(lpFeeStr));

    if (priceAccount === B.mintAddress) {
      setExchangeRate(parseFloat(B.amount) / parseFloat(A.amount));
    } else {
      setExchangeRate(parseFloat(A.amount) / parseFloat(B.amount));
    }
  }, [A, B, slippage, pool, enriched, priceAccount]);

  const handleSwapPriceInfo = () => {
    if (priceAccount !== B.mintAddress) {
      setPriceAccount(B.mintAddress);
    } else {
      setPriceAccount(A.mintAddress);
    }
  };
  return !!parseFloat(B.amount) ? (
    <div className="pool-card" style={{ width: "initial" }}>
      <div className="pool-card-row">
        <Text className="pool-card-cell">{t("Price")}</Text>
        <div className="pool-card-cell " title={exchangeRate.toString()}>
          <Button
            shape="circle"
            size="middle"
            type="text"
            icon={<SwapOutlined />}
            onClick={handleSwapPriceInfo}
          >
            {exchangeRate.toFixed(6)}&nbsp;
            {priceAccount === B.mintAddress ? B.name : A.name} per&nbsp;
            {priceAccount === B.mintAddress ? A.name : B.name}&nbsp;
          </Button>
        </div>
      </div>
      <div className="pool-card-row">
        <Text className="pool-card-cell">
          <Popover
            trigger="hover"
            content={<div style={{ width: 300 }}>{t("exchangeTip1")}</div>}
          >
            {t("MinimumReceived")} <QuestionCircleOutlined />
          </Popover>
        </Text>
        <div className="pool-card-cell " title={amountOut.toString()}>
          {amountOut.toFixed(6)} {B.name}
        </div>
      </div>
      <div className="pool-card-row">
        <Text className="pool-card-cell">
          <Popover
            trigger="hover"
            content={<div style={{ width: 300 }}>{t("exchangeTip2")}</div>}
          >
            {t("PriceImpact")} <QuestionCircleOutlined />
          </Popover>
        </Text>
        <div
          className="pool-card-cell "
          title={priceImpact.toString()}
          style={{ color: colorWarning(priceImpact) }}
        >
          {priceImpact < 0.01 ? "< 0.01%" : priceImpact.toFixed(3) + "%"}
        </div>
      </div>
      <div className="pool-card-row">
        <Text className="pool-card-cell">
          <Popover
            trigger="hover"
            content={
              <div style={{ width: 300 }}>
                {t("exchangeTip3a")} ({LIQUIDITY_PROVIDER_FEE * 100}%){" "}
                {t("exchangeTip3b")}
              </div>
            }
          >
            {t("LiquidityProviderFee")} <QuestionCircleOutlined />
          </Popover>
        </Text>
        <div className="pool-card-cell " title={lpFee.toString()}>
          {lpFee} {A.name}
        </div>
      </div>
    </div>
  ) : null;
};

export const TradeView = () => {
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
      >
        <TradeEntry />
      </Card>
      <MigrationModal />
    </>
  );
};
