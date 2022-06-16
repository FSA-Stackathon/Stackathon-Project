import axios from 'axios';

// Action Types
export const GET_CART = 'GET_CART';

// Action Creators
export const setCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

// Thunk Creators
export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/getcart/${id}`);
      dispatch(setCart(data));
    } catch (err) {
      console.error(err);
    }
  };
};

/*
 *Reducer
 **/
export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
