import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h1>Welcome to the single product page!</h1>
        <h3>Product Details</h3>
        <ul>
          <li>Name: {this.props.product.name}</li>
          <li>Price: ${this.props.product.price}</li>
          <li>Type: {this.props.product.type}</li>
          <li>Inventory: {this.props.product.inventory}</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ product: state.product });

const mapDispatchToProps = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
