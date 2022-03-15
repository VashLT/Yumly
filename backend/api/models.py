import uuid
from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.postgres.fields import ArrayField
from django.urls import reverse
from django.contrib.auth.models import User


class Filter(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, blank=False, null=False)
    icon = models.CharField(max_length=512)

    class Meta:
        abstract = True


class IngredientCategory(models.Model):
    pass


class DishCategory(models.Model):
    pass


class MenuCategory(models.Model):
    pass


class Utensil(models.Model):
    pass


class NutricionalValue(models.Model):
    id = models.AutoField(primary_key=True)
    fats = models.FloatField()
    protein = models.FloatField()
    carbs = models.FloatField()


class Ingredient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, blank=False, null=False)
    nutricional_value = models.OneToOneField(
        NutricionalValue,
        on_delete=models.PROTECT,
    )
    categories = models.ManyToManyField(IngredientCategory)


class Dish(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, blank=False, null=True)
    description = models.TextField()
    original_author = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='%(class)s_original',
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='%(class)s_author'
    )
    recipe_steps = ArrayField(models.TextField(), size=100)
    utensils = models.ManyToManyField(Utensil)
    preparation_time = models.IntegerField()
    votes = models.IntegerField()
    times_added = models.IntegerField()
    is_published = models.BooleanField()
    is_created = models.BooleanField()
    creation_date = models.DateField()
    categories = models.ManyToManyField(DishCategory)


class Menu(models.Model):
    id = id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, blank=False, null=False)
    votes = models.IntegerField()
    description = models.TextField()
    creation_date = models.DateField()
    dishes = models.ManyToManyField(Dish)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    categories = models.ManyToManyField(MenuCategory)
    