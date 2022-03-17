from dataclasses import fields
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Filter
        fields = "__all__"


class NutricionalValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NutricionalValue
        fields = "__all__"


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredient
        fields = "__all__"


class DishCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DishCategory
        fields = "__all__"


class MenuCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MenuCategory
        fields = "__all__"


class UtensilsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Utensil
        fields = "__all__"


class DishSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(read_only=True, many=True)
    categories = DishCategorySerializer(read_only=True, many=True)
    utensils = UtensilsSerializer(read_only=True, many=True)

    class Meta:
        model = models.Dish
        fields = "__all__"


class MenuSerializer(serializers.ModelSerializer):
    categories = MenuCategorySerializer(read_only=True, many=True)
    dish_ids = DishSerializer(read_only=True, many=True)

    class Meta:
        model = models.Menu
        fields = "__all__"
