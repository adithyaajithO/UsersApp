import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Context as UserContext } from '../context/UsersContext';
import { Context as UserImageContext } from '../context/UserImageContext';
import { AuthContext } from '../context/AuthContext';
import { Card } from 'react-native-elements';
import UserForm from '../components/UserForm';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';
import { Spinner } from '../components/Spinner';


const UserDetails = ({ route, navigation }) => {
    const id = route.params.id;
    const { state, editUser } = useContext(UserContext);
    const imageData = useContext(UserImageContext);
    const loading = imageData.state.isLoading;
    const user = state.find((user) => {
        return user._id === id
    });
    const auth = useContext(AuthContext);
    const [userName, setUser] = useState(user.userName);
    const [password, setPassword] = useState('');
    const [pictureSaved, setPicture] = useState(null);

    useEffect(() => {
        // imageData.clearUserImage();
        // imageData.getUserImage(id, auth.state.token);

        const unsubscribe = navigation.addListener('focus', () => {
            imageData.clearUserImage();
            imageData.getUserImage(id, auth.state.token);
        });

        return unsubscribe
    }, []);

    return <ScrollView style={styles.parentContainerStyle}>
        {imageData.state.isLoading ?
            <Spinner /> :
            <Card title="Update Details"
                titleStyle={styles.titleStyle}
                containerStyle={styles.containerStyle}
                dividerStyle={styles.dividerStyle}
            >
                {imageData.state.userImage.length > 0 ?
                    <View style={styles.imageContainer}>
                        <Image style={{ flex: 1 }} source={{ uri: imageData.state.userImage }} />
                    </View> :
                    null}
                <UserForm userName={userName}
                    password={password}
                    setUser={(userName) => setUser(userName)}
                    setPassword={(password) => setPassword(password)}
                    buttonLabel="Update Details"
                    pictureSaved={pictureSaved}
                    setPicture={setPicture}
                    onSubmit={() => {
                        editUser(id, userName, password, auth.state.token);
                    }} />
                <TouchableOpacity onPress={() => navigation.navigate('Send', { userName })}>
                    <Text style={{ color: '#3798E9' }}>Send email to this user</Text>
                </TouchableOpacity>
                <Spacer />
                <NavLink link="Camera" params={{ user: [id, userName] }} linkText="Camera" />
                <Spacer />
                <NavLink link="Maps" params={{ user: [id, userName] }} linkText="Add address" />
            </Card>}
    </ScrollView >
};

const styles = StyleSheet.create({
    parentContainerStyle: {
        flex: 1
    },
    containerStyle: {
        marginTop: 50,
        padding: 20,
        flex: 1
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
    },
    imageContainer: {
        height: 200,
        flex: 1,
        alignContent: "flex-start",
        justifyContent: 'flex-start',
        marginBottom: 15
    }
});

export default UserDetails;