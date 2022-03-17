import { Idish, IresDish } from "../Dishes/interfaces";
import { Icategory } from "../Ingredients/interfaces";


export interface IresMenu {
    id: number;
    name: string;
    votes: number;
    description: string;
    creation_date: string;
    dish_list: IresDish[];
    author_id: number | null;
    categories: Icategory[];
}


export interface ImenuCreate {
    name: string;
    description: string;
    dish_list: number[];
    categories: number[];
    votes: number;
}    
export interface ImenuUpdate {
    id: number;
    name?: string;
    votes?: number;
    description?: string;
    dish_list?: IresDish[];
    categories?: Icategory[];
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