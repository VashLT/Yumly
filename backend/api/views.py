from re import S
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response


from api.serializers import (
    DishSerializer,
    UserSerializer,
    GroupSerializer,
    IngredientSerializer,
    MenuSerializer,
    DishCategorySerializer,
)

from api.models import Dish, Ingredient, Menu, DishCategory, MenuCategory


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = []

    def update(self, request, *args, **kwargs):
        dish_obj = self.get_object()
        serializer = DishSerializer(dish_obj, data=request.data)

        if serializer.is_valid():
            pass
        try:
            for key, value in serializer.data.items():
                setattr(dish_obj, key, value)

            dish_obj.save()

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class DishCategoryViewSet(viewsets.ModelViewSet):
    queryset = DishCategory.objects.all()
    serializer_class = DishCategorySerializer
