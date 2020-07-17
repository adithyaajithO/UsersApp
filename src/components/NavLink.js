import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const NavLink = ({ linkText, link, params }) => {
    const navigation = useNavigation();
    return <TouchableOpacity onPress={() => {
        navigation.navigate(link, params);
    }} >
        <Text style={styles.link}>{linkText}</Text>
    </TouchableOpacity>
};

NavLink.defaultProps = {
    params: null
};

const styles = StyleSheet.create({
    link: {
        color: '#3798E9'
    }
});

export default NavLink;