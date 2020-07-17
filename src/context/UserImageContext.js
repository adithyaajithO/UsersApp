import createContext from './createContext';
import usersServer from '../api/usersServer';
import { navigate } from '../navigationRef';
import * as FileSystem from 'expo-file-system';


const userImageReducer = (state, action) => {
    switch (action.type) {
        case 'getUserImage':
            return action.payload;
        case 'getUserImageError':
            return action.payload;
        case 'clearUserImage':
            return action.payload;
        default:
            return state;
    }
}

const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    console.log('progress', progress);
};

const saveUserImage = (dispatch) => {
    return async (id, imageUri, userName, token) => {
        try {
            let imageData = new FormData();
            let match = /\.(\w+)$/.exec(imageUri);
            let type = match ? `image/${match[1]}` : `image`;
            console.log(type);
            // imageData.append('name', id);
            // imageData.append('userName', userName);
            imageData.append('name', id);
            imageData.append('userName', userName);
            imageData.append('fileData', {
                uri: imageUri,
                name: id,
                type
            });
            console.log(imageData);
            // const options = {
            //     headers: {
            //         Authorization: token,
            //         user_id: id,
            //         'Content-Type': `multipart/form-data`,
            //         Accept: 'application/json'
            //     }
            // }
            const config = {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'user_id': id,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: imageData,
            };
            await fetch("http://d6587a19db1d.ngrok.io" + "/users/image", config);

            // await usersServer.put('/users/image', { imageData }, options);
            navigate('Details');
        }
        catch (e) {
            console.error(e.response.data);
        }
    }
}

const getUserImage = (dispatch) => async (id, token) => {
    try {
        const options = {
            headers: {
                Authorization: token,
                user_id: id,
                responseType: 'blob'
            }
        }
        // response = await usersServer.get('/users/image', options);
        // console.log('RESPONSE:: ', response);
        // res = await usersServer.get(`/static/uploads/${id}.jpg`, options);
        // res = await usersServer.get(`/uploads/${id}.jpg`, options);
        // console.log(res);
        const downloadResumable = FileSystem.createDownloadResumable(
            'http://d6587a19db1d.ngrok.io/users/image',
            FileSystem.documentDirectory + `${id}.jpg`,
            options,
            callback
        );
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Finished downloading to ', uri);
        const filePromise = FileSystem.getInfoAsync(uri);
        console.log('status ', filePromise.then((fileDetails) => {
            fileDetails.size > 1000 ?
            dispatch({ type: 'getUserImage', payload: { id, userImage: uri, userImageError: '' } }) :
            dispatch({ type: 'getUserImageError', payload: { id, userImageError: "Image not fetched", userImage: '' } });
            
        }));
        ;
        // dispatch({ type: 'getUserImage', payload: { id, userImage: uri, userImageError: '' } });
    }
    catch (e) {
        console.log(e);
        dispatch({ type: 'getUserImageError', payload: { id, userImageError: "Image not fetched", userImage: '' } });
    }
}

const clearUserImage = (dispatch) => {
    return () => {
        dispatch({ type: 'clearUserImage', payload: { id: '', userImageError: '', userImage: '' } });
    }
}
export const { Context, Provider } = createContext(userImageReducer,
    { saveUserImage, getUserImage, clearUserImage }, { id: '', userImageError: '', userImage: '' });