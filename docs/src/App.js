import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Dice from "./dice/Dice";
import Etheroll from "./etheroll/Etheroll";
import TwoDice from "./two_dice/TwoDice";
import CoinFlip from "./coin_filp/CoinFlip";
import Endless from "./endless/Endless";
import Slider from "./component/Slider";

function App({ setLocale }) {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="Nav-div">
            <Link to={"/"} className="Nav-link">
              大厅
            </Link>
            <Link to={"/dice"} className="Nav-link">
              骰子
            </Link>
            <Link to={"/two_dice"} className="Nav-link">
              两颗骰子
            </Link>
            <Link to={"/coin_flip"} className="Nav-link">
              翻转钱币
            </Link>
            <Link to={"/etheroll"} className="Nav-link">
              数字猜猜乐
            </Link>
            <Link to={"/endless"} className="Nav-link">
              前进股市
            </Link>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={Slider} />
          <Route exact path="/dice" component={Dice} />
          <Route exact path="/etheroll" component={Etheroll} />
          <Route exact path="/two_dice" component={TwoDice} />
          <Route exact path="/coin_flip" component={CoinFlip} />
          <Route exact path="/endless" component={Endless} />
        </Switch>
        <footer className="App-footer"></footer>
      </div>
    </Router>
  );
}

export default App;
