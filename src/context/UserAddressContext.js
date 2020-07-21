import createContext from './createContext';
import usersServer from '../api/usersServer';
import { navigate } from '../navigationRef';


const addressReducer = (state, action) => {
    console.log('payload', action.payload);
    switch (action.type) {
        case 'getAddress':
            return action.payload;
        case 'clearAddress':
            return action.payload;
        default:
            return state;
    }
}

const saveAddress = (dispatch) => async (id, token, userName, coordinate) => {
    try {
        const options = {
            headers: {
                user_id: id,
                Authorization: token
            }
        }
        response = await usersServer.put('/users/address',
            {
                coordinate,
                userName
            },
            options);
        console.log(response.data);
        navigate('Details')
    }
    catch (e) {
        console.log({ error: e.response.data });
    }
}

const getAddress = (dispatch) => async (id, token) => {
    try {
        const options = {
            headers: {
                user_id: id,
                Authorization: token
            }
        }
        const response = await usersServer.get('/users/address', options);
        console.log(response.data);
        if (response.data) {
            dispatch({
                type: 'getAddress', payload: {
                    coordinate: {
                        latitude: response.data.latitude,
                        longitude: response.data.longitude
                    }

                }
            });
        }
    }
    catch (e) {
        console.log({ error: e });
    }
}

const clearAddress = (dispatch) => {
    return () => {
        dispatch({
            type: 'clearAddress', payload: 
                null
        });
    }
}

// export const { Context, Provider } = createContext(addressReducer,
//     { saveAddress, getAddress, clearAddress }, {
//     coordinate: {
//         latitude: 0.0,
//         longitude: 0.0
//     }
// });

export const { Context, Provider } = createContext(addressReducer,
    { saveAddress, getAddress, clearAddress },
    null
);