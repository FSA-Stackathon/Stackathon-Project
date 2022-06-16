import axios from 'axios';

const TOKEN = 'token';

// Action Types
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

// Action Creators
export const setProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

// Thunk Creators
export const fetchProduct = (id) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.get(`/api/products/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return dispatch(setProduct(data));
    }
  } catch (err) {
    console.error(err);
  }
};
/*
 *Reducer
 **/
export default function (state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
