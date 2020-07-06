import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import UserForm from '../components/UserForm';
import { Context as UsersContext } from '../context/UsersContext';


const Login = ({ navigation }) => {
    const { getUsers, state } = useContext(UsersContext);
    const [userName, setUser] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        getUsers();
        const unsubscribe = navigation.addListener('focus', () => {
            getUsers();
        });

        return unsubscribe
    }, []);

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
                onSubmit={() => {
                    state.find((user) => {
                        return user.userName === userName && user.password === password
                    }) ? navigation.navigate("Users") : alert('User not found!');
                }} />
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