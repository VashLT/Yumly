import React, { memo, useEffect, useState } from 'react';
import { Grid, Box, Theme, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { cookieStorage } from '../../../utils/storage';
import { Imenu, IresMenu } from './interfaces';
import { MenuWrapper as Menu } from './Menu/Menu';
import Skeleton from './Skeleton/Skeleton';
import { showBackError } from '../Alerts/BackendError';
import { renderAt } from '../../../utils/components';
import { mockMenus } from '../../../utils/mock';
import { API_URL, getHeaders } from '../../../utils/constants';
import Header from '../Header/Header';

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

export const Menus: React.FC = () => {
    const classes = useStyles();
    const [didFetch, setDidFetch] = useState(false);

    useEffect(() => {
        if (didFetch) return;
        fetchMenus(() => setDidFetch(true))
    });

    return (
        <>
            <Header title="Menus"/>
            <Grid
                id="menus-grid"
                key="menus-grid"
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

export const getMenus = async () => {
    return await axios
        .get(`${API_URL}/menu/`, getHeaders())
        .then((res) => res.data)
        .catch((err) => {
            showBackError(err)
            return null;
        }) as IresMenu[] | null;
}

export const fetchMenus = async (callback?: () => void) => {
    let menus: IresMenu[] | null = await getMenus();
    console.log({ menus })

    // temporary
    if (!Array.isArray(menus) || menus.length === 0) {
        menus = mockMenus;
    }

    insertMenus(menus);

    if (callback) {
        callback();
    }
};

export const insertMenus = (menus: IresMenu[]) => {
    console.log("insertMenus", { menus })
    if (menus.length === 0) return;
    renderAt(
        <>
            {menus.map((menu, index) => {
                return (
                    <Grid item justifyContent={'center'}>
                        <Menu key={"m" + index} menu={menu} />
                    </Grid>
                );
            })}
        </>,
        "menus-grid"
    )
}

export default memo(Menus);