import React from 'react';
import Page from './Page';
import { Route, Routes } from 'react-router-dom';
import Dishes from '../Core/Dishes/Dishes';
import MenuEdit from '../Core/Menus/MenuEdit';
import Menus from '../Core/Menus/Menus';

export const Dashboard: React.FC = () => {
    return (
        <Page withNav={true}>
            <Routes>
                <Route path="/" element={<Menus />} />
                <Route path="/dish" element={<Dishes />} />
                <Route path="/menu/:id" element={<MenuEdit />} />
            </Routes>
            </Page>
);
}

export default Dashboard;