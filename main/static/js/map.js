function switchClick(elem){
    Array.from(document.getElementsByClassName(elem.id)).forEach((item, i) => {
        item.classList.toggle("hidden");
    });
}

async function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

async function getBuses(){
  let result = await makeRequest('GET', 'http://127.0.0.1:8000/getInfo');
  var response = JSON.parse(result);

  return response['buses'];
}

function generateBusPopup(bus){
    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        '<p>Водитель: ' + bus.driver_name + '</p>' +
        '<p>Номер автобуса: ' + bus.bus_number + '</p>' +
        '<p>Маршрут: ' + bus.route + '</p>'
    );

    return popup;
}

var bounds = [
    [118.260269, 63.244591],
    [118.463925, 63.326944],
];

mapboxgl.accessToken = 'pk.eyJ1IjoiZWdvcm92bSIsImEiOiJjanhic2F1ZDUwMTdvNDJ0bHMxOGg5NWthIn0.QL2wIcgAJIBNIz2gbpuLVQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 4,
    center: [118.3447875, 63.2829217],
    maxBounds: bounds,
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

async function animateBuses(timestamp) {
    buses = await getBuses();
    console.log(buses);

    var markets = [];

    buses.forEach((item, i) => {
        var el = document.createElement('div');
        el.classList.add("marker");
        el.classList.add(item.type);

        $('.city').remove();
        $('.vert').remove();
        
        markets.push(new mapboxgl.Marker(el).setPopup(generateBusPopup(item)));
    });


    markets.forEach((market, i) => {
        market.setLngLat([
            buses[i].longitude,
            buses[i].latitude
        ]);
        // Ensure it's added to the map. This is safe to call if it's already added.
        market.addTo(map);
    });

    // Request the next frame of the animation.
    setTimeout(animateBuses, 3000);
}

animateBuses(animateBuses);
