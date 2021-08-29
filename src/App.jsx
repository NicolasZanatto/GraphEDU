import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"
import './App.css';

import Dfs from "./pages/Dfs";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/Algoritmos/DFS" component={Dfs}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;