import React, { useState } from 'react';
import { IresMenu } from '../Core/Menus/interfaces';

export type ImenuContext = {
    menu: IresMenu | {};
    setMenu: (menu: IresMenu | {}) => void;
}

export const MenuContext = React.createContext({
    menu: {} as IresMenu | {},
    setMenu: (menu: IresMenu | {}) => { }
});

interface MenuProviderProps {
    menu: IresMenu;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ menu, children }) => {
    const [currMenu, setMenu] = useState<IresMenu | {}>(menu);
    return (
        <MenuContext.Provider value={{ menu: currMenu, setMenu }}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuContext;