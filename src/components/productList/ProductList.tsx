import {useState} from "react";

const ProductList = () => {
  const [products, setProducts] = useState([])
  return (
      <div>
        <h1> Product List </h1>
        {/*<ul>*/}
        {/*  {products.map((product) => {*/}
        {/*   <li>{product}</li>*/}
        {/*  })}*/}
        {/*</ul>*/}

      </div>
  )
}