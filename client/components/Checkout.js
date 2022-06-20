import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, checkoutCart } from '../store/cart';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      zipCode: '',
      city: '',
      state: '',
      phoneNumber: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { firstName, lastName, address, zipCode, user } = this.state;
    const { city, state, phoneNumber } = this.state;
    const { cart, checkout } = this.props;
    const { cart_details } = cart;
    const cartTotal =
      cart_details === undefined
        ? 0
        : cart_details.reduce((acc, item) => {
            const total = Math.round(parseFloat(item.product_quantity) * parseFloat(item.product.price));
            acc += total
            return acc;
          }, 0);
    return (
      <div>
        <h1>Secure Checkout</h1>
        <hr></hr>
        <h3>Sign in to use your saved info and save time!</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div style={{ border: '1px solid black' }}>
            <h3 style={{ marginLeft: '10px' }}>Contact Information</h3>
            <form>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    style={{ width: '250px' }}
                    name='firstName'
                    value={firstName}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    style={{ width: '250px' }}
                    name='lastName'
                    value={lastName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor='address'>Address</label>
                <input
                  style={{ width: '250px' }}
                  name='address'
                  value={address}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor='zipCode'>ZIP Code</label>
                <input
                  style={{ width: '250px' }}
                  name='zipCode'
                  value={zipCode}
                  onChange={this.handleChange}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  <label htmlFor='city'>City</label>
                  <input
                    style={{ width: '250px' }}
                    name='city'
                    value={city}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor='state'>State</label>
                  <input
                    style={{ width: '250px' }}
                    name='state'
                    value={state}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </form>
            <Link to='/confirmation'>
              <button
                style={{
                  width: '500px',
                  marginLeft: '50px',
                  border: '2px solid black',
                }}
                onClick={() => checkout(cartTotal)}
              >
                Submit Purchase Order
              </button>
            </Link>
          </div>
          <div style={{ marginLeft: '700px', border: '1px solid black' }}>
            <h3 style={{ marginLeft: '10px' }}>Order Total: ${cartTotal}</h3>
            <h3 style={{ textAlign: 'center' }}>Your Order</h3>
            {cart_details === undefined
              ? 'Cart Empty'
              : cart_details.map((item) => (
                  <div
                    style={{
                      padding: '1rem',
                      margin: '1rem',
                    }}
                    key={item.id}
                  >
                    <img
                      style={{ height: '100px', width: '100px' }}
                      src={item.product.image_url}
                    ></img>
                    <li>{item.product.name}</li>
                    <li>
                      Qty: {item.product_quantity} @ ${item.product.price}
                    </li>
                    <hr></hr>
                  </div>
                ))}
            <Link to='/cart'>
              <button
                style={{
                  width: '500px',
                  padding: '1rem',
                  border: '2px solid black',
                }}
              >
                Back to cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({ 
  cart: state.cart,
  user: state.auth, 
});

const mapDispatch = (dispatch) => ({
  getCart: (userId) => dispatch(fetchCart(userId)),
  checkout: (orderTotal) => dispatch(checkoutCart(orderTotal)),
});

export default connect(mapState, mapDispatch)(Checkout);
