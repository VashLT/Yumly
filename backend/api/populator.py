from api import models
import datetime

dishes = [
    models.Dish(
        name = 'Desayuno a la estrato I',
        description = 'Hey',
        recipe_steps = ['Soy un array!'],
        preparation_time = 10,
        votes = 10,
        times_added = 10,
        is_created = True,
        creation_date = datetime.datetime.now()
    )
]

for dish in dishes:
    dish.save()