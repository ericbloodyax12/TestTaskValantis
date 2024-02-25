import React from 'react';

import './App.css';
import {productApi} from "./api/productApi";


function App() {

  console.log( productApi.getItems())
  return (
    <div className="App">
      hello world!
    </div>
  );
}

export default App;
