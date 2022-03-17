import React, { useCallback, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Theme } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchMenus } from '../Menus';
import { IresMenu } from '../interfaces';
import { ImenuContext } from '../../../Contexts/Menu';
import { showNotification } from '../../Alerts/BriefNotification';
import { deleteMenu as callDeleteEndpoint } from './Menu';


const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));

export const DeleteDialog: React.FC<{ context: ImenuContext }> = ({ context }) => {
    const [open, setOpen] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    const menu = context.menu as IresMenu;

    const deleteMenu = useCallback(async () => {
        setLoading(true);
        let res = await callDeleteEndpoint(menu.id);
        setLoading(false);
        if (res === null) {
            showNotification("error", "This menu can not be deleted.");
            setIsDisabled(true);
        } else {
            context.setMenu({});
            showNotification("success", "Menu deleted succesfully");
            setOpen(false);
            await fetchMenus();
        }


    }, [setLoading, menu, context])

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="delete-menu"
            aria-describedby="delete-menu"
            className="delete__dialog"
        >
            <DialogTitle>
                {"Delete Menu"}
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to delete "{menu.name}", are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    color='error'
                    variant="outlined"
                    startIcon={<Delete />}
                    loadingPosition="start"
                    loading={loading}
                    onClick={deleteMenu}
                    disabled={isDisabled}
                >
                    Delete perma
                </LoadingButton>
                <LoadingButton
                    color='error'
                    variant="contained"
                    startIcon={<Delete />}
                    loadingPosition="start"
                    onClick={deleteMenu}
                    loading={loading}
                    disabled={isDisabled}
                >
                    Delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}


export default DeleteDialog;