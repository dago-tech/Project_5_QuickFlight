from datetime import datetime
from django.utils import timezone
from django.db.models import Count
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import *
import pytz


'''
Flight Views
'''
class FlightListAPIView(generics.ListAPIView):
    """
    List of flights using GET method
    """
    serializer_class = FlightSerializer
    queryset = Flight.objects.all()


class FlightSearchAPIView(generics.ListAPIView):
    """
    Search flights by origin, destination and dates
    """
    serializer_class = FlightSerializer

    def get_queryset(self):
        # Get parameters
        search_params = self.request.data
        print(search_params)
        # A dict to store dates
        date_query = {}
        if 'departure_date' in search_params:
            try:
                # Convert date string to datetime object
                departure_date = datetime.strptime(search_params['departure_date'], "%Y-%m-%dT%H:%M:%S.%fZ")
                #create a timezone object corresponding to the Bogotá time zone in the pytz library
                bogota_tz = pytz.timezone('America/Bogota')
                #make_aware convert a datetime object into an "aware" object, that is, an object that maintains 
                #information in the time zone to which it belongs.
                #Converts the departure date to a datetime object with time zone information (timezone-aware)
                departure_date = timezone.make_aware(departure_date, timezone=pytz.utc).astimezone(bogota_tz)
                date_query['departure_date__date'] = departure_date.date()
            except ValueError:
                return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        if 'arrival_date' in search_params:
            try:
                arrival_date = datetime.strptime(search_params['arrival_date'], "%Y-%m-%dT%H:%M:%S.%fZ")
                bogota_tz = pytz.timezone('America/Bogota')
                arrival_date = timezone.make_aware(arrival_date, timezone=pytz.utc).astimezone(bogota_tz)
                date_query['arrival_date__date'] = arrival_date.date()
            except ValueError:
                return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        # queryset filter
        queryset = Flight.objects.filter(
            origin=search_params.get('origin'),
            destination=search_params.get('destination'),
            **date_query
        )
        
        return queryset
    
    def post(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        if queryset:
        # Serialize results
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Not data found"}, status=status.HTTP_404_NOT_FOUND)


class TopReservationsAPIView(generics.ListAPIView):
    """
    Get the list of airlines with the most reservations
    """  
    serializer_class = TopReservationsSerializer

    def list(self, request, *args, **kwargs):
        queryset = (
            Flight.objects
            .values('airline') # Like SELECT DISTINCT in SQL. Returns a list of airlines
            .annotate(total_reservations=Count('reservation')) # Add a new field and count reservation model instances
            .order_by('-total_reservations')[:5] # DESC
        )

        if not queryset:
            return Response({"error": "Not data found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CountAirlinesAPIView(generics.ListAPIView):
    """
    Get the list of airlines with the most reservations
    """

    def get(self, request, *args, **kwargs):

        count_airline = Flight.objects.values('airline').annotate(count=Count('airline')) # dict with airline and count

        if not count_airline:
            return Response({"error": "Not data found"}, status=status.HTTP_404_NOT_FOUND)
        else:    
            stats = [{
                'number_of_airlines': len(count_airline),
            }]
            return Response(stats, status=status.HTTP_200_OK)


class FlightCreateAPIView(generics.CreateAPIView):
    """
    Create a flight using POST method
    """
    serializer_class = FlightSerializer
    queryset = Flight.objects.all()

    def perform_create(self, serializer):
        # Validate that the arrival date is not earlier than the departure date
        current_date = timezone.now()
        departure_date = serializer.validated_data['departure_date']
        arrival_date = serializer.validated_data['arrival_date']
        price = serializer.validated_data['price']

        if departure_date < current_date or arrival_date < current_date:
            raise serializers.ValidationError("Error: Any date cannot be before than current date.")

        if arrival_date < departure_date:
            raise serializers.ValidationError("Error: The arrival date cannot be before the departure date.")
        
        if price < 0:
            raise serializers.ValidationError("Error: Price must be a positive number")
        
        # Object creation
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FlightDeleteAPIView(generics.DestroyAPIView):
    """
    Delete a flight using DELETE method
    """
    serializer_class = FlightSerializer
    queryset = Flight.objects.all()


'''
User Views
'''

class UserCreateAPIView(generics.CreateAPIView):
    """
    Create a user using POST method
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()


'''
Reservation Views
'''

class ReservationListAPIView(generics.ListAPIView):
    """
    List of reservations using GET method
    """
    serializer_class = ReservationDetailSerializer
    queryset = Reservation.objects.all()


class ReservationCreateAPIView(generics.CreateAPIView):
    """
    Create a reservation using POST method
    """
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True) # Error if it's not valid
        self.perform_create(serializer)

        # Update flight model
        flight_id = request.data.get('flight')
        try:
            flight = Flight.objects.get(pk=flight_id)
            if flight.available_seats < 1:
                flight.available_seats == 0
            else:
                flight.available_seats -= 1
                flight.save()
        except Flight.DoesNotExist:
            return Response({'error': 'Flight does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    