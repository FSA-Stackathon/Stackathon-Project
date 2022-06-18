import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, removeItem } from '../store/cart';

class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const { cart, removeItemFromCart, user } = this.props;
    const { cart_details } = cart;
    return (
      <div>
        <h1>Shopping Cart</h1>
        <Link to="/checkout">
          <button>Proceed to Checkout</button>
        </Link>
        <hr></hr>
        {cart_details === undefined
          ? 'Cart Empty'
          : cart_details.map((item) => (
              <div
                style={{
                  padding: '1rem',
                  border: '1px solid black',
                  margin: '1rem',
                  width: '250px',
                }}
                key={item.id}
              >
                <button
                  style={{
                    position: 'absolute',
                    right: 0,
                    zIndex: 1,
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                  onClick={() => removeItemFromCart(item.product.id)}
                >
                  ❌
                </button>
                <img src={item.product.image_url}></img>
                <li>Product Name: {item.product.name}</li>
                <li>Price: ${item.product.price}</li>
                <li>Quanity: {item.product_quantity}</li>
                <select style={{ width: '50px' }} name="quanity">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ cart: state.cart, user: state.auth });
const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(fetchCart()),
  removeItemFromCart: (productId) => dispatch(removeItem(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
