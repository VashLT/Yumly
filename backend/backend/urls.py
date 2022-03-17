from django.urls import include, path
from django.conf.urls import handler404

from rest_framework import routers
import api.views

router = routers.DefaultRouter()
router.register(r"users", api.views.UserViewSet)
router.register(r"groups", api.views.GroupViewSet)
router.register(r"menu", api.views.MenuViewSet)
router.register(r"dish", api.views.DishViewSet)
router.register(r"ingredient", api.views.IngredientViewSet)
router.register(r"dishcategory", api.views.DishCategoryViewSet)
# router.register(r"dishsearch", api.views.DishSearchAPIView, basename="dishsearch")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("api/", include("rest_framework.urls", namespace="rest_framework")),
    path("dishsearch/", api.views.DishSearchAPIView.as_view(), name="dishsearch"),
]
