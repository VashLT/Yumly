import React, { memo, useEffect, useState } from 'react';
import { Grid, Box, Theme, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { cookieStorage } from '../../../utils/storage';
import { IresDish } from './interfaces';
import { DishWrapper as Dish } from './Dish/Dish';
import Skeleton from './Skeleton/Skeleton';
import { showBackError } from '../Alerts/BackendError';
import { renderAt } from '../../../utils/components';
import { mockDishes } from '../../../utils/mock';
import { API_URL, getHeaders } from '../../../utils/constants';
import { IresMenu } from '../Menus/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '50px',
            paddingRight: '30px'
        },
    },
    grid: {
        display: 'grid !important',
        justifyContent: 'center',
        marginLeft: '0px !important',
        marginBottom: '20px',
        gridTemplateColumns: 'repeat(auto-fit, 300px)',
        gridGap: '20px',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'left',
            // gridTemplateRows: 'repeat(auto-fit, 300px)',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100vw !important'
        }
    },
    gridItem: {
        // backgroundColor: 'blue',
        // border: 'solid 1px white',
    },
    title: {
        fontSize: '4rem !important',
        margin: '5px 0 10px 0 !important',
        [theme.breakpoints.down('md')]: {
            fontSize: '2.5rem !important',
            marginLeft: '10px !important'
        }
    }
}));

export const Dishes: React.FC = () => {
    const classes = useStyles();
    const [didFetch, setDidFetch] = useState(false);

    useEffect(() => {
        if (didFetch) return;
        fetchDishes(() => setDidFetch(true))
    });

    return (
        <>
            <Typography className={classes.title} variant="h1" component="div" gutterBottom>
                Platillos
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid
                id="dishes-grid"
                key="dishes-grid"
                container
                className={classes.grid}
            >
                {Array(10).fill(1).map((_, index) =>
                    <Grid key={index} className={classes.gridItem} item>
                        <Skeleton />
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export const getDishes = async () => {
    return await axios
        .get(`${API_URL}/dish/`, getHeaders())
        .then((res) => res.data)
        .catch((err) => {
            showBackError(err)
            return null;
        }) as IresDish[] | null;
}


export const fetchDishes = async (callback?: () => void) => {
    let dishes: IresDish[] | null = await getDishes();
    console.log({ dishes })
    // temporary
    if (!Array.isArray(dishes) || dishes.length === 0) {
        dishes = mockDishes;
    }

    insertDishes(dishes);

    if (callback) {
        callback();
    }
};

export const insertDishes = (dishes: IresDish[]) => {
    console.log("insertDishes", { dishes })
    if (dishes.length === 0) return;
    renderAt(
        <>
            {dishes.map((dish, index) => {
                return (
                    <Grid item justifyContent={'center'}>
                        <Dish key={"m" + index} dish={dish} />
                    </Grid>
                );
            })}
        </>,
        "dishes-grid"
    )
}

export default memo(Dishes);