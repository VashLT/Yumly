import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, IconButton, DialogContent, Typography, DialogActions, Button, Divider, TextField, TextareaAutosize, Box } from "@mui/material";
import axios from "axios";
import { useState, useCallback } from "react";
import { API_URL, getHeaders } from "../../../../utils/constants";
import { showBackError } from "../../Alerts/BackendError";
import { IresMenu } from "../interfaces";
import { Close, Delete, Edit, Save } from '@mui/icons-material';
import { renderAt } from '../../../../utils/components';
import DeleteDialog from './Dialog';
import { ImenuContext } from '../../../Contexts/Menu';
import { DishSmall } from '../../Dishes/Small/DishSmall';
import CategoryChip from '../../Categories/CategoryChip';
import { LoadingButton } from '@mui/lab';
import { redirect } from '../../../../utils/funcs';
import { editMenu } from './Menu';
import { showNotification } from '../../Alerts/BriefNotification';

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
    context: ImenuContext;
    open: boolean;
} & IntrinsicProps;

export const MenuPreviewEdit: React.FC<MenuPreviewEditProps> = ({ onClose, context, open }) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [editingDesc, setEditingDesc] = useState(false);



    const menu = context.menu as IresMenu;

    const [name, setName] = useState(menu.name);
    const [desc, setDesc] = useState(menu.description);

    const handleNameDoubleClick = () => {
        if (editingName) return;

        setEditingName(true);
    }

    const handleNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        console.log({ value, name });
        if (desc === menu.description && name === menu.name) {
            setCanSave(false);
            return;
        }

        if (value === "") {
            showNotification("warning", "The name of the menu can't be empty")
            return;
        }

        setName(value);
        setCanSave(true);
    }

    const handleDescDoubleClick = () => {
        if (editingDesc) return;

        setEditingDesc(true);
    }

    const handleDescBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        console.log({ value, desc });
        if (desc === menu.description && name === menu.name) {
            setCanSave(false);
            return;
        }

        if (value === "") {
            showNotification("warning", "The description of the menu can't be empty")
            return;
        }

        setDesc(value);
        setCanSave(true);
    }

    const onCloseWrapper = () => {
        setEditingName(false);
        setEditingDesc(false);
        onClose()
    }

    const handleSave = useCallback(async () => {
        let updates: any = { id: menu.id };

        if (name !== menu.name) {
            updates.name = name;
        }
        if (desc !== menu.description) {
            updates.description = desc;
        }

        setSaveLoading(true);
        let editedMenu = await editMenu(updates);
        if (editedMenu === null) return;

        if (editedMenu === false) {
            showNotification("error", "The menu couldn't be saved");
        } else {
            showNotification("success", "The menu has been saved successfully");
            context.setMenu(editedMenu);
        }

        setSaveLoading(false);

    }, [name, desc, menu, context]);

    const deleteMenu = () => {
        renderAt(
            <DeleteDialog context={context} />,
            "_mEO" + menu.id
        );
    }

    return (
        <BootstrapDialog
            onClose={onCloseWrapper}
            open={open}
        >
            <Box
                sx={{
                    flex: '0 0 auto',
                    margin: 0,
                    p: 2
                }}
                onDoubleClick={handleNameDoubleClick}
            >
                {!editingName ?
                    <Typography>{name}</Typography>
                    : ''
                }
                {editingName ?
                    <TextField
                        sx={{ width: '80%' }}
                        hiddenLabel
                        id="filled-hidden-label-small"
                        defaultValue={name}
                        variant="filled"
                        onBlur={handleNameBlur}
                        size="small"
                    />
                    : ''
                }
                <IconButton
                    aria-label="close"
                    onClick={onCloseWrapper}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            </Box>
            <DialogContent dividers sx={{
                maxHeight: '600px',
                overFlowY: 'auto'
            }}>
                <Typography gutterBottom onDoubleClick={handleDescDoubleClick}>
                    {!editingDesc ? menu.description : ''}
                    {editingDesc ?
                        <TextField
                            sx={{ width: '100%' }}
                            hiddenLabel
                            multiline
                            rows={2}
                            defaultValue={desc}
                            variant="filled"
                            onBlur={handleDescBlur}
                        />
                        : ''
                    }
                </Typography>
                <Divider sx={{ mb: '10px' }} />
                {menu.dish_list.map(dish =>
                    <DishSmall
                        id={dish.id}
                        name={dish.name}
                    />
                )}
                <Divider sx={{ mb: '10px' }} />
                {menu.categories.map(cat =>
                    <CategoryChip category={cat} />
                )}
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    color="secondary"
                    loading={saveLoading}
                    loadingPosition="start"
                    startIcon={<Save />}
                    autoFocus
                    variant="contained"
                    onClick={handleSave}
                    disabled={!canSave}>
                    Save changes
                </LoadingButton>
                <Button
                    startIcon={<Edit />}
                    autoFocus
                    variant="contained"
                    onClick={() => redirect(`/dashboard/menu/${menu.id}`)}
                >
                    Edit
                </Button>
                <Button
                    startIcon={<Delete />}
                    variant="contained"
                    autoFocus
                    onClick={deleteMenu}
                    disabled={menu.author_id === null}
                >
                    Delete
                </Button>
            </DialogActions>
            <div id={"_mEO" + menu.id}></div>
        </BootstrapDialog>
    );
};

export default MenuPreviewEdit;