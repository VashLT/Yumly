import React, { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// import IconButton from '@mui/material/IconButton';
// import SortIcon from '@mui/icons-material/Sort';

import { Toggle as ThemeToggle } from '../Theme/Toggle';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Logo from '../Yumly/Logo';
import { Link } from 'react-router-dom';
import { COLORS } from '../../../utils/constants';
import { AuthContext } from '../../Contexts/Auth';
import { mockAuth } from '../../../utils/mock';

const useStyles = makeStyles((theme: Theme) => ({
    hamburger: {
        color: '#fff',
        fontSize: '1rem'
    },
    itemBtn: {
        textDecoration: 'none',
        color: 'white'
    },
    logo: {
        height: '40px',
    }
}));

const pages = [
    {
        name: 'Platillos',
        redirectTo: '/dashboard/dish'
    },
    {
        name: 'Ingredientes',
        redirectTo: '/dashboard/',
    },
    {
        name: 'Comunidad',
        redirectTo: '/dashboard/'
    }
];

const settings = [
    {
        name: 'Profile',
        redirectTo: `/`,
    },
    {
        name: 'Dashboard',
        redirectTo: '/dashboard',
    },
    {
        name: 'Logout',
        redirectTo: '/logout',
    }
];

const Navbar: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { auth, isAuth, setAuth } = useContext(AuthContext);

    settings[0].redirectTo = `/${auth.username}`;

    const classes = useStyles();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget as any);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget as any);
    };

    const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(null);
        redirect(event);
    };

    const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(null);
        redirect(event);
    };

    const authenticate = () => {
        setAuth(mockAuth);
        (document.getElementById("auto-login") as HTMLAnchorElement).click();
    }

    const redirect = (event: React.MouseEvent<HTMLElement>) => {
        (event.currentTarget.querySelector('a') as HTMLAnchorElement).click();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: COLORS.cyan }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box
                            sx={{ p: '5px', mr: '10px', display: { xs: 'none', md: 'flex' } }}
                            onClick={() => (document.getElementById("toDashboard") as HTMLElement).click()}
                        >
                            <Logo className={classes.logo} />
                            <Link to='/dashboard' id="toDashboard" />
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                        <Link to={page.redirectTo} className={classes.itemBtn} />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, p: '5px', mr: '10px', display: { xs: 'flex', md: 'none' } }}>
                            <Logo className={classes.logo} />
                            <Link to='/dashboard' />
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                    <Link to={page.redirectTo} />
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {isAuth ? <><Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting, index) => (
                                        <MenuItem key={`set${index}`} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting.name}</Typography>
                                            <Link to={setting.redirectTo} className={classes.itemBtn} />
                                        </MenuItem>
                                    ))}
                                </Menu></>
                                : <div onClick={authenticate} style={{cursor: "pointer"}}>
                                    <Typography textAlign="center" sx={{color: "white", fontWeight: 500}}>LOGIN</Typography>
                                    <Link to="/dashboard" className={classes.itemBtn} id="auto-login" />
                                </div>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box >
    );
};

export default Navbar;
