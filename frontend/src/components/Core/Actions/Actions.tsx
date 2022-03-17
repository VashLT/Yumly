import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { RestaurantMenu, SoupKitchen } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { createDish, createMenu } from '../../Pages/Dashboard';

export const ActionsButton = () => {
    return (
        // <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
            ariaLabel="Actions"
            sx={{ position: 'absolute', bottom: 64, right: 64 }}
            icon={<SpeedDialIcon />}
        >
            <SpeedDialAction
                key="Create dish"
                icon={<SoupKitchen />}
                tooltipTitle="Create dish"
                onClick={createDish}
            />
            <SpeedDialAction
                key="Create menu"
                icon={<RestaurantMenu />}
                tooltipTitle="Create menu"
                onClick={createMenu}
            />
        </SpeedDial>
        // {/* </Box> */ }
    );
}