import React, { memo, useEffect, useState } from 'react';
import { Grid, Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { cookieStorage } from '../../../utils/storage';
import { Imenu, IresMenu } from './interfaces';
import Menu from './Menu';
import Skeleton from './Skeleton';
import { DataObjectSharp } from '@mui/icons-material';

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
        // if (didFetch) return;
        // fetchMenus(() => setDidFetch(true))
        fetchData();
    });

    return (
        <Grid container xs={12} component='div' sx={{ mb: '20px' }}>
            <Grid
                id="formulasGrid"
                container
                className={classes.grid}
            >
                {Array(10).fill(1).map(_ => <Grid className={classes.gridItem} item><Skeleton /></Grid>
                )}
            </Grid>
        </Grid>
    );
}

export const fetchMenus = async (callback?: () => void) => {
    let menus: [] | IresMenu[] = await axios.post("api/menus/search/",
        { data: "" },
        {
            headers: { 'X-CSRFToken': cookieStorage.getItem('csrftoken') || "" }
        })
        .then(res => {
            console.log({ res });
            const data = (res as any).data as IresMenu[];

            if (!("menus" in data)) {
                return []
            }
            return data;
        })
    // .catch(err => {
    //     console.error(err)
    //     renderAt(
    //         <BriefNotification
    //             type="main"
    //             severity="error"
    //             text="Internal error"
    //         />,
    //         "_overlay"
    //     )
    //     return []
    // }) as IunfmtFormula[] | []

    console.log({ menus })

    // temporary
    if (menus.length === 0) {
        // menus = mockFormulas;
        menus = [];
    }

    // insertFormulas(formulas);

    if (callback) {
        callback();
    }
};

export default memo(Menus);


let menus = await axios.post("api/menus/search/",
    { data: "" },
    {
        headers: { 'X-CSRFToken': cookieStorage.getItem('csrftoken') || "" }
    })
    .then(res => {
        console.log({ res });
        const data = (res as any).data as IresMenu[];

        if (!("menus" in data)) {
            return []
        }
        return data;
    })

export const fetchData = async () => {

    const datos = await axios.get("api/menus/").then((response) => {
        console.log({ response });
        if (!response) {
            return [];
        }
        const data = response.data;
        return data;
    })

    return datos;
}