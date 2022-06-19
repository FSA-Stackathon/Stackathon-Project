import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct, addToCart } from '../store/singleProduct';

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { product, addItemToCart, user } = this.props;
    return (
      <div>
        <h1>Welcome to the single product page!</h1>
        <h3>Product Details</h3>
        <ul>
          <li>Name: {product.name}</li>
          <li>Price: ${product.price}</li>
          <li>Type: {product.type}</li>
          <li>Inventory: {product.inventory}</li>
        </ul>
        <button onClick={() => addItemToCart(product.id)}>Add to Cart</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
  user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
  addItemToCart: (productId) => dispatch(addToCart(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
