

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";


export const addToCart = (id, name, price, img) => ({ type: ADD_TO_CART, id, name, price, img });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, id });
export const clearCart = () => ({ type: CLEAR_CART });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setError = (error) => ({ type: SET_ERROR, error});

const initialState = {
    cart: [],
    error: null,
    loading: false,
    totalPrice: 0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {
                const index = state.cart.findIndex(t => t.id === action.id);
                if (index === -1) {
                    return {
                        ...state,
                        cart: [...state.cart, { id: action.id, name: action.name, price: action.price, img: action.img, count: 1 }],
                        totalPrice: (state.totalPrice + action.price)
                    };
                } else {
                    const cartCopy = [...state.cart];
                    cartCopy[index].count++;
                    const stateCopy = {
                        ...state,
                        cart: cartCopy,
                        totalPrice: (state.totalPrice + action.price)
                    };
                    return stateCopy;
                }
            }
        case REMOVE_FROM_CART:
            {
                const index = state.cart.findIndex(t => t.id === action.id);
                if (state.cart[index].count === 1) {
                    const cartCopy = [...state.cart];
                    const price = cartCopy[index].price;
                    cartCopy.splice(index, 1);
                    const stateCopy = {
                        ...state,
                        cart: cartCopy,
                        totalPrice: (state.totalPrice - price)
                    };
                    return stateCopy;
                }
                else {
                    const cartCopy = [...state.cart];
                    const price = cartCopy[index].price;
                    cartCopy[index].count--;
                    const stateCopy = {
                        ...state,
                        cart: cartCopy,
                        totalPrice: (state.totalPrice - price)
                    };
                    return stateCopy;

                }
            }
        case CLEAR_CART:
            return {
                ...initialState
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }



};

export default cartReducer;