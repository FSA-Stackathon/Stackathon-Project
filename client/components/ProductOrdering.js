import React from 'react';

export default function Ordering(props) {
  const setSortedProducts = props.setSortedProducts;
  const products = props.products;

  return (
    <div id="ordering-buttons">
      {'    '}
      &nbsp;&nbsp;&nbsp;
      <button
        id="ascending"
        value="ascending"
        type="button"
        className=""
        onClick={() =>
          setSortedProducts(
            [...products].sort(function (a, b) {
              const nameA = a.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
              const nameB = b.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            })
          )
        }
      >
        A - Z
      </button>{' '}
      {'    '}
      &nbsp;&nbsp;&nbsp;
      <button
        id="descending"
        value="descending"
        type="button"
        className=""
        onClick={() =>
          setSortedProducts(
            [...products].sort(function (a, b) {
              const nameA = a.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
              const nameB = b.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
              if (nameB < nameA) {
                return -1;
              }
              if (nameB > nameA) {
                return 1;
              }

              // names must be equal
              return 0;
            })
          )
        }
      >
        {' '}
        Z - A
      </button>{' '}
      {'    '}
      &nbsp;&nbsp;&nbsp;
      <button
        id="reset"
        value="reset"
        type="button"
        className=""
        onClick={() => setSortedProducts(products)}
      >
        {' '}
        Reset
      </button>
    </div>
  );
}
