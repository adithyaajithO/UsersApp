import React from 'react';
import usersServer from '../api/usersServer';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';


export const AuthContext = React.createContext();

const signup = (dispatch) => async ({ userName, password }) => {

    try {
        const response = await usersServer.post('/signup', { userName, password });

        // console.log('in try :: ', response.data.token);
        await AsyncStorage.setItem('token', response.data.token);
        // await callback();
        dispatch({ type: 'auth', payload: response.data.token });
        // navigate('SignIn');
    }
    catch (e) {
        console.log(e.response.data);
        dispatch({ type: 'addError', payload: e.response.data.error });
        // navigate('SignIn');
    }

}


const signin = (dispatch) => async ({ userName, password }) => {

    try {
        const response = await usersServer.post('/signin', { userName, password });

        // console.log('in try :: ', response.data.token);
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'auth', payload: response.data.token });
        // navigate('SignIn');
    }
    catch (e) {
        console.log(e.response.data);
        dispatch({ type: 'addError', payload: e.response.data.error });
        // navigate('SignIn');
    }


}

const tryLocalSignIn = (dispatch) => async () => {

    token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'auth', payload: token });
    }
    else {
        navigate('Signup');
    }

}

const signout = (dispatch) => async () => {
    
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
}

const clearError = (dispatch) => () => {
    dispatch({ type: 'clearError' });
}

export const authReducer = (state, action) => {
    // console.log('action ', action);
    switch (action.type) {

        case 'auth':
            return { token: action.payload, errorMessage: '' };
        case 'addError':
            return { ...state, errorMessage: action.payload };
        case 'clearError':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { token: null, errorMessage: '' };
        default:
            return state;
    }

}

export const actions = { signup, signin, signout, clearError, tryLocalSignIn };

