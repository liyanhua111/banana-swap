import React from "react";
import {Link,Route,Switch,Redirect} from 'react-router-dom'
import "./App.less";
import Main from "./components/main/main";
import { Home } from "./components/home";
import {ComingSoon} from "./components/comingSoon";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/swap" component={Main} />
        {/* <Route path="/ComingSoon" component={ComingSoon} /> */}
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}

export default App;
