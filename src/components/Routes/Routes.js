import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from '../Home';
import Game from '../Game';
import Statistic from '../Statistic';

const Routes = () => (
  <div>
    <ul>
      <li>
        <Link to="/home">Home Page</Link>
      </li>
      <li>
        <Link to="/game">Game</Link>
      </li>
      <li>
        <Link to="/statistic">Statistic</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/game" component={Game} />
      <Route path="/statistic" component={Statistic} />
      <Route exact path="/" component={Home} />
    </Switch>
  </div>
);

export default Routes;
