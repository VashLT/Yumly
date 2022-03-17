import React from 'react';
import Page from './Page';
import { Route, Routes } from 'react-router-dom';
import Dishes from '../Core/Dishes/Dishes';
import MenuEdit from '../Core/Menus/Edit/MenuEdit';
import Menus from '../Core/Menus/Menus';
import { Box } from '@mui/material';
import DishEdit from '../Core/Dishes/DishEdit';
import { ActionsButton } from '../Core/Actions/Actions';
import { renderAt } from '../../utils/components';
import MenuCreation from '../Core/Menus/Creation/Creation';
import DishCreation from '../Core/Dishes/Creation/Creation';

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
                    <Route path="/dish/:id" element={<DishEdit />} />
                </Routes>
                <div id="_aC"></div>
                <ActionsButton />
            </Box>
        </Page>
);
}

export const createMenu = () => {
    renderAt(
        <MenuCreation />,
        "_aC"
    )
}

export const createDish = () => {
    renderAt(
        <DishCreation />,
        "_aC"
    )
}

export default Dashboard;