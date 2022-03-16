import { Icategory, Iingredient } from "../Ingredients/interfaces";

export interface Idish {
    id: number;
    name: string;
    description: string;
    original_author: Iuser | null;
    author: Iuser | null;
    ingredients: [Iingredient, number][];
    recipe_steps: string[];
    utensils: Icategory[];
    preparation_time: number;
    votes: number;
    times_added: number;
    is_published: boolean;
    is_created: boolean;
    categories: Icategory[];
}

export interface IresDish {
    id: number;
    name: string;
    description: string;
    recipe_steps?: string[];
    original_author_id: number | null;
    author_id: number | null;
    ingredients: [Iingredient, number][];
    utensils?: Icategory[];
    preparation_time: number;
    votes: number;
    times_added: number;
    is_published: boolean;
    is_created: boolean;
    categories: Icategory[];
}

