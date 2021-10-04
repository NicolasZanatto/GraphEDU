import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import './App.css';

import Dfs from "./pages/Dfs";
import Bfs from "./pages/Bfs";
import Dijkstra from "./pages/Dijkstra";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router forceRefresh={true}>
          <Switch>
            <Route path="/" exact component={()=> <Home></Home>}></Route>
            <Route path="/Algoritmos/DFS" component={()=><Dfs></Dfs>}></Route>
            <Route path="/Algoritmos/BFS" component={()=><Bfs></Bfs>}></Route>
            <Route path="/Algoritmos/DIJKSTRA" component={()=><Dijkstra></Dijkstra>}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
