var hotspotAreas = [
    {
        city: "Skye",
        postcode: 5072,
        startTime: "11:30:30 AM",
        startDate: "5/13/2021",
        endTime: "11:30:30 PM",
        endDate: "5/18/2021"
    },
    {
        city: "North Adelaide",
        postcode: 5006,
        startTime: "8:00:00 AM",
        startDate: "5/12/2021",
        endTime: "11:59:59 PM",
        endDate: "5/21/2021"
    }
];

var hotspotVenues = [
    {"venueId":0,"name":"Hotel Orient","streetNo":"59","streetName":"Bayfield St","city":"Bellerive","postcode":7018,"state":"TAS", startTime: "11:30:30 AM", startDate: "5/13/2021", endTime: "11:30:30 PM", endDate: "5/18/2021" },
    {"venueId":1,"name":"CURRY HEAVEN INDIAN RESTAURANT AND INSTANT TAKEAWAY","streetNo":"5","streetName":"Pari Pl","city":"Cambewarra Village","postcode":2540,"state":"NSW", startTime: "11:30:30 AM", startDate: "5/13/2021", endTime: "11:30:30 PM", endDate: "5/18/2021"},
    {"venueId":2,"name":"JACQUI FLOWERS","streetNo":"6","streetName":"Stocker Crt","city":"Granton","postcode":7030,"state":"TAS", startTime: "11:30:30 AM", startDate: "5/13/2021", endTime: "11:30:30 PM", endDate: "5/18/2021"}
];

var vm = new Vue({
    el: '#app',
    data: {
        areas: false,
        hotspot_areas: hotspotAreas,
        hotspot_venues: hotspotVenues
    }
});