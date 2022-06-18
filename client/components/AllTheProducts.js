import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './AllProducts';

export default function AllTheProducts(props) {
  const { products } = useContext(ProductContext);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <Link to={`/products/${product.id}`}>
              <button>view</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
