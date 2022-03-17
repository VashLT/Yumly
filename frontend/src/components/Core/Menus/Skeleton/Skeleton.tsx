import React from 'react';
import { Box, Skeleton as MUISkeleton } from '@mui/material';
import { useTheme } from '@mui/system';

export const Skeleton: React.FC = () => {
    const theme = useTheme();
    return (
        <Box>
            <MUISkeleton variant="text" sx={{
                width: '280px',
                height: '40px',
                transform: 'none',
                [theme.breakpoints.up('sm')]: {
                    width: '300px',
                    height: '100px'
                },
            }} />
            <MUISkeleton variant="rectangular" sx={{
                width: '280px',
                height: '200px',
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