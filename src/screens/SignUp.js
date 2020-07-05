import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import UserForm from '../components/UserForm';
import { Context as UsersContext } from '../context/UsersContext';


const SignUp = ({ navigation }) => {
    const { addUser } = useContext(UsersContext);
    const [userName, setUser] = useState('');
    const [password, setPassword] = useState('');

    return <View style={styles.parentContainerStyle}>
        <Card title="Sign Up"
            titleStyle={styles.titleStyle}
            containerStyle={styles.containerStyle}
            dividerStyle={styles.dividerStyle}
        >
            <UserForm userName={userName}
                password={password}
                setUser={(userName) => setUser(userName)}
                setPassword={(password) => setPassword(password)}
                buttonLabel="Sign Up"
                onSubmit={() => {
                    if (password.length === 0 || userName.length === 0) {
                        alert('UserID or password cannot be empty');
                    }
                    else {
                        addUser(userName, password, () => {
                            navigation.navigate('Users');
                            setUser('');
                            setPassword('');
                        });
                    }
                }} />
        </Card>
    </View >

}

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
    inputContainerStyle: {
        flexDirection: "row",
        height: 40,
        marginBottom: 3
    },
    titleStyle: {
        color: '#3798E9',
        fontSize: 20
    }
});

export default SignUp;