import axios from 'axios';
import React, { useState } from 'react';
import { showBackError } from '../components/Core/Alerts/BackendError';
import { API_URL } from '../utils/constants';
import { mockMenuCategories } from '../utils/mock';

export interface IresMenuCats {
    id: number;
    name: string;
}

export const useGetMenuCategories = (): [boolean, IresMenuCats[]] => {
    const [data, setData] = useState<[] | IresMenuCats[]>([]);
    const [loading, setLoading] = useState(true);
    if (data.length > 0 || !loading) {
        return [loading, data]
    }

    axios.get(`${API_URL}/dishcategory`)
        .then(res => {
            console.log("useGetCategories", { res })
            const data = res.data as IresMenuCats[];
            if (!Array.isArray(data) || data.length === 0) {
                setData(mockMenuCategories.map(
                    (cat) => ({ id: cat.id, name: cat.name }))
                );
            } else {
                setData(data);
            }
            setLoading(false)
        })
        .catch(err => {
            showBackError(err);
            setData(mockMenuCategories);
            setLoading(false)
        })

    return [loading, data]

}

export default useGetMenuCategories;