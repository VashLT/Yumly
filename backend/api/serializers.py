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


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Dish
        fields = [
            'name',
            'description',
            'recipe_steps',
            'preparation_time',
            'votes',
            'times_added',
            'is_created',
            'creation_date',
            'author_id',
            'original_author_id',
        ]


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Menu
        fields = "__all__"
