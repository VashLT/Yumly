import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../utils/constants';
import { mockUser } from '../utils/mock';
import { cookieStorage } from '../utils/storage';


export const useGetUser = (username: string): [boolean, Iuser] => {
    const [user, setUser] = useState<{} | Iuser>({});
    const [loading, setLoading] = useState(true);

    if (Object.keys(user).length > 0 || !loading) {
        return [loading, user as Iuser]
    }

    console.log("useGetUser", { username })

    axios.post(`${API_URL}/api/user/search/`, {
        username: username
    }, { headers: { 'X-CSRFToken': cookieStorage.getItem('csrftoken') || "" } })
        .then(res => {
            console.log("useGetTags", { res })
            const data = (res as unknown as IresUSer).data;
            if ("error" in data) {
                setUser(mockUser)
            }
            setUser(data.user as Iuser);
        })
        .catch(err => {
            console.error(err)
            setUser(mockUser);
        })
        .finally(() => setLoading(false))

    return [loading, user as Iuser]

}

export default useGetUser;