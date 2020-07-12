import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';


const SignIn = ({ navigation }) => {
    const { state, signin, clearError } = useContext(AuthContext);
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearError();
        });
        return unsubscribe;
    }, []);

    return <View style={styles.containerStyle}>
        <AuthForm title="Sign In"
            userName={userName}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}
            errorMessage={state.errorMessage}
            onSubmit={() => {
                signin({ userName, password })
            }} />
        <Spacer>
            <NavLink link="Signup"
                linkText="Don't have an account ? Sign Up.." />
        </Spacer>
    </View>
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginBottom: 200,
        justifyContent: 'center'
    }
});

export default SignIn;