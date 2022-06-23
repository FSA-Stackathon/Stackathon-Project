import axios from 'axios';

// Action Types
export const GET_SINGLE_ALBUM = 'GET_SINGLE_ALBUM';

// Action Creators
export const setAlbum = (album) => {
  return {
    type: GET_SINGLE_ALBUM,
    album,
  };
};

// Thunk Creators
//GET SINGLE PRODUCT (LIST)
export const fetchAlbum = (albumId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${albumId}`);
    return dispatch(setAlbum(data));
  } catch (err) {
    console.error(err);
  }
};

/*
 *Reducer
 **/
export default function (state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_ALBUM:
      return action.album;
    default:
      return state;
  }
}
