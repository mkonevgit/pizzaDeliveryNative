import { useSelector, useDispatch } from "react-redux";
import React, { useState } from 'react';
import { createOrderHandler } from "../../store/ordersReducer";
import { clearCart } from "../../store/cartReducer";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';


const ContactData = ({ setShowModalHandler }) => {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer.cart);

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
      return {id: cartItem.id, count: cartItem.count};
    });
    const order = {
      cart: {...orderCart},
      customer: { ...customer }
    };
    dispatch(createOrderHandler(order));
  };

  const customName = nameInputFocused ? styles.inputTextFocused : styles.inputText;
  const customAddress = addressInputFocused ? styles.inputTextFocused : styles.inputText;
  const customPhone = phoneInputFocused ? styles.inputTextFocused : styles.inputText;

  return <>
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
  </>;

};


const styles = StyleSheet.create({
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
  inputText: {
    backgroundColor: '#F4BE1D',
    fontSize: 15,
    padding: 10
  },
  inputTextFocused: {
    fontSize: 15,
    padding: 10
}

});




export default ContactData;
