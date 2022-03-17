import React from 'react';
import { Skeleton as MUISkeleton } from '@mui/material';
import { useTheme } from '@mui/system';

export const Skeleton: React.FC = () => {
    const theme = useTheme();
    return (
        <div>
            <MUISkeleton variant="text" sx={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                [theme.breakpoints.up('sm')]: {
                    width: '100px',
                    height: '100px'
                },
            }} />
        </div>
    );
}

export default Skeleton;