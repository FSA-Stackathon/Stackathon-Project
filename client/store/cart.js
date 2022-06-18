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
//GET SINGLE CART
export const fetchCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/carts/getCart');
    dispatch(setCart(data));
  } catch (err) {
    console.error(err);
  }
};

//DELETE SINGLE CART (ALL QUANTITY)
export const removeItem = (productId) => {
  return async (dispatch) => {
    try {
      const data = await axios.delete(`/api/carts/${productId}`);
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
      const actionProduct = action.cart.data.find((product) => product);
      const cart_details = state.cart_details.filter(
        (product) => product.id !== actionProduct.id
      );
      return { ...state, cart_details };
    default:
      return state;
  }
}
