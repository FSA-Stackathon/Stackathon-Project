import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <div id='all-products'>
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Welcome to the all products page!
        </h1>
        <h3>Product List:</h3>
        <ul>
          {this.props.products.map((product) => (
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
}

const mapStateToProps = (state) => ({ products: state.products });

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
