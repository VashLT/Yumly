from re import S
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics, filters
from rest_framework import status
from rest_framework.response import Response

from django.http import HttpResponse

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
    permission_classes = []

    def delete(self, request):
        self.destroy(request)


class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    permission_classes = []

    def update(self, request, *args, **kwargs):
        dish_obj = self.get_object()
        serializer = DishSerializer(dish_obj, data=request.data)
        DishSerializer(self.get_object())

        if serializer.is_valid():
            pass
        try:
            for key, value in serializer.data.items():
                setattr(dish_obj, key, value)

            dish_obj.save()

            return Response(
                DishSerializer(Dish.objects.get(id=dish_obj.id)).data,
                status=status.HTTP_201_CREATED,
            )

        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = []


class DishCategoryViewSet(viewsets.ModelViewSet):
    queryset = DishCategory.objects.all()
    serializer_class = DishCategorySerializer
    permission_classes = []


class DishSearchAPIView(generics.ListAPIView):
    search_fields = ["name", "categories", "ingredient", "utensils"]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    serializer_class = DishSerializer
    permission_classes = []

    def get_queryset(self):
        query_params = self.request.query_params #type: ignore

        query_dict = {k: v for k, v in self.request.query_params.items() if v} #type: ignore
        filter_keyword_arguments_dict = {}
        for key, value in query_dict.items():
            if key == "name":
                filter_keyword_arguments_dict["name__icontains"] = value
            if key == "categories":
                filter_keyword_arguments_dict["categories__name__icontains"] = value
            if key == "ingredient":
                filter_keyword_arguments_dict["ingredient__name__icontains"] = value
            if key == "utensils":
                filter_keyword_arguments_dict["utensils__name__icontains"] = value

        queryset = Dish.objects.filter(**filter_keyword_arguments_dict)
        return queryset

def check_user(request):

    if request.user.is_authenticated:
        return HttpResponse('Yei', status=status.HTTP_200_OK)
    
    else:
        return HttpResponse('nei', status=status.HTTP_404_NOT_FOUND)