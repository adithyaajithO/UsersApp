import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import qs from 'qs';
import { Linking } from 'react-native';

const SendEmail = ({ route }) => {
    const toAddress = route.params.userName
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [cc, setCC] = useState('');
    const [bcc, setBCC] = useState('');
    const options = { cc, bcc };

    const sendEmail = async (to, subject, body, options) => {


        let url = `mailto:${to}`;

        // Create email link query
        const query = qs.stringify({
            subject: subject,
            body: body,
            cc: options.cc,
            bcc: options.bcc
        });

        if (query.length) {
            url += `?${query}`;
        }

        // check if we can use this link
        const canOpen = await Linking.canOpenURL(url);

        if (!canOpen) {
            throw new Error('Provided URL can not be handled');
        }

        return Linking.openURL(url);
    }

    return <>
        <Card title="Send Email"
            titleStyle={styles.titleStyle}
            containerStyle={styles.containerStyle}
            dividerStyle={styles.dividerStyle}
        >
            <View style={styles.inputContainerStyle}>
                <Text style={styles.textStyle}>To address: </Text>
                <Text style={{flex: 1}}>{toAddress}</Text>
            </View>
            <View style={styles.inputContainerStyle}>
                <Text style={styles.textStyle}>Subject: </Text>
                <TextInput
                    value={subject}
                    onChangeText={(value) => {
                        setSubject(value)
                    }}
                    style={styles.inputStyle}
                    
                    autoCapitalize="none"
                    autoCorrect={false} />
            </View>
            <View style={styles.inputContainerStyle}>
                <Text style={styles.textStyle}>CC: </Text>
                <TextInput
                    value={cc}
                    onChangeText={(value) => {
                        setCC(value)
                    }}
                    style={styles.inputStyle}
                    
                    autoCapitalize="none"
                    autoCorrect={false} />
            </View>
            <View style={styles.inputContainerStyle}>
                <Text style={styles.textStyle}>BCC: </Text>
                <TextInput
                    value={bcc}
                    onChangeText={(value) => {
                        setBCC(value)
                    }}
                    style={styles.inputStyle}
                    
                    autoCapitalize="none"
                    autoCorrect={false} />
            </View>
            <View style={styles.bodyContainerStyle}>
                <Text style={styles.textStyle}>Body: </Text>
                <TextInput
                    value={body}
                    multiline
                    onChangeText={(value) => {
                        setBody(value)
                    }}
                    style={styles.inputStyle}
                    
                    autoCapitalize="none"
                    autoCorrect={false} />
            </View>
            <TouchableOpacity style={{ marginVertical: 30 }}
                onPress={() => sendEmail(toAddress, subject, body, options)}>
                <Text style={styles.buttonLabelStyle}>Send Mail</Text>
            </TouchableOpacity>
        </Card>
    </>
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        flexDirection: "row",
        height: 40,
        marginBottom: 3
    },
    bodyContainerStyle: {
        flexDirection: "row",
        height: 150,
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
    buttonLabelStyle: {
        fontSize: 18,
        color: '#3798E9',
        alignSelf: 'center'
    }
});

export default SendEmail;