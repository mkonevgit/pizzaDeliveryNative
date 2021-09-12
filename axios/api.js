import axios from "axios";


const dishesInstance = axios.create({
    baseURL: "https://labwork72-b2b8b-default-rtdb.firebaseio.com/"
});

const ordersInstance = axios.create({
    baseURL: "https://labwork72-b2b8b-default-rtdb.firebaseio.com/"
});


export const dishesAPI = {
    getDishes() {
        return dishesInstance.get("dishes.json")
        .then(response => {
                return response.data;
        });
    },
    deleteDish(dishId) {
        return dishesInstance.delete("dishes/"+dishId+".json")
        .then(response => {
                return response.data;
        });
    },
    addDish(name, img, price) {
        return dishesInstance.post("dishes.json", {name, img, price})
        .then(response => {
                return response.data;
        });
    },
    updDish(dishId, name, img, price) {
        return dishesInstance.patch("dishes/"+dishId+".json", {name, img, price})
        .then(response => {
                return response.data;
        });
    }
}


export const ordersAPI = {
    getOrders() {
        return ordersInstance.get("orders.json")
        .then(response => {
                return response.data;
        });
    },
    addOrder(order) {
        return ordersInstance.post("orders.json", order)
        .then(response => {
                return response.data;
        });
    },
}

