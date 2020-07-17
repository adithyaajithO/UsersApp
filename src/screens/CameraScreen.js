import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Context as UserImageContext } from '../context/UserImageContext';
import { AuthContext } from '../context/AuthContext';


const CameraScreen = ({ route }) => {
    const params = route.params.user;
    const id = params[0];
    const userName = params[1];
    const { saveUserImage } = useContext(UserImageContext);
    const { state } = useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [imageUri, setImageUri] = useState('');
    
    let camera=null;

    const imageSizes = () => {
        const size = camera.getAvailablePictureSizesAsync('4:3');
        return size;
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            // console.log(imageSizes());
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const onPictureSaved = (photo) => {
        console.log(photo.base64.length);
        setImageUri(photo.uri);
    }

    return (
        <View style={{ flex: 1 }}>
            {imageUri.length>0 ?
                <View style={{ flex: 1 }}>
                    <Image style={{ flex: 1 }} source={{ uri: `${imageUri}` }} />
                    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                        <TouchableOpacity onPress={() => {
                            saveUserImage(id, imageUri, userName, state.token);
                        }}>
                            <Text style={{ fontSize: 20 }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setImageUri('');
                        }}>
                            <Text style={{ fontSize: 20 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View> :
                <Camera style={{ flex: 1 }} type={type} ref={(ref) => {
                    camera = ref
                }}
                pictureSize="_72"
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                camera.takePictureAsync({ onPictureSaved: onPictureSaved, base64: true, quality: 0.5 });
                            }}
                        >
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Capture</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>}
        </View>
    );
}

export default CameraScreen;