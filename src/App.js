import React from 'react';
import Canvas from "./components/canvas/canvas";
import { Provider } from "react-redux";
import store from "./store";
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <section className="Main">
          <Canvas />
        </section>
      </Provider>
    </div>
  );
}

export default App;
