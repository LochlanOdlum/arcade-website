import React from "react";
import GameSelection from "./GameSelection";
import "../styling/App.css";
import TicTacPage from "./TTT/TicTacPage";
import C4Page from './C4/C4Page';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <div className="app">
            <div className="main-header">
              <span className="name">
                <a className="nostyle header-link" href="http://arcade.lochlan.cc">Arcade ||</a>
                <a className="nostyle header-link" href="http://arcade.lochlan.cc"> Lochlan.cc</a>
              </span>
            </div>

            <div className="main">
              <GameSelection />
            </div>
          </div>
        </Route>

        <Route path="/ttt">
          <TicTacPage />
        </Route>

        <Route path="/connect4">
          <C4Page/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
