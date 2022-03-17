import { styled } from '@mui/material/styles';
import { Dialog, IconButton, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, Collapse, Theme } from '@mui/material';
import { red } from '@mui/material/colors';
import { MoreVert, Favorite, ExpandMore } from '@mui/icons-material';
import React, { useContext } from 'react';
import { IdishContext } from '../../../Contexts/Dish';
import { makeStyles } from '@mui/styles';
import { AuthContext } from '../../../Contexts/Auth';
import { IresDish } from '../interfaces';
import { YUMLY_AVATAR_URL } from '../../../../utils/constants';
import { DEFAULT_LINK } from './Dish';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const useStyles = makeStyles((theme: Theme) => ({
    expandMore: {
        marginLeft: 'auto',
    }
}));

type DishModalProps = {
    onClose: () => void;
    context: IdishContext;
    open: boolean;
} & IntrinsicProps;

export const DishModal: React.FC<DishModalProps> = ({ context, onClose, open }) => {
    const [expanded, setExpanded] = React.useState(false);

    const { auth } = useContext(AuthContext);

    const dish = context.dish as IresDish;

    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <BootstrapDialog
            onClose={onClose}
            open={open}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            src={dish.is_created ? auth.avatarUrl : YUMLY_AVATAR_URL}
                        />
                    }
                    title={dish.name}
                    subheader={dish.creation_date}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={DEFAULT_LINK}
                    alt={dish.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">{dish.description}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <Favorite />
                    </IconButton>
                    {dish.recipe_steps ? (
                        dish.recipe_steps.length > 0 ?
                            <IconButton
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                sx={{ transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)', }}
                                className={classes.expandMore}
                            >
                                <ExpandMore />
                            </IconButton>
                            : <></>
                        )
                    : null}
                </CardActions>
                {dish.recipe_steps ?
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph sx={{ fontWeight: 500 }}>Steps</Typography>
                            {dish.recipe_steps.map((step) => (
                                <Typography paragraph sx={{ ml: 2 }}>
                                    &#8226; {step}
                                </Typography>
                            ))}
                        </CardContent>
                    </Collapse>
                </Collapse>
                : null}
            </Card>
        </BootstrapDialog>
    );
}

export default DishModal;