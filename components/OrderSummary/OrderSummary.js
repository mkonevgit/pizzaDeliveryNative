import { useSelector, useDispatch } from "react-redux";
import OrderSummaryItem from "./OrderSummaryItem/OrderSummaryItem";
import React, { useState } from 'react';
import { createOrderHandler } from "../../store/ordersReducer";
import { clearCart } from "../../store/cartReducer";
import { View, Text, StyleSheet, TextInput, Button, ScrollView  } from 'react-native';


import { removeFromCart } from "../../store/cartReducer";

export const DELIVERY = 300;

const OrderSummary = ({ setShowModalHandler }) => {


    const dispatch = useDispatch();

    const cart = useSelector(state => state.cartReducer.cart);
    const totalPrice = useSelector(state => state.cartReducer.totalPrice);
    const removeFromCartHandler = (id) => dispatch(removeFromCart(id));


    const [customer, setCustomer] = useState({
        name: '',
        address: '',
        phone: ''
    });

    const [nameInputFocused, setNameInputFocused] = useState(false);
    const [addressInputFocused, setAddressInputFocused] = useState(false);
    const [phoneInputFocused, setPhoneInputFocused] = useState(false);

    const customerDataChanged = (keyName, keyValue) => {
        const name = keyName;
        const value = keyValue;
        setCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const clearCartHandler = () => dispatch(clearCart());

    const orderHandler = () => {
        const orderCart = cart.map((cartItem) => {
            return { id: cartItem.id, count: cartItem.count };
        });
        const order = {
            cart: { ...orderCart },
            customer: { ...customer }
        };
        dispatch(createOrderHandler(order));
    };

    const customName = nameInputFocused ? styles.inputTextFocused : styles.inputText;
    const customAddress = addressInputFocused ? styles.inputTextFocused : styles.inputText;
    const customPhone = phoneInputFocused ? styles.inputTextFocused : styles.inputText;

    let orderSummaryList;

    orderSummaryList = cart.map(cartItem => {
        return <OrderSummaryItem
            key={cartItem.id}
            id={cartItem.id}
            name={cartItem.name}
            price={cartItem.price}
            img={cartItem.img}
            count={cartItem.count}
            removeFromCartHandler={removeFromCartHandler}
        />;
    });

    let total;
    if (totalPrice === 0) {
        total = 0;
    } else {
        total = Number(totalPrice) + Number(DELIVERY);
    }

    return (
        <View style={styles.modal}>

            <View>
                <View>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Ведите ваши контактные данные</Text>
                    </View>
                    <TextInput
                        style={customName}
                        name="name"
                        placeholder="ФИО"
                        value={customer.name}
                        onChangeText={(value) => customerDataChanged("name", value)}
                        onFocus={() => setNameInputFocused(true)}
                        onBlur={() => setNameInputFocused(false)}
                    />
                    <TextInput
                        style={customAddress}
                        name="address"
                        placeholder="Адрес"
                        value={customer.address}
                        onChangeText={(value) => customerDataChanged("address", value)}
                        onFocus={() => setAddressInputFocused(true)}
                        onBlur={() => setAddressInputFocused(false)}
                    />
                    <TextInput
                        style={customPhone}
                        name="phone"
                        placeholder="Телефон"
                        value={customer.phone}
                        onChangeText={(value) => customerDataChanged("phone", value)}
                        onFocus={() => setPhoneInputFocused(true)}
                        onBlur={() => setPhoneInputFocused(false)}
                    />
                </View>
            </View>

            <View style={styles.title}>
                <Text style={styles.titleText}>Наименование</Text>
                <Text style={styles.priceText} >Кол.</Text>
                <Text style={styles.priceText} >Цена</Text>
            </View>
            <ScrollView>
                {orderSummaryList}
            </ScrollView>

            <View style={styles.title}>
                <Text style={styles.titleText}>Доставка</Text>
                <Text style={styles.priceText} ></Text>
                <Text style={styles.footerText} >{DELIVERY + " тг."}</Text>
            </View>
            <View style={styles.total}>
                <Text style={styles.totalText}>{"Итого к оплате: " + total + " тг."}</Text>
            </View>
            <View style={styles.modalFooter}>
                <Button
                    disabled={totalPrice === 0}
                    title="Разместить заказ"
                    onPress={() => { orderHandler(); clearCartHandler(); setShowModalHandler(false); }}
                />
                <Button
                    title="Отменить"
                    onPress={() => { clearCartHandler(); setShowModalHandler(false); }}
                />
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: 'flex-start',
        backgroundColor: "#D3D3D3"
    },
    total: {
        height: 70,
        backgroundColor: '#F4BE1D',
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#D3D3D3",
        fontSize: 20
    },
    totalText: {
        fontSize: 20
    },
    footer: {
        height: 132,
        backgroundColor: '#F4BE1D',
        justifyContent: "space-between",
        padding: 14,
        borderTopWidth: 1,
        borderTopColor: "#D3D3D3"
    },
    title: {
        marginBottom: 4,
        backgroundColor: '#F4BE1D',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    titleText: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
        flex: 1,
        flexWrap: "wrap"
    },
    priceText: {
        width: 60,
        textAlign: "center",
        justifyContent: "center",
        marginRight: 10,
        fontWeight: "bold"
    },
    footerText: {
        width: 60,
        textAlign: "center",
        justifyContent: "center",
        marginRight: 10
    },

      inputText: {
        backgroundColor: '#F4BE1D',
        fontSize: 15,
        padding: 10
      },
      inputTextFocused: {
        fontSize: 15,
        padding: 10
    },
    modalFooter: {
        height: 106,
        backgroundColor: '#F4BE1D',
        justifyContent: "space-between",
        padding: 14,
        borderTopWidth: 4,
        borderTopColor: "#D3D3D3"
      }
});


export default OrderSummary;