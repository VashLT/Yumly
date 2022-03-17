import { Edit, Delete } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { renderAt } from "../../../../utils/components";
import MenuContext from "../../../Contexts/Menu";
import { IresMenu } from "../interfaces";
import DeleteDialog from "./Dialog";


interface MenuDropdownProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
}



export const MenuDropdown: React.FC<MenuDropdownProps> = ({ anchorEl, open, handleClose }) => {
    const context = useContext(MenuContext);
    const containerId = "_mE" + (context.menu as IresMenu).id;


    const goEditMenu = () => {
        if (Object.keys(context.menu).length === 0) return;

        window.location.replace(`/dashboard/menu/${(context.menu as IresMenu).id}`);
    }
    const showDeleteMenu = () => {
        if (Object.keys(context.menu).length === 0) return;
        renderAt(<DeleteDialog context={context} />, containerId)
    }
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={goEditMenu}>
                <Edit /> Edit
            </MenuItem>
            <MenuItem onClick={showDeleteMenu}>
                <Delete /> Delete
            </MenuItem>
        </Menu >
    )
}

export default MenuDropdown;