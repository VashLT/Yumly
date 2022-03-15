import { Idish, IresDish } from "../Dishes/interfaces";
import { Icategory } from "../Ingredients/interfaces";


export interface IresMenu {
    id: number;
    name: string;
    votes: number;
    description: string;
    creation_date: string;
    dish_list: IresDish[];
    author: IbasicUser | null;
    categories: Icategory[];
}    
export interface Imenu  {
    id: number;
    name: string;
    votes: number;
    description: string;
    creation_date: Date;
    dish_list: Idish[];
    author: Iuser | null;
    categories: Icategory[];
}