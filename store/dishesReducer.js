import { dishesAPI } from "../axios/api";

export const SET_DISHES = "SET_DISHES";
export const DELETE_DISH = "DELETE_DISH";
export const ADD_DISH = "ADD_DISH";
export const UPD_DISH = "ADD_DISH";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export const setDishes = (dishes) => ({ type: SET_DISHES, dishes });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setError = (error) => ({ type: SET_ERROR, error });
export const addDish = (id, name, img, price) => ({ type: ADD_DISH, id, name, img, price });
export const updDish = (id, name, img, price) => ({ type: UPD_DISH, id, name, img, price });
export const deleteDish = (dishId) => ({ type: DELETE_DISH, dishId });

export const getDishesThunkCreator = () => {
    return async dispatch => {
        dispatch(setLoading(true));
        let response;
        try {
            response = await dishesAPI.getDishes();
            const keys = Object.keys(response);
            let dishes = [];
            keys.forEach((key) => {
                dishes.push({ id: key, name: response[key].name, img: response[key].img, price: response[key].price })
            });
            dispatch(setDishes(dishes));
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const addDishThunkCreator = (dish, history) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            let response = await dishesAPI.addDish(dish.name, dish.img, dish.price);
            dispatch(addDish(response.name, dish.name, dish.img, dish.price));
            history.push("/");
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const deleteDishThunkCreator = (dishId) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            let response = await dishesAPI.deleteDish(dishId);
            // console.log(response)
            dispatch(deleteDish(dishId));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
}


export const updDishThunkCreator = (dish, history) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            let response = await dishesAPI.updDish(dish.id, dish.name, dish.img, dish.price);
            // console.log(response)
            dispatch(updDish(dish.id, dish.name, dish.img, dish.price));
            history.push("/");
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
}


const initialState = {
    dishes: [],
    loading: false,
    error: null
};

const dishesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DISHES:
            return {
                ...state,
                dishes: action.dishes
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
        case ADD_DISH:
            {
                const stateCopy = {
                    ...state,
                    dishes: [...state.dishes, { id: action.id, img: action.img, name: action.name, price: action.price }]
                };
                return stateCopy;
            }
        case UPD_DISH:
            {
                const index = state.dishes.findIndex(t => t.id === action.id);
                const dishesCopy = [...state.dishes];
                dishesCopy[index].name = action.name;
                dishesCopy[index].img = action.img;
                dishesCopy[index].price = action.price;
                const stateCopy = {
                    ...state,
                    dishes: dishesCopy
                };
                return stateCopy;
            }
        case DELETE_DISH:
            {
                const index = state.dishes.findIndex(t => t.id === action.dishId);
                const dishesCopy = [...state.dishes];
                dishesCopy.splice(index, 1);
                const stateCopy = {
                    ...state,
                    dishes: dishesCopy
                };
                return stateCopy;
            }
        default:
            return state;
    };
};

export default dishesReducer;