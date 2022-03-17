import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../../utils/constants';
import { Page } from "./Page";

const useStyles = makeStyles((theme: any) => ({
    hero: {
        minHeight: '100vh',
        backgroundImage: 'url(https://i.imgur.com/MVdRJJT.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
}));

export const LandingPage: React.FC = () => {
    const classes = useStyles();
    return (
        <Page className={classes.hero} withNav={true}>
            <Box sx={{
                marginTop: '200px'
            }}>
                <Typography
                    variant='h2'
                    sx={{
                        marginTop: '100px',
                        color: COLORS.light_red,
                        textAlign: "center",
                        "@media (max-width: 1200px)": {
                            margin: "-50px auto 5px auto",
                            fontSize: "clamp(2.5rem, 10vw, 6rem)",
                            width: "70vw"
                        }
                    }}>
                    All your menus in one place
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        marginTop: "30px",
                        color: 'gray',
                        textAlign: "center",
                        "@media (max-width: 1200px)": {
                            marginLeft: "auto",
                            marginRight: "auto",
                            fontSize: "clamp(2rem, 10vw, 4rem)",
                            width: "80vw"
                        }
                    }}
                >
                    Yumly is the web app where you can manage all your food menus!
                </Typography>
            </Box>
            <div id="_overlay"></div>
        </Page>
    );
}

export default LandingPage;