// Some random fake places in Australia:
var checkin_history = [{"address":"5 Murranji St, Hawker 2614 ACT","name":"D'ASCANIO MOTOR REPAIRS","date":"13/05/2021","time":"6:54 PM","latitude":-35.241449,"longitude":149.033248},{"address":"67 Fyans St, South Geelong 3220 VIC","name":"EMPACT NAILS","date":"12/05/2021","time":"10:30 AM","latitude":-38.162117,"longitude":144.356404},{"address":"122 Smiths Rd, Emerald Beach 2456 NSW","name":"ORBIO","date":"11/05/2021","time":"8:33 AM","latitude":-30.17007,"longitude":153.157732},{"address":"2 Edinburgh Ave, Canberra 2601 ACT","name":"PARKHILL CONSTRUCTIONS","date":"9/05/2021","time":"11:44 PM","latitude":-35.283193,"longitude":149.124778},{"address":"90 Kereela Drv, Girraween 836 NT","name":"IT4MULA","date":"9/05/2021","time":"12:40 PM","latitude":-12.533618,"longitude":131.096283},{"address":"49 Knuckey St, Darwin 800 NT","name":"COASTAL LASHES & BEAUTY","date":"8/05/2021","time":"3:44 PM","latitude":-12.46051,"longitude":130.843788},{"address":"329 Hawthorn Rd, Caulfield 3162 VIC","name":"Tam Uzoma Makeup Artistry","date":"7/05/2021","time":"4:44 PM","latitude":-37.884678,"longitude":145.022606},{"address":"17 Euroka St, Ingleburn 2565 NSW","name":"HEART CULTURE","date":"6/05/2021","time":"2:08 PM","latitude":-34.006571,"longitude":150.860908},{"address":"41 Prince St, Paddington 4064 QLD","name":"GROWING THRU' TRANSITIONS","date":"5/05/2021","time":"2:28 AM","latitude":-32.06454,"longitude":115.97774},{"address":"4 Collier Pl, Kalgoorlie 6430 WA","name":"Dirty Days Apparel","date":"4/05/2021","time":"2:40 AM","latitude":-30.76557,"longitude":121.47719},{"address":"64 Niagara St, Armidale 2350 NSW","name":"MELBOURNE SANCTUARY MANAGEMENT SERVICES","date":"3/05/2021","time":"6:21 PM","latitude":-30.504048,"longitude":151.65191},{"address":"954 Sylvania Ave, North Albury 2640 NSW","name":"POSICOTE RENDERING","date":"2/05/2021","time":"6:14 PM","latitude":-36.059351,"longitude":146.931268},{"address":"3 Maxlay Rd, Modbury Heights 5092 SA","name":"Charles Lloyd Property Group","date":"1/05/2021","time":"1:14 PM","latitude":-34.810945,"longitude":138.677184},{"address":"14 Glen Eagles Way, Prospect 7250 TAS","name":"HOLTFRETERS","date":"30/04/2021","time":"8:58 AM","latitude":-41.4833,"longitude":147.14},{"address":"29 Kathleen St, Morwell 3840 VIC","name":"KITCHEN CABINETS WA","date":"29/04/2021","time":"5:13 AM","latitude":-38.220819,"longitude":146.422633},{"address":"9 College Pl, Bowral 2576 NSW","name":"Territory Liberal Party","date":"28/04/2021","time":"5:04 AM","latitude":-34.489661,"longitude":150.428203},{"address":"329 Hawthorn Rd, Caulfield 3162 VIC","name":"Tam Uzoma Makeup Artistry","date":"27/04/2021","time":"5:05 AM","latitude":-37.884678,"longitude":145.022606},{"address":"13 Park St, Moonee Ponds 3039 VIC","name":"SCHOOL OF PD","date":"26/04/2021","time":"10:25 AM","latitude":-37.762255,"longitude":144.920368},{"address":"232 Goondoon St, South Gladstone 4680 QLD","name":"WA TREASURE HUNT","date":"25/04/2021","time":"7:27 AM","latitude":-23.852429,"longitude":151.26192},{"address":"18 Rundle St, Wodonga 3690 VIC","name":"M & J SCRAPPING","date":"24/04/2021","time":"4:49 PM","latitude":-36.135027,"longitude":146.883212}];

var vm = new Vue({
    el: '#app',
    data: {
        checkins: checkin_history
    }
});

mapboxgl.accessToken = 'pk.eyJ1Ijoid2RjLXByb2plY3QiLCJhIjoiY2tvYzlsNW54MHNqZTMwb3k1ZjJlM3d2YyJ9.uD5DPRQ6JiUzECtpkOw8LA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [138.602668, -34.920741],
    zoom: 9
});

for (let checkin of vm.checkins) {
    let marker = new mapboxgl.Marker()
    .setLngLat([checkin.longitude, checkin.latitude])
    .addTo(map);
}