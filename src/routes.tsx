import { HashRouter, Route, Redirect } from "react-router-dom";
import React from "react";
import { ChartsView } from "./components/charts";

import { WalletProvider } from "./context/wallet";
import { ConnectionProvider } from "./utils/connection";
import { AccountsProvider } from "./utils/accounts";
import { CurrencyPairProvider } from "./utils/currencyPair";
import { MarketProvider } from "./context/market";
import { PoolOverview } from "./components/pool/view";
import { ExchangeView } from "./components/exchange";
import { IndexPage } from "./components/index";
import { IDO } from "./components/IDO/IDO";

export function Routes() {
  return (
    <>
      <HashRouter basename={"/"}>
        <ConnectionProvider>
          <WalletProvider>
            <AccountsProvider>
              <MarketProvider>
                <CurrencyPairProvider>
                  <Route exact path="/swap/index" component={IndexPage} />
                  <Route exact path="/swap/" component={ExchangeView} />
                  <Route exact path="/swap/add" component={ExchangeView} />
                  <Route exact path="/swap/info" component={() => <ChartsView />} />
                  <Route exact path="/swap/IDO" component={() => <IDO />} />
                  <Route
                    exact
                    path="/swap/pool"
                    component={() => <PoolOverview />}
                  />
                </CurrencyPairProvider>
              </MarketProvider>
            </AccountsProvider>
          </WalletProvider>
        </ConnectionProvider>
      </HashRouter>
    </>
  );
}
