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
    ):
        return f"Dish {dish_name} already exist"

    dish_categories = []
    # We get all the dish categories, create the ones missing
    for category in categories:
        cat = models.DishCategory.objects.filter(name=category.lower())
        if cat.exists():
            cat = cat[0]
        else:
            cat = create_category(
                category_name=category.lower(), model=models.DishCategory
            )

        dish_categories.append(cat)

    utensil_list = []
    for utensil in utensils:
        utl = models.Utensil.objects.filter(name=utensil.lower())
        if utl.exists():
            utl = utl[0]
        else:
            utl = create_category(category_name=utensil.lower(), model=models.Utensil)

        utensil_list.append(utl)

    ingredient_list = []
    for ingredient in ingredients:
        ingr = models.Ingredient.objects.filter(name=ingredient.lower())
        # return f"Missing ingredient {ingredient}"
        try:
            ingredient_list.append(ingr[0])
        except:
            raise Exception("Missing Ingredient")

    new_dish = models.Dish(
        name=dish_name,
        description=description,
        original_author_id=original_author,
        author_id=author,
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

    new_dish.save()

    return new_dish
