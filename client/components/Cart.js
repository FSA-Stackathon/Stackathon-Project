import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

class Cart extends Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }

  render() {
    const { cart } = this.props;
    const { cart_details } = cart;
    return (
      <div>
        <h1>Shopping Cart</h1>
        <hr></hr>
        {cart_details === undefined
          ? 'Cart Empty'
          : cart_details.map((item) => (
              <div
                style={{
                  padding: '1rem',
                  border: '1px solid black',
                  margin: '1rem',
                }}
                key={item.id}
              >
                <img src={item.product.image_url}></img>
                <li>Product Name: {item.product.name}</li>
                <li>Price: ${item.product.price}</li>
                <li>Quanity: {item.product_quantity}</li>
                <select style={{ width: '50px' }} name='quanity'>
                  <option value={'1'}>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                </select>
              </div>
            ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ cart: state.cart, user: state.auth });
const mapDispatchToProps = (dispatch) => ({
  getCart: (id) => dispatch(fetchCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
