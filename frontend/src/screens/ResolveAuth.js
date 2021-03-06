import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ResolveAuth = () => {
    const { tryLocalSignIn } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignIn();
    }, []);

    return null
}

export default ResolveAuth;