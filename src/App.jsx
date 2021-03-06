import React from 'react';
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"

import Dfs from "./pages/Dfs";
import Bfs from "./pages/Bfs";
import Dijkstra from "./pages/Dijkstra";
import BellmanFord from "./pages/BellmanFord";
import FloydWarshall from "./pages/FloydWarshall";
import Prim from "./pages/Prim";
import Kruskal from "./pages/Kruskal";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router forceRefresh={true}>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/Algoritmos/DFS" component={Dfs}></Route>
            <Route path="/Algoritmos/BFS" component={Bfs}></Route>
            <Route path="/Algoritmos/DIJKSTRA" component={Dijkstra}></Route>
            <Route path="/Algoritmos/BELLMANFORD" component={BellmanFord}></Route>
            <Route path="/Algoritmos/FLOYDWARSHALL" component={FloydWarshall}></Route>
            <Route path="/Algoritmos/PRIM" component={Prim}></Route>
            <Route path="/Algoritmos/KRUSKAL" component={Kruskal}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
