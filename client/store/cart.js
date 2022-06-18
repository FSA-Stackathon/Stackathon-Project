import axios from 'axios';

// Action Types
const GET_CART = 'GET_CART';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

// Action Creators
const setCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const _removeItem = (cart) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    cart,
  };
};

// Thunk Creators
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/getcart`);

      dispatch(setCart(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const removeItem = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      dispatch(_removeItem(data));
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
    case REMOVE_ITEM_FROM_CART:
      const actionProduct = action.cart.find((product) => product);
      const cart_details = state.cart_details.filter(
        (product) => product.id !== actionProduct.id
      );
      return { ...state, cart_details };
    default:
      return state;
  }
}
