import React from 'react';
import { useParams } from 'react-router-dom';

export const DishEdit: React.FC = () => {
    const params = useParams();
    console.log({ params });
    return (
        <div>
            
        </div>
);
}

export default DishEdit;