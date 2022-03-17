import { Search } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, IconButton, InputBase, Paper, Stack, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { renderAt } from '../../../../utils/components';
import { showNotification } from '../../Alerts/BriefNotification';
import { searchDishes } from '../../Dishes/Dishes';
import { IdishChoose } from './Creation';

type DishChooserProps = {
    dishes: IdishChoose[];
    setDishes: (dishes: IdishChoose[]) => void;
}

export const DishChooser: React.FC<DishChooserProps> = ({ dishes, setDishes }) => {
    const handleDelete = (target: IdishChoose, index: number) => {
        setDishes(dishes.filter((dish) => dish.id !== target.id));
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{fontWeight: 500, fontSize: '18px'}}>Select your dishes</Typography>
            <Box sx={{ alignSelf: 'flex-start' }}>
                {dishes.length > 0
                    ? dishes.map((dish, index) =>
                        <Chip label={dish.name} variant="outlined" onDelete={() => handleDelete(dish, index)} />
                    )
                    : null
                }
            </Box>
            <Searcher dishes={dishes} setDishes={setDishes} />
            <Stack id="_dCS" direction="row" spacing={2}></Stack>
        </Box>
    );
}

type SearcherProps = DishChooserProps;

const Searcher: React.FC<SearcherProps> = ({ dishes, setDishes }) => {
    const [searching, setSearching] = useState(false);
    const search = useCallback(async () => {
        setSearching(true);
        const addDish = (newDish: IdishChoose) => {
            if (dishes.filter((dish) => dish.id === newDish.id).length === 0) {
                setDishes([...dishes, newDish])
            }
        }

        const value = (document.getElementById("dish-search") as HTMLInputElement).value;

        let results = await searchDishes(value);
        setSearching(false);
        if (results === null) return;

        if (!Array.isArray(results) || results.length === 0) {
            showNotification("success", "No dishes were found for the serach criteria");
            return;
        }

        renderAt(
            <>{results.map((dish) =>
                <Chip
                    label={dish.name}
                    variant="outlined"
                    onClick={() => addDish({ id: dish.id, name: dish.name })}
                />)
            }
            </>,
            "_dCS"
        )
    }, [dishes, setDishes]);
    return (
        <Paper
            sx={{
                padding: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'center',
                width: 400,
                marginBottom: '15px',
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search dishes"
                inputProps={{ 'aria-label': 'search dishes' }}
                id="dish-search"
            />
            <LoadingButton
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={search}
                loading={searching}
                startIcon={<Search />}
                loadingPosition="start"
            />
        </Paper>
    )
}

export default DishChooser;