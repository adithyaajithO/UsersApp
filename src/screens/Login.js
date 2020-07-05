import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import UserForm from '../components/UserForm';


const Login = ({ navigation }) => {
    const [userName, setUser] = useState('');
    const [password, setPassword] = useState('');

    return <View style={styles.parentContainerStyle}>
        <Card title="Login"
            titleStyle={styles.titleStyle}
            containerStyle={styles.containerStyle}
            dividerStyle={styles.dividerStyle}>
            <UserForm userName={userName}
                password={password}
                setUser={(userName) => setUser(userName)}
                setPassword={(password) => setPassword(password)}
                buttonLabel="Sign In"
                onSubmit={() => alert('Functionality to be added..')} />
            <View style={styles.signUpContainerStyle}>
                <Text style={{ color: "rgb(224,224,224)" }}>
                    Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ color: '#3798E9' }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Card>
    </View >
}

Login.navigationOptions = () => {
    return {
        headerRight: () => (<Feather name="plus" size={30} />),
        title: 'Users- Login / SignUp'
    };
};

const styles = StyleSheet.create({
    parentContainerStyle: {
        flex: 1,
        marginTop: 50
    },
    containerStyle: {
        padding: 20,
        height: 350
    },
    dividerStyle: {
        marginBottom: 50
    },
    titleStyle: {
        color: '#3798E9',
        fontSize: 20
    },
    signUpContainerStyle: {
        // flexDirection: 'row',
        marginTop: 15,
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    }
});

export default Login;