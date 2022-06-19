import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './AllProducts';
import ProductOrdering from './ProductOrdering';

export default function AllSnowboards(props) {
  const { products } = useContext(ProductContext);
  const [sortedProducts, setSortedProducts] = useState([]);

  const finalProds = sortedProducts.length > 0 ? sortedProducts : products;

  return (
    <div>
      <ProductOrdering
        setSortedProducts={setSortedProducts}
        products={products}
      />
      <ul>
        {finalProds
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
