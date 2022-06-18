import axios from 'axios';

// Action Types
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
export const ADD_TO_CART = 'ADD_TO_CART';

// Action Creators
export const setProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

export const setCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};

// Thunk Creators
//GET SINGLE PRODUCT (LIST)
export const fetchProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return dispatch(setProduct(data));
  } catch (err) {
    console.error(err);
  }
};

//POST INTO CART
export const addToCart = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/carts/${productId}`);

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
    case GET_SINGLE_PRODUCT:
      return action.product;
    case ADD_TO_CART:
      return { ...state, ...action.cart };
    default:
      return state;
  }
}
