from django.shortcuts import render
from django.http import JsonResponse
from .models import Bus

def index(request):
    data = {'bus1' : Bus.objects.get(id = 1)}
    
    return render(request, 'main/index.html', data)


def updateCoords(request):
    if request.method == "GET":
        if "id" in request.GET and "lat" in request.GET and "long" in request.GET:
            bus_id   = request.GET["id"]
            bus_lat  = request.GET["lat"]
            bus_long = request.GET["long"]

            bus = Bus.objects.get(id = bus_id)
            bus.changeCoords(bus_lat, bus_long)

            bus.save()

            return JsonResponse({"status": 0})

    return JsonResponse({"status": 1})


def get_buses_coords(request):
    try:
        response = {
            "status": 0,
            "buses": list(Bus.objects.values()),
        }

    except:

        response = {
            "status": 1,
        }


    return JsonResponse(response)
