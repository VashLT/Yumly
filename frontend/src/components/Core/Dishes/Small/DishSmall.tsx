import React from 'react';

import { Box, CardContent, Typography, CardMedia, Card } from '@mui/material';


type DishSmallProps = {
    id: number;
    name: string;
    image_url?: string;
}

const DEFAULT_URL = "https://i.imgur.com/mYO12aV.jpg";

export const DishSmall: React.FC<DishSmallProps> = ({ id, name, image_url }) => {
    return (
        <Card sx={{
            display: 'flex',
            height: '100px',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {name}
                    </Typography>
                    {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography> */}
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: '40%', height: '100%' }}
                image={image_url ?? DEFAULT_URL}
                alt="Live from space album cover"
            />
        </Card>
    );
}

export default DishSmall;