import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return <View style={styles.pageNumberContainer}>
        <FlatList data={pageNumbers}
            contentContainerStyle={{justifyContent: 'center', flex: 1}}
            keyExtractor={(number) => number.toString()}
            horizontal
            renderItem={({ item }) => {
                return <TouchableOpacity onPress={() => {
                    paginate(item)
                }}>
                    <View style={styles.pageNumber}>
                        <Text style={{color: '#3798E9'}}>{item}</Text>
                    </View>
                </TouchableOpacity>
            }}
        />
    </View>
};

const styles = StyleSheet.create({
    pageNumber: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gainsboro',
        borderRadius: 3,
        backgroundColor: "rgb(244,244,244)",
    },
    pageNumberContainer: {
        margin: 10,
        justifyContent: 'center'
        // borderColor: 'black',
        // borderWidth: 1,
        // 
    }

});

export default Pagination;