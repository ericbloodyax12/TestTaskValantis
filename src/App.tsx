import React from 'react';

import './App.css';
import {productApi} from "./api/productApi";
import {hash, xAuth} from "./api/apiHelpers/xAuth";

function App() {
  console.log(hash)
  productApi.getItems()
  return (
    <div className="App">
hello world
    </div>
  );
}

export default App;
