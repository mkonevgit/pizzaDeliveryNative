import React from "react";
import { StyleSheet, View, Image } from 'react-native';

const Preloader = () => {
    return (
    <View style={styles.preloader}>
        <Image
            style={styles.stretch}
            source={require('../../images/spinner.gif')}
        />
    </View>
    )
};

export default Preloader;

const styles = StyleSheet.create({
    preloader: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    stretch: {
        width: "100%",
        height: "100%",
        resizeMode: 'center',
    }
});
