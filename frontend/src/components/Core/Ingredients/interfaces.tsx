export interface Iingredient {
    id: number;
    name: string;
    nutritional_value: InutritionalValue;
    category: Icategory;
}

export interface InutritionalValue {
    fats: number;
    protein: number;
    carbs: number;
}

export interface Icategory {
    id: number;
    name: string;
    icon: string;
}