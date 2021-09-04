import { HashRouter, Route, Redirect } from "react-router-dom";
import React from "react";
import { ChartsView } from "./components/charts";
import { InfoView } from "./components/Info";

import { WalletProvider } from "./context/wallet";
import { ConnectionProvider } from "./utils/connection";
import { AccountsProvider } from "./utils/accounts";
import { CurrencyPairProvider } from "./utils/currencyPair";
import { MarketProvider } from "./context/market";
import { PoolOverview } from "./components/pool/view";
import { ExchangeView } from "./components/exchange";
import { IndexPage } from "./components/index";
import { IBO } from "./components/IBO/IBO";
import { launchView } from "./components/IBO/launch";
import { IBOJoinView } from "./components/IBO/join";
import { JoinDetailView } from "./components/IBO/joinDetail";
import { LaunchDetailView } from "./components/IBO/launchDetail";
import { Farm } from "./components/page/farm";
import { Info } from "./components/page/Info";
import { Pool } from "./components/page/pool";
import { Jungles } from "./components/page/Jungles";
import { Trading } from "./components/page/Trading";

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
                  {/* <Route exact path="/swap/info" component={() => <ChartsView />} /> */}
                  {/* <Route exact path="/swap/Info" component={() => <InfoView />} /> */}
                  <Route exact path="/swap/IBO" component={() => <IBO />} />
                  <Route exact path="/swap/IBO/launch" component={launchView} />
                  <Route exact path="/swap/IBO/join" component={IBOJoinView} />
                  <Route exact path="/swap/IBO/joinDetail" component={JoinDetailView} />
                  <Route exact path="/swap/IBO/launchDetail" component={LaunchDetailView} />
                  <Route exact path="/swap/farm" component={() => <Farm />} />
                  <Route exact path="/swap/Info" component={() => <Info />} />
                  <Route exact path="/swap/pool" component={() => <Pool />} />
                  <Route exact path="/swap/Jungles" component={() => <Jungles />} />
                  <Route exact path="/swap/Trading" component={() => <Trading />} />
                  <Route
                    exact
                    path="/swap/myPool"
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
