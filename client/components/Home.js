import React from 'react';
import { connect } from 'react-redux';
import { getHistory } from '../store/userProfile';

/**
 * COMPONENT
 */

class Home extends React.Component {
  componentDidMount() {
    this.props.getOrderHistory();
  }

  render() {
    const { orderHistory, user } = this.props;

    return (
      <div>
        <h1>
          {user.first_name} {user.last_name}'s Profile
        </h1>
        <h3>Order History:</h3>
        {orderHistory.map((order) => {
          return (
            <div key={order.id}>
              <p>Product Name: {order.cart_details[0].product.name}</p>
              <p>Product Type: {order.cart_details[0].product.type}</p>
              <p>Product Price: {order.cart_details[0].product.price}</p>
              <p>Amount Purchased: {order.cart_details[0].product_quantity}</p>
              <img
                src={order.cart_details[0].product.image_url}
                alt="product image"
              />

              {/* this is how you get access to product inside the map: order.cart_details[0].product */}
            </div>
          );
        })}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.auth,
    orderHistory: state.userProfile,
  };
};

const mapDispatch = (dispatch) => ({
  getOrderHistory: () => dispatch(getHistory()),
});

export default connect(mapState, mapDispatch)(Home);
