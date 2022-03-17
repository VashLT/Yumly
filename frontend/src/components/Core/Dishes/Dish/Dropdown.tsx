import { Edit, Delete } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { renderAt } from "../../../../utils/components";
import { redirect } from "../../../../utils/funcs";
import DishContext from "../../../Contexts/Dish";
import { IresDish } from "../interfaces";
import DeleteDialog from "./Dialog";


interface DishDropdownProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
}



export const DishDropdown: React.FC<DishDropdownProps> = ({ anchorEl, open, handleClose }) => {
    const context = useContext(DishContext);
    const containerId = "_mE" + (context.dish as IresDish).id;


    const goEditDish = () => {
        if (Object.keys(context.dish).length === 0) return;

        redirect(`/dashboard/dish/${(context.dish as IresDish).id}`)
    }
    const showDeleteMenu = () => {
        if (Object.keys(context.dish).length === 0) return;
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
            <MenuItem onClick={goEditDish}>
                <Edit /> Edit
            </MenuItem>
            <MenuItem onClick={showDeleteMenu}>
                <Delete /> Delete
            </MenuItem>
        </Menu >
    )
}

export default DishDropdown;