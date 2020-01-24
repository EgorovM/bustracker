from django.db import models

class Bus(models.Model):
    driver_name = models.CharField(max_length = 30)
    bus_number  = models.CharField(max_length = 30)
    latitude  = models.FloatField(default = 0)
    longitude = models.FloatField(default = 0)

    type      = models.CharField(default = "city", max_length = 100)
    route     = models.CharField(default = "Через город", max_length = 100)

    def __str__(self):
        return self.driver_name + " " + self.bus_number

    def getCoords(self):
        return (self.latitude, self.longitude)

    def changeCoords(self, lat, long):
        self.latitude = lat
        self.longitude = long
