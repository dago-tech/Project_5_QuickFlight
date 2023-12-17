from django.urls import path
from .views import *

app_name = 'flights'

urlpatterns = [
    path('', FlightListAPIView.as_view(), name='flight_list'),
    path('create_flight/', FlightCreateAPIView.as_view(), name='flight_create'),
    path('delete_flight/<int:pk>/', FlightDeleteAPIView.as_view(), name='flight_delete'),
    path('search_flight/', FlightSearchAPIView.as_view(), name='flight_search'),
    path('top_reservations/', TopReservationsAPIView.as_view(), name='top_reservations_list'),
    path('count_airlines/', CountAirlinesAPIView.as_view(), name='count_airlines_list'),
    path('user_create/', UserCreateAPIView.as_view(), name='user_create'),
    path('reservation_list/', ReservationListAPIView.as_view(), name='reservation_list'),
    path('reservation_create/', ReservationCreateAPIView.as_view(), name='reservation_create'),
]