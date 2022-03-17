import { AspectRatio, DinnerDining, MoreVert, OpenInFull, ThumbUpOffAlt } from "@mui/icons-material";
import { Card, CardHeader, IconButton, Divider, CardContent, Typography, CardActions, Button } from "@mui/material";
import React, { useState } from "react";
import { COLORS } from "../../../../utils/constants";
import { capitalize } from "../../../../utils/funcs";
import { IresDish } from "../../Dishes/interfaces";
import MenuDropdown from "./Dropdown";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';



type MenuPreviewProps = {
    onClick: () => void;
    id: number;
    author_id: number | null;
    name: string;
    description: string;
    dish_list: IresDish[];
    votes: number;
}

export const MenuPreview: React.FC<MenuPreviewProps> = ({ onClick, id, author_id, name, description, dish_list, votes }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    return (
        <Card
            id={String(id)}
            sx={{
                maxWidth: 345,
                height: '100%',
                '& .MuiCardHeader-action': {
                    alignSelf: 'center !important'
                },
                '& .MuiCardHeader-content': {
                    maxWidth: '75%'
                },
                '& .MuiCardHeader-title': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    '-webkit-line-clamp': 3,
                    '-webkit-box-orient': 'vertical',
                    width: '80%',
                },
            }}
            className="menu__small"
        >
            <CardHeader
                title={capitalize(name)}
                sx={{ height: '20%', backgroundColor: COLORS.pink, color: 'white !important' }}
                action={
                    <>
                        <IconButton aria-label="settings" onClick={onClick} className="expand">
                            <OpenInFull style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton aria-label="settings" onClick={handleMoreClick}>
                            <MoreVert style={{ color: 'white' }} />
                        </IconButton>
                        <MenuDropdown anchorEl={anchorEl} open={open} handleClose={() => setAnchorEl(null)} />
                    </>
                }
            />
            <Divider />
            <CardContent sx={{ paddingBottom: '40px' }}>
                <Typography sx={{ fontSize: '17px', color: 'darkgray', marginBottom: '10px' }}>
                    {description}
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: '15px' }}>
                    Dishes
                </Typography>
                <List sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                    component="nav"
                    aria-label="mailbox folders">

                    {dish_list.map((dish, index) => (
                        <ListItem button divider>
                            <ListItemIcon>
                                <DinnerDining />
                            </ListItemIcon>
                            <ListItemText primary={dish.name} />
                        </ListItem>
                    ))}
                </List>
                <span style={{ display: 'flex' }}>
                    <ThumbUpOffAlt />
                    <p style={{ margin: '0', marginLeft: '5px' }}>{votes}</p>
                </span>
            </CardContent>
        </Card>
    )
}

export default MenuPreview
