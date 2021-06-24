import React from "react";
import {Link,Route,Switch,Redirect} from 'react-router-dom'
import "./App.less";
import Main from "./components/main/main";
import {Home} from "./components/home";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/swap" component={Main} />
        <Redirect to="/home"/>
      </Switch>
    </div>
  );
}

export default App;
