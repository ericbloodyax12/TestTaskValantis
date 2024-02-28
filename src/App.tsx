import React from 'react';
import {Button} from "devextreme-react";
import './App.css';
import {ProductList} from "./components/productList/ProductList";

function App() {


  return (
    <div className="App">
      hello world!
      <ProductList />
      <Button
          text="Click me"
          onClick={() => {
            console.log("button")}}
      />
    </div>
  );
}

export default App;
