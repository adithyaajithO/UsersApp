import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';


const AuthForm = ({ title, userName, setUserName,
    password, setPassword, errorMessage, onSubmit }) => {

    return <>
        <Spacer>
            <Text h3>{title}</Text>
        </Spacer>
        <Input
            label="User Name"
            value={userName}
            onChangeText={setUserName}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <Spacer />
        <Input label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
        />
        {
            errorMessage.length > 0 ?
                <Spacer>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </Spacer> :
                null
        }
        <Spacer>
            <Button title={title}
                onPress={() => {
                    onSubmit()}} />
        </Spacer>
    </>
};

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        fontSize: 16
    }
});

export default AuthForm;