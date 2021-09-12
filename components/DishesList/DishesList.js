import React from 'react';
import ListDish from './../ListDish/ListDish';
import { StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native';
import ContentLoader, {
    FacebookLoader,
    InstagramLoader,
    Bullets
} from "react-native-easy-content-loader";

const DishesList = ({ dishes, loading, addToCartHandler, getDishesHandler}) => {
    return (
        <ContentLoader 
            active 
            loading={loading} 
            primaryColor={"#FFEA6D"} 
            secondaryColor={"#FFF"}
            pRows={100}
            pWidth={["100%"]}
            pHeight={158}
            title={false}
        >
            <FlatList style={styles.dishesList}
                data={dishes}
                renderItem={item => {
                    return <ListDish 
                            id={item.item.id} 
                            name={item.item.name} 
                            img={item.item.img}   
                            price={item.item.price}
                            addToCartHandler={addToCartHandler}
                        />
                }}
                keyExtractor={(item) => item.id}
                extraData={dishes}
                refreshing={loading}
                onRefresh={getDishesHandler}
            />
         </ContentLoader>
    )
};

const styles = StyleSheet.create({
    dishesList: {
        marginHorizontal: 10
    }
});

export default DishesList;
