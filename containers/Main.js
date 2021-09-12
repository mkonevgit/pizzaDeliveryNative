import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Modal,
  Image,
  Button
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import OrderSummary from "../components/OrderSummary/OrderSummary";


import { getDishesThunkCreator } from "../store/dishesReducer";
import DishesList from './../components/DishesList/DishesList';
import { addToCart, removeFromCart, clearCart, setLoading, setError } from "../store/cartReducer";


export default function Main() {

  const [showModal, setShowModal] = useState(false);

  const setShowModalHandler = (value) => {
    setShowModal(value);
  }

  const setSelectedDishHandler = (id, name, price, img) => {
    setSelectedDish({ id, name, price, img });
  }

  const loading = useSelector(state => state.dishesReducer.loading);
  const dishes = useSelector(state => state.dishesReducer.dishes);
  const cart = useSelector(state => state.cartReducer.cart);
  const totalPrice = useSelector(state => state.cartReducer.totalPrice);

  const dispatch = useDispatch();

  const getDishesHandler = () => dispatch(getDishesThunkCreator());

  const addToCartHandler = (id, name, price, img) => dispatch(addToCart(id, name, price, img));
  const clearCartHandler = (id, name, price, img) => dispatch(clearCart());




  useEffect(() => {
    getDishesHandler();
  }, []);


  return (
    <View style={styles.container}>

      <View style={styles.title}>
        <Text style={styles.titleText}>
          Выберите блюдо
        </Text>
      </View>

      <Modal

        visible={showModal}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalTitle}>
          <Text style={styles.titleText}>
            Ваш заказ
                </Text>
        </View>

        <OrderSummary setShowModalHandler={() => setShowModalHandler(false)}/>

      </Modal>


      <DishesList
        dishes={dishes}
        loading={loading}
        addToCartHandler={addToCartHandler}
        getDishesHandler={getDishesHandler}
      >
      </DishesList>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {"Общая стоимость: " + totalPrice + " тг."}
        </Text>
        <Button
          style={styles.checkoutButton}
          title="Перейти к заказу"
          disabled={totalPrice === 0}
          onPress={() => setShowModalHandler(true)}
        />
        <Button
          style={styles.checkoutButton}
          title="Очистить"
          onPress={clearCartHandler}
        />
      </View>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: 'flex-start',
    backgroundColor: "#D3D3D3"
  },
  title: {
    height: 70,
    backgroundColor: '#F4BE1D',
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3"
  },
  modalTitle: {
    height: 70,
    backgroundColor: '#F4BE1D',
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#D3D3D3"
  },
  titleText: {
    fontSize: 20
  },
  footerText: {
    fontSize: 20,
    textAlign: "center"
  },
  footer: {
    height: 132,
    backgroundColor: '#F4BE1D',
    justifyContent: "space-between",
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3"
  },
  modalFooter: {
    height: 106,
    backgroundColor: '#F4BE1D',
    justifyContent: "space-between",
    padding: 14,
    borderTopWidth: 4,
    borderTopColor: "#D3D3D3"
  },
  checkoutButton: {
    width: "20%"
  }
});

