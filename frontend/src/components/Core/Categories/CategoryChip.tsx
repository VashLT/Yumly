import { Chip } from '@mui/material';
import React from 'react';
import { Icategory } from '../Ingredients/interfaces';

interface CategoryChip {
    category: Icategory;
}

export const CategoryChip: React.FC<CategoryChip> = ({category}) => {
    return (
        <Chip variant="outlined" size="small" label={category.name} />
);
}

export default CategoryChip;