import React, { useCallback, useEffect, useState } from "react";
import { mockAuth } from "../../utils/mock";
// import { AvatarGenerator } from "random-avatar-generator";
import { API_URL, avatarGen } from "../../utils/constants";
import {Iauth, IresAuth} from "./interfaces";
import axios from 'axios';
import { cookieStorage } from "../../utils/storage";

export const AuthContext = React.createContext({
    auth: {} as Iauth,
    isAuth: false,
    setAuth: (auth: Iauth) => { },
    isLoading: false,
    setIsLoading: (state: boolean) => { }
})

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<Iauth>({} as Iauth);
    const [isLoading, setIsLoading] = useState(true);

    const getAuth = useCallback(async () => {
        let backendAuth: Iauth = await axios.get(`${API_URL}/user/auth/`,
            { headers: { 'X-CSRFToken': cookieStorage.getItem('csrftoken') || "" }}
        )
            .then(res => {
                console.log({ res })
                const data = (res as unknown as IresAuth).data;
                if ("error" in data) {
                    return {} as Iauth;
                }
                return data.data;
            })
            .catch(err => {
                console.error('catched error [AuthProvider]', { err });
                return mockAuth as Iauth;
            })
            .finally(() => setIsLoading(false));

        if (Object.values(backendAuth).filter(value => value !== "").length === 0) {
            console.log("bad Auth", { backendAuth })
            backendAuth = {} as Iauth
        } else {

            backendAuth.avatarUrl = avatarGen.generateRandomAvatar((backendAuth as Iauth).username);
            console.log("getAuth", { backendAuth })
        }
        setAuth(backendAuth as Iauth);
        // setAuth({} as Iauth); // disable auth
        // setAuth(mockAuth) // enable global auth
    }, [setAuth])

    useEffect(() => {
        getAuth()
    }, [getAuth]);

    return (
        <AuthContext.Provider value={{
            auth,
            isAuth: Object.keys(auth).length > 0,
            setAuth,
            isLoading,
            setIsLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}