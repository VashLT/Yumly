import React, { useState, useCallback, useContext } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Imenu, IresMenu } from './interfaces';
import { IresDish } from '../Dishes/interfaces';
import { Box, Card, CardActions, CardContent, CardHeader, Divider } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { API_URL, COLORS, getHeaders } from '../../../utils/constants';
import axios from 'axios';
import { showBackError } from '../Alerts/BackendError';
import MenuContext, { MenuProvider } from '../../Contexts/Menu';

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

    const { menu } = useContext(MenuContext);

    if (Object.keys(menu).length === 0) {
        return <></>
    }

    const { id, name, description, dish_list, votes } = menu as IresMenu;

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
                name={name}
                description={description}
                dish_list={dish_list}
                votes={votes}
            />
            <MenuPreviewEdit
                key={`menuPre${id}`}
                id={`menuPre${id}`}
                open={open}
                menu={menu as IresMenu}
                onClose={handleClose}
            />
        </div>
    );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type MenuPreviewEditProps = {
    onClose: () => void;
    menu: IresMenu;
    open: boolean;
} & IntrinsicProps;

const MenuPreviewEdit: React.FC<MenuPreviewEditProps> = ({ children, onClose, menu, open }) => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteMenu = useCallback(async () => {
        console.log("[MNenuPreviewEdit] delete menu", { menu });
        setDeleteLoading(true);
        await axios
            .delete(`${API_URL}/menu/${menu.id}`, getHeaders())
            .then((res) => {
                console.log(`api/menu/${menu.id}`, { res });
                if ("data" in res && res.data === true) {
                    return;
                }
            })
            .catch(err => {
                console.log("showBackError", err);
                showBackError(err);
                return [];
            });
    }, [deleteLoading, menu])

    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {menu.name}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>{menu.description}</Typography>
            </DialogContent>
            <DialogActions>
                {/* <Button autoFocus onClick={saveChanges} disabled={didChanges}>
                    Save changes
                </Button> */}
                <Button autoFocus onClick={() => { }}>
                    Edit
                </Button>
                <Button autoFocus onClick={deleteMenu}>
                    Delete
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

type MenuPreviewProps = {
    onClick: () => void;
    id: number;
    name: string;
    description: string;
    dish_list: IresDish[];
    votes: number;
}

const MenuPreview: React.FC<MenuPreviewProps> = ({ onClick, id, name, description, dish_list, votes }) => {
    return (
        <Card
            id={String(id)}
            sx={{ maxWidth: 345, height: '100%', '& .MuiCardHeader-action': { alignSelf: 'center !important' } }}
            onClick={onClick}
        >
            <CardHeader
                title={name}
                sx={{ height: '20%', backgroundColor: COLORS.cyan, color: 'white !important' }}
            />
            <Divider />
            <CardContent>
                <Typography>
                    {description}
                </Typography>
                {dish_list.map((dish, index) => (
                    <Typography>{dish.name}</Typography>
                ))}
                <span>
                    <ThumbUpIcon />
                    {votes}
                </span>
            </CardContent>
            <CardActions disableSpacing sx={{ height: '20%' }}>
                <Button>Edit</Button>
                <Button>Delte</Button>
            </CardActions>
        </Card>
    )
}

export default MenuWrapper;