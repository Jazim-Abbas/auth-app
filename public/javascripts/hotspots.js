var venues = [{"address":"5 Murranji St, Hawker 2614 ACT","name":"D'ASCANIO MOTOR REPAIRS","start":"6/05/2021 1:39:51 PM","end":"11/05/2021 5:43:33 PM","latitude":-35.241449,"longitude":149.033248},{"address":"67 Fyans St, South Geelong 3220 VIC","name":"EMPACT NAILS","start":"1/05/2021 11:15:22 PM","end":"5/05/2021 10:01:50 PM","latitude":-38.162117,"longitude":144.356404},{"address":"122 Smiths Rd, Emerald Beach 2456 NSW","name":"ORBIO","start":"12/05/2021 9:31:35 PM","end":"12/05/2021 9:45:02 PM","latitude":-30.17007,"longitude":153.157732},{"address":"2 Edinburgh Ave, Canberra 2601 ACT","name":"PARKHILL CONSTRUCTIONS","start":"9/05/2021 8:02:27 AM","end":"11/05/2021 2:25:09 PM","latitude":-35.283193,"longitude":149.124778},{"address":"90 Kereela Drv, Girraween 836 NT","name":"IT4MULA","start":"7/05/2021 4:58:38 AM","end":"11/05/2021 7:10:07 AM","latitude":-12.533618,"longitude":131.096283},{"address":"49 Knuckey St, Darwin 800 NT","name":"COASTAL LASHES & BEAUTY","start":"5/05/2021 10:27:34 PM","end":"10/05/2021 9:16:03 PM","latitude":-12.46051,"longitude":130.843788},{"address":"329 Hawthorn Rd, Caulfield 3162 VIC","name":"Tam Uzoma Makeup Artistry","start":"26/04/2021 6:38:33 AM","end":"30/04/2021 10:33:03 PM","latitude":-37.884678,"longitude":145.022606},{"address":"17 Euroka St, Ingleburn 2565 NSW","name":"HEART CULTURE","start":"3/05/2021 9:33:22 PM","end":"5/05/2021 12:27:05 AM","latitude":-34.006571,"longitude":150.860908},{"address":"41 Prince St, Paddington 4064 QLD","name":"GROWING THRU' TRANSITIONS","start":"2/05/2021 1:35:33 PM","end":"6/05/2021 7:54:19 AM","latitude":-32.06454,"longitude":115.97774},{"address":"4 Collier Pl, Kalgoorlie 6430 WA","name":"Dirty Days Apparel","start":"9/05/2021 7:53:16 AM","end":"12/05/2021 1:50:37 PM","latitude":-30.76557,"longitude":121.47719},{"address":"64 Niagara St, Armidale 2350 NSW","name":"MELBOURNE SANCTUARY MANAGEMENT SERVICES","start":"6/05/2021 11:20:34 PM","end":"12/05/2021 1:37:03 PM","latitude":-30.504048,"longitude":151.65191},{"address":"954 Sylvania Ave, North Albury 2640 NSW","name":"POSICOTE RENDERING","start":"26/04/2021 6:41:50 AM","end":"2/05/2021 9:56:23 AM","latitude":-36.059351,"longitude":146.931268},{"address":"3 Maxlay Rd, Modbury Heights 5092 SA","name":"Charles Lloyd Property Group","start":"27/04/2021 6:39:16 AM","end":"1/05/2021 10:52:34 AM","latitude":-34.810945,"longitude":138.677184},{"address":"14 Glen Eagles Way, Prospect 7250 TAS","name":"HOLTFRETERS","start":"9/05/2021 10:21:55 PM","end":"10/05/2021 7:50:19 PM","latitude":-41.4833,"longitude":147.14},{"address":"29 Kathleen St, Morwell 3840 VIC","name":"KITCHEN CABINETS WA","start":"1/05/2021 7:26:38 AM","end":"5/05/2021 7:57:25 PM","latitude":-38.220819,"longitude":146.422633},{"address":"9 College Pl, Bowral 2576 NSW","name":"Territory Liberal Party","start":"29/04/2021 1:20:18 AM","end":"2/05/2021 2:55:00 PM","latitude":-34.489661,"longitude":150.428203},{"address":"329 Hawthorn Rd, Caulfield 3162 VIC","name":"Tam Uzoma Makeup Artistry","start":"27/04/2021 3:03:13 PM","end":"29/04/2021 8:22:57 PM","latitude":-37.884678,"longitude":145.022606},{"address":"13 Park St, Moonee Ponds 3039 VIC","name":"SCHOOL OF PD","start":"30/04/2021 1:17:19 PM","end":"30/04/2021 5:08:29 PM","latitude":-37.762255,"longitude":144.920368},{"address":"232 Goondoon St, South Gladstone 4680 QLD","name":"WA TREASURE HUNT","start":"5/05/2021 2:06:47 PM","end":"8/05/2021 3:42:20 PM","latitude":-23.852429,"longitude":151.26192},{"address":"18 Rundle St, Wodonga 3690 VIC","name":"M & J SCRAPPING","start":"1/05/2021 4:09:15 PM","end":"6/05/2021 5:13:26 AM","latitude":-36.135027,"longitude":146.883212}];

var areas = [
    {

    }
];

var vm = new Vue({
    el: '#app',
    data: {
        hotspot_visit: 0,
        hotspot_venues: venues,
        hotspot_areas: areas
    }
});

mapboxgl.accessToken = 'pk.eyJ1Ijoid2RjLXByb2plY3QiLCJhIjoiY2tvYzlsNW54MHNqZTMwb3k1ZjJlM3d2YyJ9.uD5DPRQ6JiUzECtpkOw8LA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [138.602668, -34.920741],
    zoom: 9
});

// Mark hotspot venues:
for (let venue of vm.hotspot_venues) {
    let marker = new mapboxgl.Marker()
    .setLngLat([venue.longitude, venue.latitude])
    .addTo(map);
}

// Mark hotspot areas:
map.on('load', function () {
    map.addSource('hotspots', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            'coordinates': [
                    [
                        [138.6235558, -34.9281868],
                        [138.61571816, -34.92259048],
                        [138.61509249, -34.91959658],
                        [138.6204827, -34.9168234],
                        [138.6226459, -34.91571651],
                        [138.623564, -34.9279034],
                        [138.6235558, -34.9281868]
                    ]
                ]
            }
        }
    });

    map.addLayer({
        'id': 'hotspots',
        'type': 'fill',
        'source': 'hotspots',
        'layout': {},
        'paint': {
            'fill-color': '#ff0000',
            'fill-opacity': 0.5
        }
    });

    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'hotspots',
        'layout': {},
        'paint': {
            'line-color': '#000000',
            'line-width': 3
        }
    });
});