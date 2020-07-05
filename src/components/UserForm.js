import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';


const UserForm = ({ userName, password, setUser, setPassword, buttonLabel, onSubmit }) => {

    return <>
        <View style={styles.inputContainerStyle}>
            <Text style={styles.textStyle}>User ID: </Text>
            <TextInput
                value={userName}
                onChangeText={(value) => {
                    setUser(value)
                }}
                style={styles.inputStyle}
                autoCapitalize="none"
                autoCorrect={false} />
        </View>
        <View style={styles.inputContainerStyle}>
            <Text style={styles.textStyle}>Password: </Text>
            <TextInput
                value={password}
                onChangeText={(value) => {
                    setPassword(value)
                }}
                style={styles.inputStyle}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false} />
        </View>
        <TouchableOpacity style={{ marginVertical: 30 }}
            onPress={() => onSubmit()}>
            <Text style={styles.buttonLabelStyle}>{buttonLabel}</Text>
        </TouchableOpacity>
    </>
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        flexDirection: "row",
        height: 40,
        marginBottom: 3
    },
    inputStyle: {
        flex: 1,
        backgroundColor: "rgb(244,244,244)",
        borderRadius: 4,
        paddingHorizontal: 7
    },
    textStyle: {
        alignSelf: 'center',
        width: 75,
        fontSize: 15
    },
    buttonLabelStyle: {
        fontSize: 18,
        color: '#3798E9',
        alignSelf: 'center'
    }
});

export default UserForm;