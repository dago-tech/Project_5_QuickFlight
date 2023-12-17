from rest_framework import serializers
from .models import *

'''
User Model Serializers
'''
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


'''
Flight Model Serializers
'''

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'


# For TopReservationsAPIView, to get reservation number for each airline
class TopReservationsSerializer(serializers.Serializer):
    airline = serializers.CharField()
    total_reservations = serializers.IntegerField()


'''
Reservation Model Serializers
'''

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

# Nested serializer to get data from foreign key models
class ReservationDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer()  
    flight = FlightSerializer()

    class Meta:
        model = Reservation
        fields = '__all__'