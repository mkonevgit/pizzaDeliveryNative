import { ordersAPI } from "../axios/api";

export const SET_ORDERS = "SET_ORDERS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_SHOW_ORDER = 'SET_SHOW_ORDER';
export const INIT_ORDERS = 'INIT_ORDERS';


export const initOrders = () => ({ type: INIT_ORDERS});
export const setOrders = (orders) => ({ type: SET_ORDERS, orders });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setError = (error) => ({ type: SET_ERROR, error });
export const setShowOrder = (showOrder) => ({type: SET_SHOW_ORDER, showOrder});


export const createOrderHandler = (order) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await ordersAPI.addOrder(order);
            dispatch(initOrders());
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setLoading(false));
        }
    };
};


const initialState = {
    orders: [],
    loading: false,
    error: null,
    showOrder: false
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
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
        case SET_SHOW_ORDER:
            return {
                ...state,
                showOrder: action.showOrder
            };
        case INIT_ORDERS:
            return {
                ...initialState
            };
        default:
            return state;
    }



};

export default ordersReducer;