import { Box, Card, CardMedia } from '@mui/material';
import axios from 'axios';
import React, { useContext } from 'react';
import { API_URL, getHeaders } from '../../../../utils/constants';
import DishContext, { DishProvider, IdishContext } from '../../../Contexts/Dish';
import { showBackError } from '../../Alerts/BackendError';
import { IresDish } from '../interfaces';
import DishModal from './Modal';
import DishPreview from './Preview';

export const DEFAULT_LINK = "https://i.imgur.com/shbMhEJ.jpg";

type DishProps = {
    dish: IresDish;
}

export const DishWrapper: React.FC<DishProps> = ({ dish }) => {
    console.log({ dish });
    return (
        <DishProvider dish={dish}>
            <Dish />
        </DishProvider>
    )
}

export const Dish: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const context = useContext(DishContext);

    const dish = context.dish as IresDish;

    if (Object.keys(dish).length === 0) {
        return <></>
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    return (
        <div className="wrapper-dish">
            <DishPreview
                id={dish.id}
                onClick={handleClickOpen}
                is_created={dish.is_created}
                name={dish.name}
                description={dish.description ?? ""}
                creation_date={dish.creation_date}
                image_url={DEFAULT_LINK}
                recipe_steps={dish.recipe_steps ?? []}
            />
            <DishModal
                key={`_dM${dish.id}`}
                id={`_dM${dish.id}`}
                context={context}
                open={open}
                onClose={handleClickClose}
            />
            <div id={"_dI" + dish.id}></div>
        </div>
    );
}

export const deleteDish = async (dish_id: number) => {
    return await axios
        .delete(`${API_URL}/dish/`, {
            headers: getHeaders().headers,
            data: { id: dish_id }
        })
        .then((res) => res)
        .catch((err) => {
            showBackError(err)
            return null;
        }) as IresDish | null | boolean;

}

export default DishWrapper;