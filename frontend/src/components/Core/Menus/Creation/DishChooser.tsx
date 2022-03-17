import { Search } from '@mui/icons-material';
import { Box, Chip, IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';
import { IdishList } from './Creation';

type DishChooserProps = {
    dishes: IdishList[];
    setDishes: (dishes: number[]) => void;
}

export const DishChooser: React.FC<DishChooserProps> = ({ dishes, setDishes }) => {
    const handleDelete = (dish: IdishList, index: number) => {
        
    }

    return (
        <Box>
            {dishes.length > 0
                ? dishes.map((dish, index) =>
                    <Chip label={dish.name} variant="outlined" onDelete={() => handleDelete(dish, index)} />
                )
                : null
            }
            <Searcher />
            <div id="_dCS"></div>
        </Box>
    );
}

const Searcher: React.FC = () => {
    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <Search />
            </IconButton>
        </Paper>
    )
}

export default DishChooser;