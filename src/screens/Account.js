import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthContext';


const Account = () => {
    const { signout } = useContext(AuthContext);

    return <SafeAreaView>
        <View>
            <Spacer>
                <Text h3>Account Screen</Text>
                <Spacer />
                <Button title="Sign Out" onPress={() => {
                    signout();
                }} />
            </Spacer>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({

});

export default Account;