import React, { useContext } from 'react';
import { ImenuCreate, ImenuUpdate, IresMenu } from '../interfaces';
import { API_URL, getHeaders } from '../../../../utils/constants';
import axios from 'axios';
import { showBackError } from '../../Alerts/BackendError';
import MenuContext, { MenuProvider } from '../../../Contexts/Menu';
import MenuPreview from './Preview';
import MenuPreviewEdit from './Modal';

export interface MenuProps {
    menu: IresMenu;
}

export const MenuWrapper: React.FC<MenuProps> = ({ menu }) => {
    return (
        <MenuProvider menu={menu}>
            <Menu />
        </MenuProvider>
    )
}

const Menu: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const context = useContext(MenuContext);

    if (Object.keys(context.menu).length === 0) {
        return <></>
    }

    const { id, author_id, name, description, dish_list, votes } = context.menu as IresMenu;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="wrapper-menu">
            <MenuPreview
                onClick={handleClickOpen}
                id={id}
                author_id={author_id}
                name={name}
                description={description}
                dish_list={dish_list}
                votes={votes}
            />
            <MenuPreviewEdit
                key={`menuPre${id}`}
                id={`menuPre${id}`}
                open={open}
                context={context}
                onClose={handleClose}
            />
            <div id={"_mE" + id}></div>
        </div>
    );
}

export const createMenu = async (fields: ImenuCreate) => {
    return await axios
        .post(`${API_URL}/menu/`, fields, getHeaders())
        .then((res) => res)
        .catch((err) => {
            showBackError(err)
            return null;
        }) as IresMenu | null | boolean;
}

export const editMenu = async (fields: ImenuUpdate) => {
    return await axios
        .put(`${API_URL}/menu/${fields.id}`, fields, getHeaders())
        .then((res) => res)
        .catch((err) => {
            showBackError(err)
            return null;
        }) as IresMenu | null | boolean;
}

export const deleteMenu = async (menu_id: number) => {
    return await axios
        .delete(`${API_URL}/menu/${menu_id}`, {
            headers: getHeaders().headers,
        })
        .then((res) => res)
        .catch((err) => {
            showBackError(err)
            return null;
        }) as IresMenu | null | boolean;

}

export default MenuWrapper;