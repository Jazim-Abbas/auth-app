var dataURL = "https://raw.githubusercontent.com/covid-19-au/covid-19-au.github.io/prod/src/data/state.json";
var states = ["NSW", "QLD", "VIC", "SA", "WA", "TAS", "ACT", "NT"];

function getCovidData() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let rawData = JSON.parse(this.responseText);
            let keys = Object.keys(rawData);
            let latest = rawData[keys[keys.length - 1]];
            let lastWeek = rawData[keys[keys.length - 8]];

            let caseData = [];
            for (let s of states) {
                caseData.push({state: s, active: latest[s][4], total: latest[s][0]});
            }

            let deathData = [];
            for (let s of states) {
                deathData.push({state: s, active: latest[s][1] - lastWeek[s][1], total: latest[s][1]});
            }

            vm.cases = caseData;
            vm.deaths = deathData;

            // TODO: Implement case chart:
            /*
            casesChart.data.datasets[0].data = [];
            casesChart.data.datasets[0].data.push(vm.cases[0].total);
            casesChart.update();*/
        }
    };

    xhttp.open("GET", dataURL, true);

    xhttp.send();
}

var important_info = [
    {state: "ACT", url: "https://www.covid19.act.gov.au/"},
    {state: "NSW", url: "https://www.nsw.gov.au/covid-19"},
    {state: "NT", url: "https://coronavirus.nt.gov.au/"},
    {state: "QLD", url: "https://www.covid19.qld.gov.au/"},
    {state: "SA", url: "https://www.covid-19.sa.gov.au/"},
    {state: "TAS", url: "https://coronavirus.tas.gov.au/"},
    {state: "VIC", url: "https://www.dhhs.vic.gov.au/coronavirus"},
    {state: "WA", url: "https://www.wa.gov.au/government/covid-19-coronavirus"}
];

// Load user settings:
var settingsCookie = decodeURIComponent(document.cookie);
var cookieParts = settingsCookie.split(';');
var cookieKey = "settings=";
var cookieKeyUser = "userType=";
var userSettings;
var userAccountType;

for (let part of cookieParts) {
    part = part.trim();
    if (part.indexOf(cookieKey) == 0) {
        userSettings = JSON.parse(part.substring(cookieKey.length + 1, part.length - 1));
    } else if (part.indexOf(cookieKeyUser) == 0) {
        userAccountType = part.substring(cookieKeyUser.length, part.length);
    }
}

// Create new settings object:
if (userSettings === undefined) {
    userSettings = {
        dashCases: true,
        dashDeaths: true,
        dashInfo: true
    };
    let expiry = new Date() + new Date(10 * 365 * 24 * 60 * 60 * 1000);
    document.cookie = `settings="${JSON.stringify(userSettings)}";path=/;expires=${expiry.toString()}`;
}

var vm = new Vue({
    el: '#app',
    data: {
        cases: [],
        deaths: [],
        info: important_info,
        user_type: userAccountType,
        hotspot_visit: -1,
        settings: userSettings
    }
});

getCovidData();

vm.hotspot_visit = 0;