# Generated by Django 4.0.3 on 2022-03-16 00:04

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_dish_is_published_alter_dish_recipe_steps'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dish',
            name='categories',
            field=models.ManyToManyField(blank=True, to='api.dishcategory'),
        ),
        migrations.AlterField(
            model_name='dish',
            name='recipe_steps',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(), blank=True, null=True, size=100),
        ),
        migrations.AlterField(
            model_name='dish',
            name='utensils',
            field=models.ManyToManyField(blank=True, to='api.utensil'),
        ),
    ]