import createContext from './createContext';
import jsonServer from '../api/jsonServer';

const userReducer = (state, action) => {
    switch (action.type) {
        case 'getUsers':
            return action.payload;
        case 'deleteUser':
            // payload will have the 'id' to be deleted
            return state.filter((user) => {
                return user.id !== action.payload
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
    return async () => {
        try {
            const response = await jsonServer.get('/users');
            
            dispatch({ type: "getUsers", payload: response.data });
        }
        catch (e) {
            console.log('Something went wrong');
        }
    }
}

export const addUser = (dispatch) => {
    return async (userName, password, callback) => {
        try {
            await jsonServer.post('/users', { userName, password });

            callback();
        }
        catch (e) {
            console.log('Something went wrong');
        }
    }
}

export const deleteUser = (dispatch) => {
    return async (id) => {
        try { 
            await jsonServer.delete(`/users/${id}`);

            dispatch({ type: "deleteUser", payload: id });
        }
        catch (e) {
            console.log('Something went wrong');
        }
    }
}

export const editUser = (dispatch) => {
    return async (id, userName, password, callback) => {
        try {
            await jsonServer.put(`/users/${id}`, { userName, password });

            // dispatch({ type: "editUser", payload: { id, userName, password } });
            callback();
        }
        catch (e) {
            console.log('Something went wrong');
        }
    }
}


export const { Context, Provider } = createContext(userReducer,
     { addUser, deleteUser, editUser, getUsers }, []);