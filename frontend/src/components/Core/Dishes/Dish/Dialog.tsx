import React, { useCallback, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Theme } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { showNotification } from '../../Alerts/BriefNotification';
import { deleteDish as callDeleteEndpoint } from './Dish';
import { IdishContext } from '../../../Contexts/Dish';
import { fetchDishes } from '../Dishes';
import { IresDish } from '../interfaces';


const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));

export const DeleteDialog: React.FC<{ context: IdishContext }> = ({ context }) => {
    const [open, setOpen] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    const dish = context.dish as IresDish;

    const deleteDish = useCallback(async () => {
        setLoading(true);
        let res = await callDeleteEndpoint(dish.id);
        if (res === null) {
            showNotification("error", "This dish can not be deleted.");
            setIsDisabled(true);
        } else {
            context.setDish({});
            showNotification("success", "Dish deleted succesfully");
            await fetchDishes();
        }
        setOpen(false);
        setLoading(false)

    }, [setLoading, dish, context])

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
                    You are about to delete "{dish.name}", are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    color='error'
                    variant="outlined"
                    startIcon={<Delete />}
                    loadingPosition="start"
                    loading={loading}
                    onClick={deleteDish}
                    disabled={isDisabled}
                >
                    Delete perma
                </LoadingButton>
                <LoadingButton
                    color='error'
                    variant="contained"
                    startIcon={<Delete />}
                    loadingPosition="start"
                    onClick={deleteDish}
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