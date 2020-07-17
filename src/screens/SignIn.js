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

    const validateUserName = value => {
        var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    };

    const validatePassword = value => {
        // var re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$/;
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return re.test(value);
    };

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
                if (!validateUserName(userName) || !validatePassword(password)) {
                    var status = !validateUserName(userName) && !validatePassword(password) ?
                        'Invalid User Name and Password' :
                        !validateUserName(userName) ?
                        'Invalid User Name' : 'Invalid Password';
                    alert(status);
                }
                else {
                    signin({ userName, password })
                }
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
        paddingTop: 15,
        marginBottom: 200,
        justifyContent: 'center'
    }
});

export default SignIn;