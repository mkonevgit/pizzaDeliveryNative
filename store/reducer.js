import { itemsAPI } from "./../axios/api";

const SET_ITEMS = "SET_ITEMS";
const SET_LOADING = "SET_LOADING";

export const setItems = (items) => ({ type: SET_ITEMS, items });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });

export const getItemsThunkCreator = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      let response = await itemsAPI.getItems();
      // console.log(response)
      const items = Object.values(response).map(
        item => {
          let imgUrl;
          if (item.data.thumbnail === "self") {
            imgUrl = "https://cdnimg.rg.ru/i/gallery/c492fecf/1_62f6718f.jpg";
          } else {
            imgUrl = item.data.thumbnail;
          }
          return {itemId: item.data.id, itemName: item.data.title, itemImg: imgUrl};
      });
      dispatch(setItems(items));
    } catch (error) {
      console.error(error);      
    } finally {
      dispatch(setLoading(false));
    }
  }
}

const initialState = {
  itemName: "",
  items: [],
  inputFocused: false,
  loading: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, items: action.items};
    case SET_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}