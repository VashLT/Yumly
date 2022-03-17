import React from 'react';
import { Box, Skeleton as MUISkeleton } from '@mui/material';
import { useTheme } from '@mui/system';

export const Skeleton: React.FC = () => {
    const theme = useTheme();
    return (
        <Box>
            <MUISkeleton variant="rectangular" sx={{
                width: '235px',
                height: '550px',
                transform: 'none',
                [theme.breakpoints.up('sm')]: {
                    width: '300px',
                    height: '220px'
                },
            }} />
        </Box>
    );
}

export default Skeleton;