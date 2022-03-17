import { Divider, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        fontSize: '4rem !important',
        margin: '5px 0 10px 0 !important',
        [theme.breakpoints.down('md')]: {
            fontSize: '2.5rem !important',
            marginLeft: '10px !important'
        }
    }
}));

type HeaderProps = {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
    const classes = useStyles();
    return (
        <header>
            <Typography className={classes.title} variant="h1" component="div" gutterBottom>
                {title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
        </header>
    );
}

export default Header;