import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { AuthContext } from '../context/AuthContext';
// import { Context as UsersContext } from '../context/UsersContext';
import Spacer from '../components/Spacer';


const SignUp = ({ navigation }) => {
    const { state, signup, clearError } = useContext(AuthContext);
    // const { addUser } = useContext(AuthContext);
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearError();
        });
        return unsubscribe;
    }, []);

    return <View style={styles.containerStyle}>
        <AuthForm title="Sign Up"
            userName={userName}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}
            errorMessage={state.errorMessage}
            onSubmit={() => {
                signup({ userName, password });
            }} />
        <Spacer>
            <NavLink link="SignIn"
                linkText="Already have an account ? Sign In.." />
        </Spacer>

    </View>
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingTop:15,
        marginBottom: 200,
        justifyContent: 'center'
    }
});

export default SignUp;