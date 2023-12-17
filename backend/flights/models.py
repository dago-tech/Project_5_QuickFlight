from django.db import models


class User(models.Model):
    user_name = models.CharField(max_length=50)
    user_id = models.CharField(max_length=30)
    email = models.EmailField()

    def __str__(self):
        return self.user_id
    

class Flight(models.Model):
    origin = models.CharField(max_length=50)
    destination = models.CharField(max_length=50)
    departure_date = models.DateTimeField()
    arrival_date = models.DateTimeField()
    airline = models.CharField(max_length=50)
    available_seats = models.IntegerField(default=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.airline} - {self.origin} to {self.destination}"
    

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user} - {self.flight}"