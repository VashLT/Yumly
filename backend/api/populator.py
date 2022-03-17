from ctypes import Union
from unicodedata import name
from api import models
import datetime
from django.db.models import Q
from django.contrib.auth.models import User


def create_ingredient(
    ingredient_name: str,
    fats: float,
    protein: float,
    carbs: float,
    categories: list[str],
):
    # We lowercase the ingredient_name
    ingredient_name = ingredient_name.lower()

    # We check if the Ingredient already exists in the database
    if models.Ingredient.objects.filter(name=ingredient_name):
        return f"Ingredient {ingredient_name} already exists!"

    # If the ingredient doesn't exist, we create the nutricional_value
    # and get the id
    nutricional_value = models.NutricionalValue(fats=fats, protein=protein, carbs=carbs)

    nutricional_value.save()

    for i in range(len(categories)):
        categories[i] = categories[i]

    # Next we take the categories from the list and
    # check if they exist, if not, they're created
    categories_qs = models.IngredientCategory.objects.filter(name__in=categories)
    categories_names = [e_cat.name for e_cat in categories_qs]

    new_categories = []
    for category in categories:
        if category not in categories_names:
            new_cat = models.IngredientCategory(name=category)
            new_cat.save()
            new_categories.append(new_cat)

    ingredient = models.Ingredient(
        name=ingredient_name,
        nutricional_value=nutricional_value,
    )

    ingredient.save()

    for cat in categories_qs:
        ingredient.categories.add(cat)

    for cat in new_categories:
        ingredient.categories.add(cat)


def create_category(
    category_name: str,
    model,
):
    category_name = category_name.lower()

    if model.objects.filter(name=category_name):
        return f"Category {category_name} already exists"

    new_categoy = model(name=category_name)
    new_categoy.save()

    return new_categoy


def create_dish(
    dish_name: str,
    description: str,
    preparation_time: int,
    recipe_steps: list[str],
    ingredients: list[str],
    utensils: list[str],
    categories: list[str],
    original_author: User = None,
    author: User = None,
):
    dish_name = dish_name.lower()

    if models.Dish.objects.filter(
        name=dish_name,
        original_author=original_author,
        categories__in=models.DishCategory.objects.filter(name__in=categories),
        utensils__in=models.Utensil.objects.filter(name__in=utensils),
    ):
        return f"Dish {dish_name} already exist"

    dish_categories = []
    # We get all the dish categories, create the ones missing
    for category in categories:
        cat = models.DishCategory.objects.filter(name=category.lower())[0]
        if not cat:
            cat = create_category(
                category_name=category.lower(), model=models.DishCategory
            )

        dish_categories.append(cat)

    utensil_list = []
    for utensil in utensils:
        cat = models.Utensil.objects.filter(name=utensil.lower())[0]
        if not cat:
            cat = create_category(category_name=utensil.lower(), model=models.Utensil)

        utensil_list.append(cat)

    ingredient_list = []
    for ingredient in ingredients:
        ingr = models.Ingredient.objects.filter(name=ingredient.lower())[0]
        if not ingr:
            return f"Missing ingredient {ingredient}"

        ingredient_list.append(ingr)

    new_dish = models.Dish(
        name=dish_name,
        description=description,
        original_author=original_author,
        author=author,
        recipe_steps=recipe_steps,
        preparation_time=preparation_time,
        votes=0,
        times_added=0,
        is_published=False,
        is_created=False,
        creation_date=datetime.datetime.now(),
    )

    new_dish.save()

    for utensil in utensil_list:
        new_dish.utensils.add(utensil)

    for category in dish_categories:
        new_dish.categories.add(category)

    for ingredient in ingredient_list:
        new_dish.ingredients.add(ingredient)

    return new_dish


create_dish(
    dish_name="Curried Lentils",
    description="Simple recipe with exotic flavors, but only a few ingredients. Lentils are simmered in a coconut curry sauce. Serve over rice.",
    preparation_time=40,
    recipe_steps=[
        "Rinse lentils and place in a saucepan with the water.",
        "Bring to a boil, then cover, and simmer over low heat for 15 minutes.",
        "Stir in the curry paste, coconut cream and season with salt to taste.",
        "Return to a simmer, and cook for an additional 10 to 15 minutes, until tender.",
    ],
    ingredients=["lentils", "water", "cream of coconut", "curry paste", "salt"],
    utensils=[],
    categories=["lunch", "simple", "quick", "vegetarian"],
)
