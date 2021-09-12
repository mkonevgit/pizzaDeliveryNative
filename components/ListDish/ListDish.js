import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ListDish = ({ id, name, price, img, addToCartHandler }) => {
  return (
    <TouchableOpacity style={styles.dish}
      onPress={() => addToCartHandler(id, name, price, img)}
    >
      <Image
        style={styles.image}
        source={{ uri: img }}
      />
      <Text style={styles.dishText} ellipsizeMode="tail"
        numberOfLines={3}>{name}</Text>
      <Text style={styles.priceText} >{price + " тг."}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dish: {
    marginBottom: 4,
    marginRight: 4,
    backgroundColor: '#F4BE1D',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  dishText: {
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
    marginRight: 10
  },
  image: {
    flex: 1,
    minHeight: 100,
    resizeMode: 'cover'
  }
});

export default ListDish;
