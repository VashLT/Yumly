import { AspectRatio, MoreVert, OpenInFull, ThumbUp } from "@mui/icons-material";
import { Card, CardHeader, IconButton, Divider, CardContent, Typography, CardActions, Button } from "@mui/material";
import React, { useState } from "react";
import { COLORS } from "../../../../utils/constants";
import { IresDish } from "../../Dishes/interfaces";
import MenuDropdown from "./Dropdown";

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
            sx={{ maxWidth: 345, height: '100%', '& .MuiCardHeader-action': { alignSelf: 'center !important' } }}
            className="menu__small"
        >
            <CardHeader
                title={name}
                sx={{ height: '20%', backgroundColor: COLORS.cyan, color: 'white !important' }}
                action={author_id !== null ?
                    <>
                        <IconButton aria-label="settings" onClick={onClick} className="expand">
                            <OpenInFull style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton aria-label="settings" onClick={handleMoreClick}>
                            <MoreVert style={{ color: 'white' }} />
                        </IconButton>
                        <MenuDropdown anchorEl={anchorEl} open={open} handleClose={() => setAnchorEl(null)} />
                    </>
                    : <></>
                }
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
                    <ThumbUp />
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

export default MenuPreview
