import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const OrderSummaryItem = ({ id, name, price, img, count, removeFromCartHandler }) => {
    return (
        <TouchableOpacity style={styles.dish}
            onPress={() => removeFromCartHandler(id)}
        >
            {/* <Image
        style={styles.image}
        source={{ uri: img }}
      /> */}
            <Text style={styles.dishText} ellipsizeMode="tail"
                numberOfLines={3}>{name}</Text>
            <Text style={styles.countText} >{count}</Text>
            <Text style={styles.priceText} >{count*price + " тг."}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dish: {
        marginBottom: 4,
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
    countText: {
        width: 60,
        textAlign: "center",
        justifyContent: "center",
        marginRight: 10,
        fontWeight: "bold"
    },
    image: {
        flex: 1,
        minHeight: 100,
        resizeMode: 'cover'
    }
});

export default OrderSummaryItem;
