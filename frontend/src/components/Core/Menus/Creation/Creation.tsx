import React, { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { createMenu } from '../Menu/Menu';
import { showNotification } from '../../Alerts/BriefNotification';
import { redirect } from '../../../../utils/funcs';
import { makeStyles } from '@mui/styles';
import { CircularProgress, DialogActions, TextField, Theme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Add } from '@mui/icons-material';
import { Box } from '@mui/system';
import DishChooser from './DishChooser';
import CategoriesMenu from './CategoriesMenu';
import { IresMenuCats } from '../../../../hooks/useGetMenuCategories';
import { COLORS } from '../../../../utils/constants';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) => ({
    noClickBackdrop: {
        pointerEvents: "none"
    },
    dialog: {
        width: '98vw !important',
        '@media (max-width: 600px)': {
            margin: '0 !important'
        },
        '@media (min-width: 900px)': {
            maxWidth: '700px !important'
        }
    }
}));

export type IdishChoose = {
    id: number;
    name: string;
}

export const MenuCreation: React.FC = () => {
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [dishList, setDishList] = useState<IdishChoose[]>([]);
    const [categories, setCategories] = useState<IresMenuCats[]>([]);

    const [open, setOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();

    const saveMenu = useCallback(async () => {
        setIsLoading(true);
        let savedMenu = await createMenu({
            name: name as string,
            author_id: 1,
            description: description ?? "",
            creation_date: new Date().toISOString().split('T')[0],
            dish_list: dishList.map((dish) => dish.id) as number[],
            categories: categories.map((cat) => cat.id) as number[],
            votes: 0,
        })
        setIsLoading(false);
        if (savedMenu === null) return;

        if (savedMenu === false) {
            showNotification("error", "The menu couldn't be created");
        } else {
            showNotification("success", "The menu has been created successfully");
            redirect("/dashboard/");
        }

        setOpen(false);
    }, [categories, description, dishList, name])


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: COLORS.light_red }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Create your menu!
                    </Typography>
                    <LoadingButton
                        loading={isLoading}
                        autoFocus
                        color="inherit"
                        loadingIndicator={<CircularProgress sx={{ color: "white", fill: "white" }} size={16} />}
                        onClick={saveMenu}
                        disabled={(name === "" || name === null) || (description === "" || description === null) || dishList.length === 0}
                    >
                        save
                    </LoadingButton>
                </Toolbar>
            </AppBar>
            <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ListItem
                    component={Box}
                    sx={{ width: '50%' }}
                >
                    <TextField
                        id="descInput"
                        label="Name"
                        sx={{ width: '100%' }}
                        defaultValue=""
                        onBlur={(e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => setName(e.currentTarget.value)}
                    />
                </ListItem>
                <Divider sx={{ mb: 2 }} />
                <ListItem
                    component={Box}
                    sx={{ width: '50%' }}
                >
                    <TextField
                        id="descInput"
                        label="Descripción del menú"
                        sx={{ width: '100%' }}
                        multiline
                        rows={4}
                        defaultValue=""
                        onBlur={(e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => setDescription(e.currentTarget.value)}
                    />
                </ListItem>
                <Divider sx={{ mb: 2 }} />
                <DishChooser dishes={dishList} setDishes={setDishList} />
                <CategoriesMenu categories={categories} updateCategories={setCategories} />
            </List>
            <DialogActions sx={{ width: "50%", alignSelf: "center" }}>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <LoadingButton
                    loading={isLoading}
                    onClick={saveMenu}
                    variant="contained"
                    color="success"
                    disabled={(name === "" || name === null) || (description === "" || description === null) || dishList.length === 0}
                    startIcon={<Add />}
                    loadingPosition="start"
                >
                    Create
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default MenuCreation;