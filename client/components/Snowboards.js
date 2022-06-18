import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './AllProducts';

export default function AllSnowboards(props) {
  const { products } = useContext(ProductContext);

  return (
    <div>
      <ul>
        {products
          .filter((product) => product.id && product.type === 'snowboard')
          .map((product) => (
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
