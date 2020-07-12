import createContext from './createContext';
import usersServer from '../api/usersServer';
import { navigate } from '../navigationRef';


const userReducer = (state, action) => {
    switch (action.type) {
        case 'getUsers':
            return action.payload;
        case 'deleteUser':
            // payload will have the 'id' to be deleted
            return state.filter((user) => {
                return user._id !== action.payload
            });
        case 'editUser':
            // payload will have the 'id' to be deleted
            return state.map((user) => {
                return user.id === action.payload.id
                    ? action.payload : user;
            });
        default:
            return state;
    }
}

export const getUsers = (dispatch) => {
    return async (token) => {
        try {
            const options = {
                headers: {
                     Authorization: token
                }
            }
            const response = await usersServer.get('/users', options);
            dispatch({ type: "getUsers", payload: response.data });
        }
        catch (e) {
            console.log('Something went wrong');
            console.log(e.response.data);
        }
    }
}

export const addUser = (dispatch) => {
    return async (userName, password) => {
        try {
            await usersServer.post('/users', { userName, password });
        }
        catch (e) {
            console.log('Something went wrong');
        }
    }
}

export const deleteUser = (dispatch) => {
    return async (id, token) => {
        try { 
            const options = {
                headers: {
                     Authorization: token,
                     user_id: id
                }
            }
            await usersServer.delete('/users', options);

            dispatch({ type: "deleteUser", payload: id });
        }
        catch (e) {
            console.log('Something went wrong');
        }
    }
}

export const editUser = (dispatch) => {
    return async (id, userName, password, token) => {
        try {
            const options = {
                headers: {
                     Authorization: token,
                     user_id: id
                }
            }
            await usersServer.put('/users', { userName, password }, options);

            // dispatch({ type: "editUser", payload: { id, userName, password } });
            navigate('Users');
        }
        catch (e) {
            console.log('Something went wrong');
        }
    }
}


export const { Context, Provider } = createContext(userReducer,
     { addUser, deleteUser, editUser, getUsers }, []);