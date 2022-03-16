import { IresDish } from "../components/Core/Dishes/interfaces";
import { Icategory, Iingredient, InutritionalValue } from "../components/Core/Ingredients/interfaces";
import { IresMenu } from "../components/Core/Menus/interfaces";

export const mockAuth = {
    username: "VashLT",
    avatarUrl: "https://i.imgur.com/S3ZqOsu.png",
    email: "vashlt@gmail.com"
}

export const mockUser: Iuser = {
    id: 0,
    username: 'VashLT',
    name: 'José',
    email: 'jose@gmail.com',
    registered_at: '2021-10-18T22:04:00Z',

}

export const mockIngredientCategories: Icategory[] = [
    {
        id: 0,
        name: "Generica",
        icon: ""
    },
    {
        id: 1,
        name: "Salsas",
        icon: ""
    },
    {
        id: 2,
        name: "Carnes",
        icon: ""
    },
]

export const mockDishCategories: Icategory[] = [
    {
        id: 0,
        name: "Generica",
        icon: ""
    },
    {
        id: 1,
        name: "Chinese food",
        icon: ""
    },
    {
        id: 2,
        name: "Seafood",
        icon: ""
    },
    {
        id: 3,
        name: "Italian food",
        icon: ""
    }
]

export const mockMenuCategories: Icategory[] = [
    {
        id: 0,
        name: "Generica",
        icon: ""
    },
    {
        id: 1,
        name: "Lunch",
        icon: ""
    },
]

export const mockNutritionalValues: InutritionalValue[] = [
    {
        fats: 5,
        protein: 10,
        carbs: 50
    },
    {
        fats: 15,
        protein: 0,
        carbs: 20
    },
    {
        fats: 15,
        protein: 40,
        carbs: 10
    },
]

export const mockIngredients: Iingredient[] = [
    {
        id: 0,
        name: "Pasta",
        nutritional_value: mockNutritionalValues[0],
        category: mockIngredientCategories[0]
    },
    {
        id: 0,
        name: "Sauce",
        nutritional_value: mockNutritionalValues[1],
        category: mockIngredientCategories[1]
    },
    {
        id: 0,
        name: "Ground beef",
        nutritional_value: mockNutritionalValues[2],
        category: mockIngredientCategories[2]
    },
]

export const mockDishes: IresDish[] = [
    {
        id: 0,
        name: "Spaghett",
        description: "Delicious dish",
        original_author_id: mockUser.id,
        author_id: mockUser.id,
        ingredients: [
            [mockIngredients[0], 100],
            [mockIngredients[1], 60],
            [mockIngredients[2], 400],
        ],
        recipe_steps: [
            "Know how to cook",
            "Cook that shit",
            "Eat it and say that is delicious"
        ],
        preparation_time: 20,
        votes: 5,
        times_added: 10,
        is_published: false,
        is_created: false,
        categories: [mockDishCategories[3]]
    }
]

export const mockMenus: IresMenu[] = [
    {
        id: 0,
        name: "Test menu",
        votes: 2,
        description: "This is a test menu, don't pay attention to it",
        creation_date: "2015-03-25T12:00:00Z",
        dish_list: mockDishes,
        author_id: mockUser.id,
        categories: [mockMenuCategories[1]]
    }
]