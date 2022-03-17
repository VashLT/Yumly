import React from 'react';

import { makeStyles } from '@mui/styles';
import { Chip, CircularProgress, IconButton, ListItem, Menu, MenuItem, Theme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Category as CategoryIcon, DinnerDining, Error, Functions } from '@mui/icons-material';
import { IresMenuCats, useGetMenuCategories } from '../../../../hooks/useGetMenuCategories';

const MAX_HEIGHT = 50;

const useStyles = makeStyles((theme: Theme) => ({
    tagsContainer: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    tagsMenu: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    category: {
        margin: '5px'
    }
}));

type CategoriesMenuProps = {
    categories: IresMenuCats[];
    updateCategories: (categories: IresMenuCats[]) => void;
}

export const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ categories, updateCategories }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [isLoading, allCategories] = useGetMenuCategories();

    const classes = useStyles();


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUpdateCategory = (category: IresMenuCats) => {
        updateCategories([category]);
        setAnchorEl(null);
    }

    return (
        <ListItem component={Box} className={classes.tagsContainer} sx={{ width: '50%' }}>
            <Typography>Select a category: &nbsp;</Typography>
            <IconButton sx={{ pl: '0' }} onClick={handleClick}>
                <CategoryIcon />
            </IconButton>
            <Box className={classes.tagsMenu}>
                {categories.length > 0
                    ? categories.map((cat) => (<Chip
                        className={classes.category}
                        label={cat.name}
                        icon={<DinnerDining />}
                        variant="outlined"
                    />))
                    : null}
            </Box>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    style: {
                        maxHeight: MAX_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {isLoading ? <MenuItem><CircularProgress color='primary' /></MenuItem>
                    : ""
                }
                {
                    allCategories.length > 0 ? <CategorySelect categories={allCategories} currentCategory={categories[0]} onClick={handleUpdateCategory} />
                        : <MenuItem><Error style={{ color: 'red' }} /></MenuItem>
                }
            </Menu>
        </ListItem>
    );
}

const CategorySelect: React.FC<{ categories: IresMenuCats[], currentCategory: IresMenuCats, onClick: any }> = ({ categories, currentCategory, onClick }) => {
    return (
        <>{categories.map((category, index) => <MenuItem
            key={"S" + category.id}
            disabled={currentCategory ?
                currentCategory.id === category.id
                : false
            }
            onClick={() => onClick(category)}
        >
            {category.name}
        </MenuItem>)}
        </>
    )
}


export default CategoriesMenu;