import React, { useState } from 'react';
import { IresDish } from '../Core/Dishes/interfaces';
import { IresMenu } from '../Core/Menus/interfaces';

export type IdishContext = {
    dish: IresDish | {};
    setDish: (dish: IresDish | {}) => void;
}

export const DishContext = React.createContext({
    dish: {} as IresDish | {},
    setDish: (dish: IresDish | {}) => { }
});

interface MenuProviderProps {
    dish: IresDish;
}

export const DishProvider: React.FC<MenuProviderProps> = ({ dish, children }) => {
    const [currDish, setDish] = useState<IresDish | {}>(dish);
    return (
        <DishContext.Provider value={{ dish: currDish, setDish }}>
            {children}
        </DishContext.Provider>
    )
}

export default DishContext;