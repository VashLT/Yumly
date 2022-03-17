import React from 'react';
import Page from './Page';
import { Route, Routes } from 'react-router-dom';
import Dishes from '../Core/Dishes/Dishes';
import MenuEdit from '../Core/Menus/Edit/MenuEdit';
import Menus from '../Core/Menus/Menus';
import { Box } from '@mui/material';

export const Dashboard: React.FC = () => {
    return (
        <Page withNav={true}>
            <Box sx={{
                width: '100vw',
                padding: '0 50px',
                flexGrow: 1,
                m: '0',
                pt: '40px',
                overflowX: 'hidden',
            }}>
                <Routes>
                    <Route path="/" element={<Menus />} />
                    <Route path="/dish" element={<Dishes />} />
                    <Route path="/menu/:id" element={<MenuEdit />} />
                </Routes>
            </Box>
        </Page>
);
}

export default Dashboard;