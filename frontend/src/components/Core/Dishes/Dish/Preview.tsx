import { IconButton, Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions, Collapse, Theme } from '@mui/material';
import { red } from '@mui/material/colors';
import { MoreVert, Favorite, ExpandMore } from '@mui/icons-material';
import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { YUMLY_AVATAR_URL } from '../../../../utils/constants';
import { AuthContext } from '../../../Contexts/Auth';

const useStyles = makeStyles((theme: Theme) => ({
    expandMore: {
        marginLeft: 'auto',
    }
}));

type DishPreviewProps = {
    onClick: () => void;
    id: number;
    is_created: boolean;
    name: string;
    description: string;
    recipe_steps: string[];
    creation_date: string;
    image_url: string;
}

export const DishPreview: React.FC<DishPreviewProps> = ({
    id,
    is_created,
    name,
    description,
    creation_date,
    image_url,
    recipe_steps,
}) => {
    const [expanded, setExpanded] = React.useState(false);

    const { auth } = useContext(AuthContext);

    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="recipe"
                        src={is_created ? auth.avatarUrl : YUMLY_AVATAR_URL}
                    />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={name}
                subheader={creation_date}
            />
            <CardMedia
                component="img"
                height="194"
                image={image_url}
                alt={name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)', }}
                    className={classes.expandMore}
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            {recipe_steps.length > 0 ?
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph sx={{ fontWeight: 500 }}>Steps</Typography>
                        {recipe_steps.map((step) => (
                            <Typography paragraph sx={{ ml: 2 }}>
                                ■ {step}
                            </Typography>
                        ))}
                    </CardContent>
                </Collapse>
                : null}
        </Card>
    );
}

export default DishPreview;