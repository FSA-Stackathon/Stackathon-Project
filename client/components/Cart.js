import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, removeItem, updateCart } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
    };
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  componentDidMount() {
    // Ryan added changes below...
    // console.log('THIS IS USER/AUTH:', this.props.user.id);
    // passing in this.props.user.id for determination if guest or logged in user
    this.props.getCart(this.props.user.id);
  }

  changeQuantity(evt) {
    this.setState({ productId: evt.target.id });
    this.props.updateCart(evt.target.value, evt.target.id, this.props.user.id);
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
          : cart_details.length === 0
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
                  onClick={() => removeItemFromCart(item.product.id, user.id)}
                >
                  ❌
                </button>
                <img src={item.product.image_url}></img>
                <li>Product Name: {item.product.name}</li>
                <li>Price: ${item.product.price}</li>
                <li>Quanity: {item.product_quantity}</li>
                <select
                  style={{ width: '50px' }}
                  name="quanity"
                  id={item.product.id}
                  onChange={this.changeQuantity}
                >
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

const mapStateToProps = (state) => ({ 
  // expanded to better see states being tracked...
  cart: state.cart, 
  user: state.auth 
});


const mapDispatchToProps = (dispatch) => ({
  // modified getCart, removeItemFromCart - passing in this.props.user.id for determination if guest or logged in user 
  getCart: (userId) => dispatch(fetchCart(userId)),
  removeItemFromCart: (productId, userId) => dispatch(removeItem(productId, userId)),
  updateCart: (productId, productQuantity, userId) =>
    dispatch(updateCart(productId, productQuantity, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
