from django.test import TestCase
from api import models

# Create your tests here.
class PopulateTables(TestCase):
    def setUp(self):
        dishes = [
            models.Dish(
                name = 'Desayuno a la estrato I',
                description = 'Hey'
            )
        ]

        for dish in dishes:
            dish.save()

        return True

    def test_1(self):
        return True