import axios from 'axios';

// Action Types
const GET_ALBUMS = 'GET_ALBUMS';

// Action Creators
const setAlbums = (albums) => {
  return {
    type: GET_ALBUMS,
    albums,
  };
};

// Thunk Creators
export const fetchAlbums = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/albums');
      dispatch(setAlbums(data));
    } catch (err) {
      console.error(err);
    }
  };
};

/*
 *Reducer
 **/
export default function (state = [], action) {
  switch (action.type) {
    case GET_ALBUMS:
      return action.albums;
    default:
      return state;
  }
}
