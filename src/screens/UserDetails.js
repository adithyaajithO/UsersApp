import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from '../context/UsersContext';
import { Card } from 'react-native-elements';
import UserForm from '../components/UserForm';


const UserDetails = ({ route, navigation }) => {
    const id = route.params.id;
    const { state, editUser } = useContext(UserContext);
    const user = state.find((user) => {
        return user.id === id
    });
    const [userName, setUser] = useState(user.userName);
    const [password, setPassword] = useState(user.password);

    return <View style={styles.parentContainerStyle}>
        <Card title="Update Details"
            titleStyle={styles.titleStyle}
            containerStyle={styles.containerStyle}
            dividerStyle={styles.dividerStyle}
        >
            <UserForm userName={userName}
                password={password}
                setUser={(userName) => setUser(userName)}
                setPassword={(password) => setPassword(password)}
                buttonLabel="Update Details"
                onSubmit={() => {
                    editUser(id, userName, password, () => {
                        navigation.navigate('Users');
                    });
                }} />
            <TouchableOpacity onPress={() => navigation.navigate('Send', { userName })}>
                <Text>Send Email</Text>
            </TouchableOpacity>
        </Card>
    </View >
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
    titleStyle: {
        color: '#3798E9',
        fontSize: 20
    },
    updateStyle: {
        fontSize: 18,
        color: '#3798E9',
        alignSelf: 'center'
    }
});

export default UserDetails;